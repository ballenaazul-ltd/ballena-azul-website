import { useEffect, useState } from "react";
import { brand, navLinks } from "../content.js";

const SCROLL_THRESHOLD = 24;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shellClass = scrolled
    ? "border-tide/60 bg-abyss/80 backdrop-blur"
    : "border-transparent bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${shellClass}`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-bold">
          <span className="text-xl">🐋</span>
          <span>{brand.name}</span>
          <span className="hidden text-sm font-normal text-muted sm:inline">
            {brand.launchLabel}
          </span>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-foam">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
