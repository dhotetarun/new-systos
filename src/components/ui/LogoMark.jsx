/** SyStos isometric cube mark (inline SVG). */
export default function LogoMark({ className = "w-full h-full" }) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      <polygon points="22,4 38,13 22,22 6,13" fill="#221E1F" stroke="#2FB3E8" strokeWidth="0.8" />
      <polygon points="6,13 22,22 22,37 6,28" fill="#E31B23" stroke="#C4131A" strokeWidth="0.5" />
      <polygon points="22,22 38,13 38,28 22,37" fill="#D92328" stroke="#A81419" strokeWidth="0.5" />
      <path d="M 4,31 Q 20,41 40,30" fill="none" stroke="#E31B23" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 8,36 Q 22,43 38,36" fill="none" stroke="#1B2A78" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 12,38 Q 23,44 34,39" fill="none" stroke="#2FB3E8" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
