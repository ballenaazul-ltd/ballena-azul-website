import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWhaleProfile } from "../api/whale.js";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

export default function ProfilePage() {
  const { address } = useParams();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setStatus("loading");
      setError("");

      try {
        const response = await getWhaleProfile(address);

        if (cancelled) return;

        if (!response.ok) {
          setStatus("error");
          setError(
            response.body?.error ||
              "This wallet is not registered in the Ballena Azul protocol.",
          );
          return;
        }

        setProfile(response.body);
        setStatus("success");
      } catch {
        if (!cancelled) {
          setStatus("error");
          setError(
            "Could not load profile. Make sure the backend is running on port 3000.",
          );
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [address]);

  return (
    <main className="relative">
      <section className="section-shell pt-40 pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Whale Profile</span>
          <h1 className="text-4xl font-extrabold sm:text-5xl">Public Registry</h1>
          <p className="mt-6 text-lg text-muted">
            Transparency credentials for registered large holders.
          </p>
        </div>

        {status === "loading" && (
          <p className="mt-12 text-center text-muted">Loading profile...</p>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="card mx-auto mt-12 max-w-xl border-red-500/40 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200"
          >
            {error}
          </div>
        )}

        {status === "success" && profile && (
          <div className="card mx-auto mt-12 max-w-xl space-y-6 text-left">
            <div>
              <p className="text-sm text-muted">Wallet address</p>
              <p className="mt-1 break-all font-mono text-foam">{profile.address}</p>
            </div>

            {profile.displayName && (
              <div>
                <p className="text-sm text-muted">Display name</p>
                <p className="mt-1 text-lg font-semibold text-foam">
                  {profile.displayName}
                </p>
              </div>
            )}

            {profile.publicNote && (
              <div>
                <p className="text-sm text-muted">Public note</p>
                <p className="mt-1 text-foam">{profile.publicNote}</p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted">Chain</p>
                <p className="mt-1 uppercase text-foam">{profile.chain}</p>
              </div>
              <div>
                <p className="text-sm text-muted">Trust score</p>
                <p className="mt-1 text-2xl font-bold text-glow">
                  {profile.trustScore}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted">Disclosures</p>
                <p className="mt-1 text-foam">{profile.disclosureCount}</p>
              </div>
              <div>
                <p className="text-sm text-muted">Joined</p>
                <p className="mt-1 text-foam">{formatDate(profile.joinedAt)}</p>
              </div>
            </div>

            {profile.badge ? (
              <div className="rounded-xl border border-tide/60 bg-deep/60 p-4">
                <p className="text-sm text-muted">Trust badge</p>
                <p className="mt-1 font-semibold text-foam">
                  Token #{profile.badge.tokenId} · {profile.badge.status}
                </p>
                <Link
                  to="/verify"
                  className="mt-3 inline-block text-sm text-glow hover:underline"
                >
                  Verify this badge →
                </Link>
              </div>
            ) : (
              <p className="text-sm text-muted">No trust badge issued yet.</p>
            )}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/register"
            className="text-sm text-muted transition-colors hover:text-glow"
          >
            Register another wallet
          </Link>
        </div>
      </section>
    </main>
  );
}
