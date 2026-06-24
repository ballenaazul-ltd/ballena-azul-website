import { BrowserProvider } from "ethers";
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

function getEthereumProvider() {
  if (!window.ethereum) {
    throw new Error("No Ethereum wallet found. Install MetaMask to continue.");
  }

  return window.ethereum;
}

export async function connectAndSignIn() {
  const provider = new BrowserProvider(getEthereumProvider());
  const accounts = await provider.send("eth_requestAccounts", []);

  if (!accounts?.length) {
    throw new Error("No wallet account selected.");
  }

  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const network = await provider.getNetwork();

  const nonceResponse = await requestAuthNonce(address);

  if (!nonceResponse.ok) {
    throw new Error(
      nonceResponse.body?.error || "Could not start wallet sign-in.",
    );
  }

  const message = new SiweMessage({
    domain: SIWE_DOMAIN,
    address,
    statement: SIWE_STATEMENT,
    uri: SIWE_URI,
    version: "1",
    chainId: Number(network.chainId),
    nonce: nonceResponse.body.nonce,
  });

  const preparedMessage = message.prepareMessage();
  const signature = await signer.signMessage(preparedMessage);

  const verifyResponse = await verifyAuthMessage({
    message: preparedMessage,
    signature,
  });

  if (!verifyResponse.ok) {
    throw new Error(
      verifyResponse.body?.error || "Wallet signature verification failed.",
    );
  }

  setAuthToken(verifyResponse.body.token);

  return {
    address: address.toLowerCase(),
    token: verifyResponse.body.token,
    whale: verifyResponse.body.whale,
  };
}

export function shortenAddress(address) {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
