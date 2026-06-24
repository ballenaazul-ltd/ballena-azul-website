import { Link } from "react-router-dom";
import { hero } from "../content.js";
import WhaleLogo from "./WhaleLogo.jsx";

function CtaLink({ href, className, children }) {
  if (href.startsWith("/") && !href.includes("#")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function Hero() {
  return (
    <section id="top" className="section-shell pt-40 text-center">
      <WhaleLogo
        variant="hero"
        className="mx-auto mb-8 h-auto w-full max-w-md animate-float"
      />

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
        <CtaLink
          href={hero.primaryCta.href}
          className="rounded-full bg-whale px-8 py-3 font-semibold text-foam transition-transform hover:scale-105"
        >
          {hero.primaryCta.label}
        </CtaLink>
        <CtaLink
          href={hero.secondaryCta.href}
          className="rounded-full border border-tide px-8 py-3 font-semibold text-foam transition-colors hover:bg-surface"
        >
          {hero.secondaryCta.label}
        </CtaLink>
      </div>
    </section>
  );
}
