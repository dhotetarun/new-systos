const SIZES = { md: "px-8 py-4 text-sm", sm: "px-5 py-2.5 text-xs" };

export default function Button({ variant = "primary", size = "md", href, onClick, className = "", children, ...rest }) {
  const look = variant === "primary" ? "btn-primary-glow btn-shine-sweep" : "btn-secondary-light";
  const cls = `btn-magnetic ${look} font-display font-bold uppercase tracking-wide rounded-xl ${SIZES[size]} ${className}`;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" onClick={onClick} className={cls} {...rest}>{children}</button>;
}
