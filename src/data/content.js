// Place your logo at public/logo (1).png (same filename the original site used).
// If the file is missing, the footer automatically falls back to the SVG cube logo.
export const LOGO_SRC = "/images/logo.png";

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "why-us", label: "Why Us" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

// Full class strings so Tailwind can detect them.
export const TONES = {
  red: {
    chip: "bg-red-50 border-systos-red/30 text-systos-red",
    hoverBorder: "hover:border-systos-red/40",
    wash: "to-red-50",
    arrow: "group-hover:bg-systos-red",
    text: "text-systos-red",
    bar: "bg-systos-red",
  },
  navy: {
    chip: "bg-blue-50 border-systos-navy/30 text-systos-navy",
    hoverBorder: "hover:border-systos-navy/40",
    wash: "to-blue-50",
    arrow: "group-hover:bg-systos-navy",
    text: "text-systos-navy",
    bar: "bg-systos-navy",
  },
  cyan: {
    chip: "bg-sky-50 border-systos-cyan/30 text-systos-cyan",
    hoverBorder: "hover:border-systos-cyan/40",
    wash: "to-sky-50",
    arrow: "group-hover:bg-systos-cyan",
    text: "text-systos-cyan",
    bar: "bg-systos-cyan",
  },
};

export const HERO_BADGES = [
  { icon: "fa-shield-halved", color: "text-systos-navy", label: "Enterprise Security" },
  { icon: "fa-bolt", color: "text-systos-red", label: "High-Velocity SLA" },
  { icon: "fa-earth-americas", color: "text-systos-cyan", label: "Global Clients" },
];

export const STATS = [
  { target: 10, suffix: "+", label: "Years Experience", text: "Continuous innovation in enterprise software", color: "text-systos-red", suffixColor: "text-systos-navy" },
  { target: 500, suffix: "+", label: "Projects Delivered", text: "Successfully launched for global organizations", color: "text-systos-navy", suffixColor: "text-systos-red" },
  { target: 50, suffix: "+", label: "Technology Experts", text: "Specialist engineers, architects & leads", color: "text-slate-800", suffixColor: "text-systos-cyan" },
  { target: 99, suffix: "%", label: "Client Satisfaction", text: "Long-term client partnerships and trust", color: "text-emerald-600", suffixColor: "text-emerald-600" },
];

export const SERVICES = [
  { title: "Software Development", text: "Build powerful software tailored to business needs." },
  { title: "Web Designing", text: "Create stunning, responsive websites with modern layouts." },
  { title: "Multi-Media Design", text: "Design engaging visuals, videos, and creative graphics." },
  { title: "Digital Marketing", text: "Grow your brand through targeted digital strategies." },
  { title: "E-Commerce Websites", text: "Build secure online stores that drive sales." },
];

// Used in both the About section and the "Core Pillars" section (same copy as the source).
export const PILLARS = [
  { icon: "fa-lightbulb", aboutIcon: "fa-wand-magic-sparkles", tone: "red", title: "Creative Services", text: "At SyStos you will get your work done with ultimate creativity and strictly within your allocated budget." },
  { icon: "fa-users-gear", aboutIcon: "fa-users-gear", tone: "navy", title: "Experienced Team Members", text: "To be the best you have to work with the best, and we take immense pride in being leaders in what we do." },
  { icon: "fa-rocket", aboutIcon: "fa-rocket", tone: "cyan", title: "Business Development Digitally", text: "We help expand your brand footprint, making your business visible, interactive, and available everywhere." },
];

export const PROJECTS = [
  { id: "marketplace", category: "E-Commerce", tag: "E-Commerce Platform", title: "Multi-Vendor Marketplace", icon: "fa-cart-shopping", tone: "red" },
  { id: "fintech", category: "FinTech", tag: "Cloud FinTech", title: "Global Financial Analytics", icon: "fa-chart-line", tone: "navy" },
  { id: "erp", category: "Logistics ERP", tag: "Enterprise Software", title: "Supply Chain ERP Engine", icon: "fa-gears", tone: "cyan" },
];

export const TESTIMONIALS = [
  {
    quote: "I think SyStos Technology's web programmer done a great job for me. He's very skillful and good at making useful choices for the project. In the future I will hire him again, and everything was delivered within the budget.",
    initials: "FK", name: "Fausto Karino", role: "Global Client · Netherlands",
  },
  {
    quote: "Add a real client testimonial here. Keep it to two or three sentences so it fits comfortably inside the bubble.",
    initials: "CN", name: "Client Name", role: "Company · Country",
  },
  {
    quote: "Add another real client testimonial here. Each slide uses the same layout, so you can add or remove slides freely.",
    initials: "CN", name: "Client Name", role: "Company · Country",
  },
];

export const BRANDS = ["GLOBEX IT", "NEXTGEN TECH", "ALPHA MEDIA", "INNOVATE CORP", "CLOUD VENTURES", "SYNERGY LABS"];
export const BRAND_HOVER = ["hover:text-systos-navy", "hover:text-systos-red", "hover:text-systos-cyan", "hover:text-slate-900", "hover:text-systos-navy", "hover:text-systos-red"];

export const QUICK_LINKS = ["E-Commerce", "Designing", "Web Development", "SEO", "App Development", "Talent Marketplace"];
export const SOCIALS = [
  { label: "Facebook", icon: "fa-facebook-f" },
  { label: "X / Twitter", icon: "fa-twitter" },
  { label: "LinkedIn", icon: "fa-linkedin-in" },
  { label: "Instagram", icon: "fa-instagram" },
];
export const BOTTOM_LINKS = [
  { label: "About", href: "#about" },
  { label: "Blogs", href: "#" },
  { label: "Career", href: "#" },
  { label: "Contact", href: "#contact" },
  { label: "Sitemap", href: "#" },
];
export const SERVICE_OPTIONS = [
  "Web Designing", "Software Development", "E-Commerce Websites",
  "Mobile App Development", "Digital Marketing & SEO", "Multi-Media Design",
];
