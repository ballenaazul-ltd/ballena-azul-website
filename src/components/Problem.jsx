import { problem } from "../content.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Problem() {
  return (
    <section id="why" className="section-shell">
      <SectionHeading
        eyebrow={problem.eyebrow}
        title={problem.title}
        body={problem.body}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {problem.cards.map((card) => (
          <div key={card.title} className="card">
            <span className="text-4xl">{card.icon}</span>
            <h3 className="mt-6 text-xl font-semibold">{card.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
