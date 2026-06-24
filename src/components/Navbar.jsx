import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { brand, navLinks } from "../content.js";
import WhaleLogo from "./WhaleLogo.jsx";

const SCROLL_THRESHOLD = 24;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
        <Link to="/" className="flex items-center gap-2 font-bold">
          <WhaleLogo variant="compact" className="h-8 w-auto" />
          <span>{brand.name}</span>
          <span className="hidden text-sm font-normal text-muted sm:inline">
            {brand.launchLabel}
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-foam">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <Link
            to="/register"
            className={`hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:inline-flex ${
              location.pathname === "/register"
                ? "bg-whale text-foam"
                : "border border-tide text-foam hover:bg-surface"
            }`}
          >
            Register
          </Link>

          <Link
            to="/verify"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              location.pathname === "/verify"
                ? "bg-whale text-foam"
                : "border border-tide text-foam hover:bg-surface"
            }`}
          >
            Verify Token
          </Link>
        </div>
      </nav>
    </header>
  );
}
