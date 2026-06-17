import { stats } from "../content.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Stats() {
  return (
    <section id="stats" className="section-shell">
      <SectionHeading
        eyebrow={stats.eyebrow}
        title={stats.title}
        body={stats.body}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.items.map((item) => (
          <div key={item.label} className="card">
            <p className="text-4xl font-extrabold text-glow">{item.value}</p>
            <p className="mt-4 text-sm leading-relaxed text-foam">
              {item.label}
            </p>
            <p className="mt-4 text-xs uppercase tracking-wide text-muted">
              Source: {item.source}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
