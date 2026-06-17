import { hero } from "../content.js";

export default function Hero() {
  return (
    <section id="top" className="section-shell pt-40 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-tide bg-surface/60 px-4 py-1.5 text-sm text-glow">
        <span className="h-2 w-2 animate-pulse rounded-full bg-glow" />
        {hero.badge}
      </span>

      <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-extrabold leading-tight sm:text-6xl">
        {hero.titleLeading}
        <br />
        <span className="bg-gradient-to-r from-glow to-whale bg-clip-text text-transparent">
          {hero.titleTrailing}
        </span>
      </h1>

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted">
        {hero.body}
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href={hero.primaryCta.href}
          className="rounded-full bg-whale px-8 py-3 font-semibold text-foam transition-transform hover:scale-105"
        >
          {hero.primaryCta.label}
        </a>
        <a
          href={hero.secondaryCta.href}
          className="rounded-full border border-tide px-8 py-3 font-semibold text-foam transition-colors hover:bg-surface"
        >
          {hero.secondaryCta.label}
        </a>
      </div>
    </section>
  );
}
