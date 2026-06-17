import { roadmap } from "../content.js";
import SectionHeading from "./SectionHeading.jsx";

const STATUS_STYLES = {
  completed: {
    badge: "border-glow/60 bg-glow/10 text-glow",
    label: "Completed",
    marker: "✓",
  },
  planned: {
    badge: "border-tide bg-surface text-muted",
    label: "Planned",
    marker: "",
  },
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="section-shell">
      <SectionHeading
        eyebrow={roadmap.eyebrow}
        title={roadmap.title}
        body={roadmap.body}
      />

      <ol className="mt-14 grid gap-6 md:grid-cols-2">
        {roadmap.milestones.map((milestone, index) => {
          const style = STATUS_STYLES[milestone.status];
          const marker = style.marker || index + 1;

          return (
            <li key={milestone.title} className="card flex gap-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-tide bg-deep font-bold text-glow">
                {marker}
              </span>
              <div>
                <span
                  className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wide ${style.badge}`}
                >
                  {style.label}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{milestone.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">
                  {milestone.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
