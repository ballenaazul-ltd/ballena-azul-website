import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerWhale } from "../api/whale.js";
import { getAuthAddress, getAuthToken } from "../api/auth.js";
import { registerChains } from "../content.js";
import {
  connectWalletOnly,
  shortenAddress,
  signInWithWallet,
} from "../lib/walletAuth.js";

export default function RegisterPage() {
  const [form, setForm] = useState({
    chain: "ethereum",
    displayName: "",
    publicNote: "",
  });
  const [walletAddress, setWalletAddress] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    const address = getAuthAddress();

    if (token && address) {
      setAuthToken(token);
      setWalletAddress(address);
    }
  }, []);

  function updateField(field) {
    return (event) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };
  }

  async function handleConnectWallet() {
    setStatus("connecting");
    setError("");

    try {
      const session = await connectWalletOnly();
      setWalletAddress(session.address);
      setAuthToken("");
      setStatus("idle");
    } catch (connectError) {
      setStatus("error");
      const message =
        connectError instanceof Error
          ? connectError.message
          : "Wallet connection failed.";
      setError(message);
      console.error("Wallet connection failed:", connectError);
    }
  }

  async function handleSignIn() {
    if (!walletAddress) {
      setError("Connect your wallet before signing in.");
      return;
    }

    setStatus("connecting");
    setError("");

    try {
      const session = await signInWithWallet(walletAddress);
      setAuthToken(session.token);
      setStatus("idle");
    } catch (signError) {
      setStatus("error");
      const message =
        signError instanceof Error
          ? signError.message
          : "Wallet sign-in failed.";
      setError(message);
      console.error("Wallet sign-in failed:", signError);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    setResult(null);

    if (!walletAddress || !authToken) {
      setStatus("error");
      setError("Connect and sign in with your wallet before registering.");
      return;
    }

    try {
      const response = await registerWhale({
        chain: form.chain,
        displayName: form.displayName.trim() || undefined,
        publicNote: form.publicNote.trim() || undefined,
      });

      if (!response.ok) {
        setStatus("error");
        setError(
          response.body?.error ||
            response.body?.message ||
            "Registration failed. Please try again.",
        );
        return;
      }

      setResult(response.body);
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        "Could not reach the registration API. Make sure the backend is running on port 3000.",
      );
    }
  }

  if (status === "success" && result) {
    return (
      <main className="relative">
        <section className="section-shell pt-40 pb-32">
          <div className="card mx-auto max-w-xl text-center">
            <span className="mb-4 inline-block rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-emerald-200">
              Registered
            </span>
            <h1 className="text-3xl font-extrabold text-foam">
              Welcome to Ballena Azul
            </h1>
            <p className="mt-4 text-muted">
              Your wallet is now enrolled in the voluntary transparency protocol.
            </p>

            <dl className="mt-8 space-y-4 text-left text-sm">
              <div>
                <dt className="text-muted">Wallet</dt>
                <dd className="mt-1 break-all font-mono text-foam">{result.address}</dd>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-muted">Chain</dt>
                  <dd className="mt-1 uppercase text-foam">{result.chain}</dd>
                </div>
                <div>
                  <dt className="text-muted">Trust score</dt>
                  <dd className="mt-1 text-foam">{result.trustScore}</dd>
                </div>
              </div>
              {result.displayName && (
                <div>
                  <dt className="text-muted">Display name</dt>
                  <dd className="mt-1 text-foam">{result.displayName}</dd>
                </div>
              )}
              {result.publicNote && (
                <div>
                  <dt className="text-muted">Public note</dt>
                  <dd className="mt-1 text-foam">{result.publicNote}</dd>
                </div>
              )}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to={`/profile/${result.address}`}
                className="rounded-full bg-whale px-6 py-3 font-semibold text-foam transition-transform hover:scale-105"
              >
                View public profile
              </Link>
              <Link
                to="/verify"
                className="rounded-full border border-tide px-6 py-3 font-semibold text-foam transition-colors hover:bg-surface"
              >
                Verify a badge
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative">
      <section className="section-shell pt-40 pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Institutional Enrollment</span>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Register Your{" "}
            <span className="bg-gradient-to-r from-glow to-whale bg-clip-text text-transparent">
              Wallet
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Connect your Ethereum wallet and sign in to register with Ballena
            Azul. Your signature proves you control the wallet.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card mx-auto mt-12 max-w-xl space-y-6"
        >
          <div className="space-y-4 rounded-xl border border-tide/60 bg-deep/60 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-left">
                <p className="text-sm font-medium text-foam">Wallet sign-in</p>
                <p className="mt-1 text-sm text-muted">
                  {walletAddress
                    ? `Connected: ${shortenAddress(walletAddress)}`
                    : "Step 1: connect your Bitget or MetaMask wallet."}
                </p>
                {walletAddress && !authToken && (
                  <p className="mt-1 text-sm text-muted">
                    Step 2: sign the message to verify you control this wallet.
                  </p>
                )}
                {authToken && (
                  <p className="mt-1 text-sm text-emerald-200">
                    Wallet verified. You can register below.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={handleConnectWallet}
                disabled={status === "connecting" || status === "loading"}
                className="rounded-full border border-tide px-5 py-2 text-sm font-semibold text-foam transition-colors hover:bg-surface disabled:opacity-60"
              >
                {status === "connecting" && !walletAddress
                  ? "Connecting..."
                  : walletAddress
                    ? "Reconnect wallet"
                    : "Connect wallet"}
              </button>
            </div>

            {walletAddress && !authToken && (
              <button
                type="button"
                onClick={handleSignIn}
                disabled={status === "connecting" || status === "loading"}
                className="w-full rounded-full bg-whale py-2 text-sm font-semibold text-foam transition-transform hover:scale-[1.01] disabled:opacity-60"
              >
                {status === "connecting"
                  ? "Waiting for signature..."
                  : "Sign in with wallet"}
              </button>
            )}
          </div>

          <div>
            <label
              htmlFor="chain"
              className="mb-2 block text-sm font-medium text-foam"
            >
              Primary chain
            </label>
            <select
              id="chain"
              value={form.chain}
              onChange={updateField("chain")}
              className="w-full rounded-xl border border-tide bg-deep px-4 py-3 text-sm text-foam outline-none transition-colors focus:border-glow"
            >
              {registerChains.map((chain) => (
                <option key={chain.value} value={chain.value}>
                  {chain.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="display-name"
              className="mb-2 block text-sm font-medium text-foam"
            >
              Display name{" "}
              <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="display-name"
              type="text"
              value={form.displayName}
              onChange={updateField("displayName")}
              placeholder="e.g. Protocol Vault A"
              maxLength={100}
              className="w-full rounded-xl border border-tide bg-deep px-4 py-3 text-sm text-foam placeholder:text-muted/60 outline-none transition-colors focus:border-glow"
            />
          </div>

          <div>
            <label
              htmlFor="public-note"
              className="mb-2 block text-sm font-medium text-foam"
            >
              Public note{" "}
              <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="public-note"
              value={form.publicNote}
              onChange={updateField("publicNote")}
              placeholder="Cold custody — migration only"
              rows={3}
              className="w-full resize-none rounded-xl border border-tide bg-deep px-4 py-3 text-sm text-foam placeholder:text-muted/60 outline-none transition-colors focus:border-glow"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-whale py-3 font-semibold text-foam transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={
              status === "loading" ||
              status === "connecting" ||
              !walletAddress ||
              !authToken
            }
          >
            {status === "loading" ? "Registering..." : "Register wallet"}
          </button>

          {error && (
            <div
              role="alert"
              className="whitespace-pre-line rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              {error}
            </div>
          )}
        </form>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="text-sm text-muted transition-colors hover:text-glow"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
