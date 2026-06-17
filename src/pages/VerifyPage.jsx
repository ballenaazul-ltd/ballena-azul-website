import { useState } from "react";
import { Link } from "react-router-dom";

const EVM_ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;

function isValidEvmAddress(value) {
  return EVM_ADDRESS_PATTERN.test(value.trim());
}

export default function VerifyPage() {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  function handleVerify(event) {
    event.preventDefault();
    setStatus("idle");
    setMessage("");

    const trimmedAddress = contractAddress.trim();

    if (!trimmedAddress) {
      setStatus("error");
      setMessage("Please enter an NFT contract address.");
      return;
    }

    if (!isValidEvmAddress(trimmedAddress)) {
      setStatus("error");
      setMessage(
        "That doesn't look like a valid address. Use a 0x-prefixed EVM contract address (42 characters).",
      );
      return;
    }

    if (tokenId.trim() && !/^\d+$/.test(tokenId.trim())) {
      setStatus("error");
      setMessage("Token ID must be a whole number.");
      return;
    }

    setStatus("pending");
    setMessage(
      "Address format is valid. On-chain verification will be available once the backend is connected.",
    );
  }

  return (
    <main className="relative">
      <section className="section-shell pt-40 pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Public Verification</span>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Verify a{" "}
            <span className="bg-gradient-to-r from-glow to-whale bg-clip-text text-transparent">
              Trust Badge
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Check whether an NFT is an official Ballena Azul trust credential.
            Enter the contract address below — anyone can verify, no wallet
            required.
          </p>
        </div>

        <form
          onSubmit={handleVerify}
          className="card mx-auto mt-12 max-w-xl space-y-6"
        >
          <div>
            <label
              htmlFor="contract-address"
              className="mb-2 block text-sm font-medium text-foam"
            >
              NFT contract address
            </label>
            <input
              id="contract-address"
              type="text"
              value={contractAddress}
              onChange={(event) => setContractAddress(event.target.value)}
              placeholder="0x..."
              spellCheck={false}
              autoComplete="off"
              className="w-full rounded-xl border border-tide bg-deep px-4 py-3 font-mono text-sm text-foam placeholder:text-muted/60 outline-none transition-colors focus:border-glow"
            />
          </div>

          <div>
            <label
              htmlFor="token-id"
              className="mb-2 block text-sm font-medium text-foam"
            >
              Token ID{" "}
              <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="token-id"
              type="text"
              inputMode="numeric"
              value={tokenId}
              onChange={(event) => setTokenId(event.target.value)}
              placeholder="e.g. 1"
              spellCheck={false}
              autoComplete="off"
              className="w-full rounded-xl border border-tide bg-deep px-4 py-3 text-sm text-foam placeholder:text-muted/60 outline-none transition-colors focus:border-glow"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-whale py-3 font-semibold text-foam transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status === "pending"}
          >
            Verify
          </button>

          {message && (
            <div
              role="status"
              className={`rounded-xl border px-4 py-3 text-sm ${
                status === "error"
                  ? "border-red-500/40 bg-red-500/10 text-red-200"
                  : "border-glow/40 bg-glow/10 text-glow"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted">
          Full on-chain verification against the Ballena Azul registry is coming
          soon. This page will confirm badge authenticity in real time once the
          backend is live.
        </p>

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
