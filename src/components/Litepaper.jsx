import { litepaper } from "../content.js";

export default function Litepaper() {
  return (
    <section id="litepaper" className="section-shell">
      <div className="card mx-auto max-w-3xl text-center">
        <span className="text-5xl">📄</span>
        <h2 className="mt-6 text-3xl font-bold">{litepaper.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted">
          {litepaper.body}
        </p>
        <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-tide bg-deep px-5 py-2 text-sm text-glow">
          ⧖ {litepaper.status}
        </span>
      </div>
    </section>
  );
}
