export const brand = {
  name: "Ballena Azul",
  legalName: "Ballena Azul LTD",
  tagline: "DeFi Whale Transparency Protocol",
  launchLabel: "Protocol · Launching 2026",
};

export const navLinks = [
  { label: "The Problem", href: "#stats" },
  { label: "Why It Matters", href: "#why" },
  { label: "Chains", href: "#chains" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Litepaper", href: "#litepaper" },
];

export const hero = {
  badge: "Protocol Launching 2026",
  titleLeading: "Move Like a Whale.",
  titleTrailing: "Without the Panic.",
  body:
    "Ballena Azul is a DeFi transparency protocol that lets large holders signal their intentions on-chain — voluntary labeling, scheduled disclosures, and trust badges — so markets stop reacting to fear and start responding to facts.",
  primaryCta: { label: "Explore the Problem", href: "#stats" },
  secondaryCta: { label: "Read the Roadmap", href: "#roadmap" },
};

export const stats = {
  eyebrow: "The Whale Problem — By the Numbers",
  title: "Whales Move Markets",
  body:
    "A handful of wallets hold the majority of on-chain supply. When they move, everyone notices — and panics.",
  items: [
    {
      value: "~2,400",
      label: "Bitcoin addresses holding 1,000+ BTC each",
      source: "Glassnode",
    },
    {
      value: "40K+",
      label: "Wallets globally classified as crypto whales (>$1M)",
      source: "Chainalysis estimates",
    },
    {
      value: "$5B+",
      label: "Daily average whale-scale transaction volume flagged",
      source: "Whale Alert",
    },
    {
      value: "Top 1%",
      label:
        "Of addresses control the majority of circulating supply across chains",
      source: "Multiple on-chain analyses",
    },
  ],
};

export const problem = {
  eyebrow: "Why It Matters",
  title: "The Fear & Greed Loop",
  body:
    "Every time a whale moves assets, the market spirals — not because the move is dangerous, but because no one knows why it happened.",
  cards: [
    {
      icon: "📉",
      title: "Uninformed Panic",
      body:
        "A $50M transfer triggers cascading sells across retail and algorithmic traders, often collapsing assets that were perfectly healthy — all because intent was invisible.",
    },
    {
      icon: "🏷️",
      title: "No Voluntary Identity",
      body:
        "Existing tools track whale wallets from the outside. There is no mechanism for whales to voluntarily label themselves, signal liquidity plans, or build on-chain credibility.",
    },
    {
      icon: "🌊",
      title: "The Ballena Azul Fix",
      body:
        "Our protocol provides a trust layer: voluntary disclosure, scheduled move signals, and NFT-backed trust badges for verified large holders — across all major chains.",
    },
  ],
};

export const chains = {
  eyebrow: "Multi-Chain",
  title: "Wherever Whales Are",
  body:
    "The Ballena Azul trust layer will be available on every major NFT-capable chain, plus Bitcoin via our internal on-chain tagging protocol.",
  footnote:
    "Bitcoin support operates via a custom internal tagging layer — no soft fork required. NFT-capable chains receive the full Trust Badge NFT functionality at launch.",
  items: [
    { symbol: "₿", name: "Bitcoin", note: "internal tagging" },
    { symbol: "⟠", name: "Ethereum" },
    { symbol: "◎", name: "Solana" },
    { symbol: "⬡", name: "Polygon" },
    { symbol: "▲", name: "Avalanche" },
    { symbol: "⬡", name: "BNB Chain" },
    { symbol: "🔵", name: "Arbitrum" },
    { symbol: "🔵", name: "Base" },
    { symbol: "✦", name: "Cardano" },
    { symbol: "🎨", name: "Tezos" },
    { symbol: "🌊", name: "Flow" },
    { symbol: "◎", name: "Near" },
    { symbol: "◈", name: "Aptos" },
    { symbol: "💧", name: "Sui" },
  ],
};

export const roadmap = {
  eyebrow: "Roadmap — 2026",
  title: "The Path to Launch",
  body:
    "Every milestone is planned for this year. No vague timelines — just sequential, auditable steps from landing to mainnet.",
  milestones: [
    {
      status: "completed",
      title: "Landing Site Launch",
      body: "The project's first public presence. You're looking at it.",
    },
    {
      status: "planned",
      title: "Full Website Launch",
      body:
        "Complete project site: documentation, protocol specs, trust registry, and dashboard.",
    },
    {
      status: "planned",
      title: "Smart Contract Development",
      body:
        "Core trust-layer smart contracts — whale registry, disclosure signals, and permission system.",
    },
    {
      status: "planned",
      title: "Blue Whale Trust Token",
      body:
        "Utility NFT issued to verified whale wallets on supported chains — a portable, on-chain trust credential.",
    },
    {
      status: "planned",
      title: "Independent Security Audit",
      body:
        "Third-party audit of all smart contracts before any public deployment. No shortcuts.",
    },
    {
      status: "planned",
      title: "TestNet Launch",
      body:
        "Full protocol deployment on testnets. Public stress-testing, community feedback, and iteration cycle before mainnet.",
    },
  ],
};

export const litepaper = {
  title: "Ballena Azul Litepaper",
  body:
    "A concise technical overview of the protocol: the trust model, the disclosure mechanism, the NFT credential system, and why voluntary transparency beats forced surveillance for reducing whale-driven market panic.",
  status: "Coming Q3 2026",
};
