export default function SectionHeading({ eyebrow, title, body, align = "center" }) {
  const alignment = align === "left" ? "text-left" : "mx-auto text-center";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {body && <p className="mt-4 text-lg leading-relaxed text-muted">{body}</p>}
    </div>
  );
}
