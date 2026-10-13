import Eyebrow from "./Eyebrow.jsx";
import Reveal from "./Reveal.jsx";

export default function SectionHead({ eyebrow, tone = "red", title, text, className = "mb-16" }) {
  return (
    <Reveal className={`text-center max-w-3xl mx-auto ${className}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className="section-heading mt-4">{title}</h2>
      {text && <p className="mt-4 max-w-2xl mx-auto">{text}</p>}
    </Reveal>
  );
}
