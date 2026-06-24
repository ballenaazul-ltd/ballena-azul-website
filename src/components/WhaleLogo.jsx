import { useId } from "react";

function HeroWhale({ className, idPrefix }) {
  return (
    <svg
      className={className}
      viewBox="0 0 290 190"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${idPrefix}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#0077b6" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-fin`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0096c7" />
          <stop offset="100%" stopColor="#005f99" />
        </linearGradient>
        <filter id={`${idPrefix}-glow`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M20 110 C20 65 75 30 175 52 C215 62 242 54 258 44 C270 36 276 50 268 63 C260 74 242 72 225 82 C198 96 162 118 110 127 C70 133 28 128 20 110 Z"
        fill={`url(#${idPrefix}-body)`}
        filter={`url(#${idPrefix}-glow)`}
      />
      <path
        d="M32 118 C50 132 90 138 138 130 C170 124 195 108 210 88 C185 112 142 128 95 132 C60 135 38 127 32 118 Z"
        fill="white"
        opacity="0.14"
      />
      <path
        d="M258 44 C278 26 295 34 288 52 C282 64 264 64 260 61 Z"
        fill={`url(#${idPrefix}-fin)`}
      />
      <path
        d="M260 61 C274 64 286 76 278 87 C270 96 254 86 250 74 Z"
        fill={`url(#${idPrefix}-fin)`}
      />
      <path
        d="M158 54 C165 20 176 8 185 16 C193 28 188 50 178 56 Z"
        fill={`url(#${idPrefix}-fin)`}
      />
      <path
        d="M105 118 C92 140 86 156 100 158 C116 160 126 136 120 120 Z"
        fill="#0096c7"
        opacity="0.85"
      />
      <circle cx="60" cy="97" r="10" fill="#03045e" />
      <circle cx="57" cy="94" r="4.5" fill="white" opacity="0.78" />
      <line
        x1="138"
        y1="56"
        x2="132"
        y2="20"
        stroke="#90e0ef"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.9"
      />
      <line
        x1="148"
        y1="54"
        x2="145"
        y2="18"
        stroke="#90e0ef"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <line
        x1="158"
        y1="54"
        x2="158"
        y2="20"
        stroke="#90e0ef"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="168"
        y1="56"
        x2="170"
        y2="24"
        stroke="#90e0ef"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

function CompactWhale({ className, idPrefix }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 65"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${idPrefix}-nav`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#0077b6" />
        </linearGradient>
      </defs>
      <path
        d="M8 36 C8 18 28 6 62 14 C78 18 88 15 94 11 C99 8 101 14 97 20 C93 25 85 24 78 28 C66 34 52 42 34 45 C20 47 10 43 8 36 Z"
        fill={`url(#${idPrefix}-nav)`}
      />
      <path
        d="M94 11 C101 5 108 8 105 16 C103 21 95 21 93 19 Z"
        fill="#0077b6"
      />
      <path
        d="M93 19 C100 20 106 26 103 31 C100 35 91 30 90 25 Z"
        fill="#0077b6"
      />
      <path
        d="M55 15 C58 4 62 0 66 3 C69 8 68 16 64 18 Z"
        fill="#0096c7"
      />
      <circle cx="22" cy="31" r="4" fill="#03045e" />
      <circle cx="21" cy="30" r="1.8" fill="white" opacity="0.75" />
      <line
        x1="46"
        y1="16"
        x2="43"
        y2="4"
        stroke="#90e0ef"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.85"
      />
      <line
        x1="50"
        y1="15"
        x2="49"
        y2="3"
        stroke="#90e0ef"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.65"
      />
      <line
        x1="54"
        y1="15"
        x2="55"
        y2="4"
        stroke="#90e0ef"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

function FooterWhale({ className, idPrefix }) {
  return (
    <svg
      className={className}
      viewBox="0 0 290 190"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${idPrefix}-footer`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#0077b6" />
        </linearGradient>
      </defs>
      <path
        d="M20 110 C20 65 75 30 175 52 C215 62 242 54 258 44 C270 36 276 50 268 63 C260 74 242 72 225 82 C198 96 162 118 110 127 C70 133 28 128 20 110 Z"
        fill={`url(#${idPrefix}-footer)`}
      />
      <path
        d="M258 44 C278 26 295 34 288 52 C282 64 264 64 260 61 Z"
        fill="#0077b6"
      />
      <path
        d="M260 61 C274 64 286 76 278 87 C270 96 254 86 250 74 Z"
        fill="#0077b6"
      />
      <path
        d="M158 54 C165 20 176 8 185 16 C193 28 188 50 178 56 Z"
        fill="#0096c7"
      />
      <circle cx="60" cy="97" r="10" fill="#03045e" />
      <circle cx="57" cy="94" r="4.5" fill="white" opacity="0.5" />
    </svg>
  );
}

const VARIANTS = {
  hero: HeroWhale,
  compact: CompactWhale,
  footer: FooterWhale,
};

export default function WhaleLogo({ variant = "hero", className = "" }) {
  const id = useId().replace(/:/g, "");
  const Whale = VARIANTS[variant] || HeroWhale;

  return <Whale className={className} idPrefix={`whale-${id}`} />;
}
