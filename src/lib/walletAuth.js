import { BrowserProvider, getAddress, hexlify, toUtf8Bytes } from "ethers";
import { SiweMessage } from "siwe";
import {
  requestAuthNonce,
  setAuthToken,
  verifyAuthMessage,
} from "../api/auth.js";

const SIWE_DOMAIN =
  import.meta.env.VITE_SIWE_DOMAIN || window.location.hostname;
const SIWE_URI = import.meta.env.VITE_SIWE_URI || window.location.origin;
const SIWE_STATEMENT = "Sign in to Ballena Azul with your Ethereum wallet.";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getBitgetProvider() {
  const bitkeep = window.bitkeep;
  if (!bitkeep) return null;

  return bitkeep.ethereum || bitkeep.ethreum || null;
}

function isBitgetAvailable() {
  return Boolean(getBitgetProvider());
}

function getWalletProvider() {
  const bitget = getBitgetProvider();
  if (bitget) {
    return { provider: bitget, type: "bitget" };
  }

  if (window.ethereum) {
    return { provider: window.ethereum, type: "standard" };
  }

  throw new Error(
    "No Ethereum wallet found. Install Bitget Wallet or MetaMask, unlock it, then refresh in Chrome (not the IDE preview).",
  );
}

function parseChainId(value) {
  if (value == null) return null;

  if (typeof value === "number" && value > 0) {
    return value;
  }

  if (typeof value === "bigint") {
    return Number(value);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed.startsWith("0x") || trimmed.startsWith("0X")) {
      const parsed = parseInt(trimmed, 16);
      return Number.isNaN(parsed) || parsed <= 0 ? null : parsed;
    }

    const parsed = Number(trimmed);
    return Number.isNaN(parsed) || parsed <= 0 ? null : parsed;
  }

  return null;
}

function parseAccounts(result) {
  if (!result) return [];

  if (Array.isArray(result)) {
    return result.filter(Boolean).map((account) => getAddress(account));
  }

  if (typeof result === "string") {
    return [getAddress(result)];
  }

  if (result?.address) {
    return [getAddress(result.address)];
  }

  if (Array.isArray(result?.accounts)) {
    return result.accounts.filter(Boolean).map((account) => getAddress(account));
  }

  if (result?.data) {
    return parseAccounts(result.data);
  }

  return [];
}

function normalizeWalletError(error, fallback) {
  const message = [
    error?.message,
    error?.data?.message,
    error?.error?.message,
    typeof error === "string" ? error : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (error?.code === 4001 || /user rejected|user denied/i.test(message)) {
    return new Error("Wallet signature was cancelled.");
  }

  if (/reading 'from'|reading "from"/i.test(message)) {
    return new Error(
      "Bitget Wallet could not sign this message. Refresh the page and try Sign in again.",
    );
  }

  if (message) {
    return new Error(message);
  }

  return new Error(fallback);
}

async function readBitgetAccounts(provider) {
  const directCandidates = [
    provider?.selectedAddress,
    provider?.address,
    ...(Array.isArray(provider?.accounts) ? provider.accounts : []),
  ].filter(Boolean);

  if (directCandidates.length) {
    return directCandidates.map((account) => String(account));
  }

  if (typeof provider.request !== "function") {
    return [];
  }

  try {
    const accounts = await provider.request({
      method: "eth_accounts",
      params: [],
    });

    if (Array.isArray(accounts) && accounts.length) {
      return accounts.map((account) => String(account));
    }
  } catch {
    // Account not available yet.
  }

  return [];
}

async function connectBitgetWallet(provider) {
  const existingAccounts = parseAccounts(await readBitgetAccounts(provider));
  if (existingAccounts.length) {
    return existingAccounts;
  }

  if (typeof provider.enable === "function") {
    try {
      await provider.enable();
    } catch (error) {
      throw normalizeWalletError(error, "Bitget Wallet connection failed.");
    }

    for (let attempt = 0; attempt < 30; attempt += 1) {
      const accounts = parseAccounts(await readBitgetAccounts(provider));
      if (accounts.length) {
        return accounts;
      }

      await sleep(100);
    }
  }

  throw new Error(
    "Bitget Wallet did not return an account. Unlock it, approve the connection, then try again.",
  );
}

async function connectStandardWallet(provider) {
  if (typeof provider.request === "function") {
    return parseAccounts(
      await provider.request({
        method: "eth_requestAccounts",
        params: [],
      }),
    );
  }

  const browserProvider = new BrowserProvider(provider);
  return parseAccounts(await browserProvider.send("eth_requestAccounts", []));
}

export async function connectWalletOnly() {
  const wallet = getWalletProvider();
  const accounts =
    wallet.type === "bitget"
      ? await connectBitgetWallet(wallet.provider)
      : await connectStandardWallet(wallet.provider);

  if (!accounts.length) {
    throw new Error("No wallet account selected.");
  }

  return {
    address: accounts[0].toLowerCase(),
    wallet,
  };
}

function readBitgetChainId(provider) {
  return (
    parseChainId(provider?.chainId) ??
    parseChainId(provider?.networkVersion) ??
    1
  );
}

function readChainId(wallet) {
  const { provider, type } = wallet;

  if (type === "bitget") {
    return readBitgetChainId(provider);
  }

  if (provider?.chainId != null) {
    const parsed = parseChainId(provider.chainId);
    if (parsed) return parsed;
  }

  return 1;
}

function parseSignature(result) {
  if (typeof result === "string" && result.startsWith("0x")) {
    return result;
  }

  if (result?.signature) {
    return parseSignature(result.signature);
  }

  if (result?.result) {
    return parseSignature(result.result);
  }

  if (result?.data) {
    return parseSignature(result.data);
  }

  throw new Error("Wallet returned an invalid signature.");
}

async function getBitgetSigningAccount(provider) {
  const accounts = await provider.request({
    method: "eth_accounts",
    params: [],
  });

  if (!Array.isArray(accounts) || !accounts[0]) {
    throw new Error("No Bitget account connected. Click Connect wallet first.");
  }

  // Keep the exact string Bitget returned — do not re-checksum for the RPC call.
  return accounts[0];
}

function buildBitgetSignChallenge(address, nonce) {
  return `Sign in to Ballena Azul (nonce: ${nonce}, address: ${address})`;
}

async function signBitgetChallenge(provider, challenge, from) {
  const signer = from || (await getBitgetSigningAccount(provider));

  try {
    const signature = await provider.request({
      method: "personal_sign",
      params: [challenge, signer],
    });

    return parseSignature(signature);
  } catch (error) {
    throw normalizeWalletError(
      error,
      "Bitget Wallet could not sign the sign-in message.",
    );
  }
}

async function signStandardMessage(provider, address, preparedMessage) {
  const checksummedAddress = getAddress(address);
  const msgHex = hexlify(toUtf8Bytes(preparedMessage));

  if (typeof provider.request === "function") {
    try {
      return parseSignature(
        await provider.request({
          method: "personal_sign",
          params: [preparedMessage, checksummedAddress],
        }),
      );
    } catch {
      return parseSignature(
        await provider.request({
          method: "personal_sign",
          params: [msgHex, checksummedAddress],
        }),
      );
    }
  }

  const browserProvider = new BrowserProvider(provider);
  const signer = await browserProvider.getSigner(checksummedAddress);
  return signer.signMessage(preparedMessage);
}

export async function signInWithWallet(address) {
  const bitgetProvider = getBitgetProvider();
  const wallet = bitgetProvider
    ? { provider: bitgetProvider, type: "bitget" }
    : getWalletProvider();

  const bitgetFrom = bitgetProvider
    ? await getBitgetSigningAccount(bitgetProvider)
    : null;
  const signingAddress = getAddress(bitgetFrom || address);

  const nonceResponse = await requestAuthNonce(signingAddress);

  if (!nonceResponse.ok) {
    throw new Error(
      nonceResponse.body?.error ||
        "Could not reach the sign-in API. Is the backend running on port 3000?",
    );
  }

  const nonce = nonceResponse.body.nonce;
  let signMessage;
  let signature;

  try {
    if (wallet.type === "bitget") {
      signMessage = buildBitgetSignChallenge(signingAddress, nonce);
      signature = await signBitgetChallenge(
        bitgetProvider,
        signMessage,
        bitgetFrom,
      );
    } else {
      const message = new SiweMessage({
        domain: SIWE_DOMAIN,
        address: signingAddress,
        statement: SIWE_STATEMENT,
        uri: SIWE_URI,
        version: "1",
        chainId: readChainId(wallet),
        nonce,
      });
      signMessage = message.prepareMessage();
      signature = await signStandardMessage(
        wallet.provider,
        signingAddress,
        signMessage,
      );
    }
  } catch (error) {
    throw normalizeWalletError(
      error,
      "Wallet could not sign the sign-in message.",
    );
  }

  const verifyResponse = await verifyAuthMessage({
    message: signMessage,
    signature,
  });

  if (!verifyResponse.ok) {
    throw new Error(
      verifyResponse.body?.error ||
        `Server rejected sign-in (${verifyResponse.status}).`,
    );
  }

  setAuthToken(verifyResponse.body.token);

  return {
    address: signingAddress.toLowerCase(),
    token: verifyResponse.body.token,
    whale: verifyResponse.body.whale,
  };
}

export async function connectAndSignIn() {
  const { address } = await connectWalletOnly();
  return signInWithWallet(address);
}

export function shortenAddress(address) {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export { isBitgetAvailable };
