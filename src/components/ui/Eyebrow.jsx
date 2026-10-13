const TONES = {
  red: "text-systos-red bg-red-50 border-systos-red/30",
  navy: "text-systos-navy bg-blue-50 border-systos-navy/20",
};

export default function Eyebrow({ tone = "red", className = "", children }) {
  return (
    <span className={`badge-eyebrow inline-block px-4 py-1.5 rounded-full border ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}
