import { chains } from "../content.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Chains() {
  return (
    <section id="chains" className="section-shell">
      <SectionHeading
        eyebrow={chains.eyebrow}
        title={chains.title}
        body={chains.body}
      />

      <div className="mt-14 flex flex-wrap justify-center gap-3">
        {chains.items.map((chain) => (
          <span
            key={chain.name}
            className="inline-flex items-center gap-2 rounded-full border border-tide bg-surface/60 px-4 py-2 text-sm"
          >
            <span className="text-lg">{chain.symbol}</span>
            {chain.name}
            {chain.note && (
              <span className="text-xs text-muted">({chain.note})</span>
            )}
          </span>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">
        {chains.footnote}
      </p>
    </section>
  );
}
