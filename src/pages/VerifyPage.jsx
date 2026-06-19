import { useState } from "react";
import { Link } from "react-router-dom";
import { verifyByTokenId, verifyByWallet } from "../api/verify.js";

const EVM_ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/i;
const TOKEN_ID_PATTERN = /^\d+$/;

function parseQuery(value) {
  const trimmed = value.trim();

  if (TOKEN_ID_PATTERN.test(trimmed)) {
    return { type: "tokenId", value: trimmed };
  }

  if (EVM_ADDRESS_PATTERN.test(trimmed)) {
    return { type: "wallet", value: trimmed.toLowerCase() };
  }

  return { type: "invalid", value: trimmed };
}

function statusLabel(status) {
  const labels = {
    ACTIVE: "Active",
    DEPRECATED: "Deprecated",
    REVOKED: "Revoked",
    NOT_FOUND: "Not found",
    EXPIRED: "Expired",
  };

  return labels[status] || status;
}

function statusClass(status) {
  if (status === "ACTIVE") {
    return "border-emerald-500/40 bg-emerald-500/10 text-emerald-200";
  }

  if (status === "DEPRECATED" || status === "EXPIRED") {
    return "border-amber-500/40 bg-amber-500/10 text-amber-200";
  }

  return "border-red-500/40 bg-red-500/10 text-red-200";
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

function BadgeResultCard({ badge }) {
  return (
    <div className="rounded-xl border border-tide/60 bg-deep/60 p-5 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold text-foam">Token #{badge.tokenId}</h3>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass(badge.status)}`}
        >
          {statusLabel(badge.status)}
        </span>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="text-muted">Originally issued to</dt>
          <dd className="mt-1 break-all font-mono text-foam">{badge.issuedTo}</dd>
        </div>
        <div>
          <dt className="text-muted">Current owner</dt>
          <dd className="mt-1 break-all font-mono text-foam">
            {badge.currentOwner || "—"}
          </dd>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-muted">Issued at</dt>
            <dd className="mt-1 text-foam">{formatDate(badge.issuedAt)}</dd>
          </div>
          <div>
            <dt className="text-muted">Chain</dt>
            <dd className="mt-1 uppercase text-foam">{badge.chain}</dd>
          </div>
        </div>
      </dl>

      {badge.message && (
        <p className="mt-4 text-sm text-muted">{badge.message}</p>
      )}
    </div>
  );
}

export default function VerifyPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  async function handleVerify(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    setResults([]);

    const parsed = parseQuery(query);

    if (parsed.type === "invalid") {
      setStatus("error");
      setError(
        "Enter a numeric token ID (e.g. 1) or a wallet address (0x...).",
      );
      return;
    }

    try {
      const response =
        parsed.type === "tokenId"
          ? await verifyByTokenId(parsed.value)
          : await verifyByWallet(parsed.value);

      if (!response.ok) {
        setStatus("error");

        if (response.body?.status === "NOT_FOUND") {
          setError(
            response.body.message ||
              "No badge found in the Ballena Azul registry.",
          );
          return;
        }

        setError(
          response.body?.error ||
            response.body?.message ||
            "Verification failed. Please try again.",
        );
        return;
      }

      const badges =
        parsed.type === "wallet" ? response.body.badges : [response.body];

      setResults(badges);
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        "Could not reach the verification API. Make sure the backend is running on port 3000.",
      );
    }
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
            Enter a token ID or wallet address to check badge status against the
            Ballena Azul registry. No wallet connection required.
          </p>
        </div>

        <form
          onSubmit={handleVerify}
          className="card mx-auto mt-12 max-w-xl space-y-6"
        >
          <div>
            <label
              htmlFor="verify-query"
              className="mb-2 block text-sm font-medium text-foam"
            >
              Token ID or wallet address
            </label>
            <input
              id="verify-query"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. 1 or 0x..."
              spellCheck={false}
              autoComplete="off"
              className="w-full rounded-xl border border-tide bg-deep px-4 py-3 font-mono text-sm text-foam placeholder:text-muted/60 outline-none transition-colors focus:border-glow"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-whale py-3 font-semibold text-foam transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Verifying..." : "Verify"}
          </button>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              {error}
            </div>
          )}
        </form>

        {results.length > 0 && (
          <div className="mx-auto mt-8 max-w-xl space-y-4">
            {results.map((badge) => (
              <BadgeResultCard key={badge.tokenId} badge={badge} />
            ))}
          </div>
        )}

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
