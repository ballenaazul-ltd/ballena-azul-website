import { brand } from "../content.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-tide/60 bg-deep">
      <div className="mx-auto flex max-w-content flex-col items-center gap-3 px-6 py-12 text-center text-sm text-muted">
        <div className="flex items-center gap-2 font-semibold text-foam">
          <span className="text-lg">🐋</span>
          {brand.legalName}
        </div>
        <p>{brand.tagline}</p>
        <p>
          Protocol launching 2026 · © {year} {brand.legalName}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
