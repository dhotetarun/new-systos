import { useState } from "react";
import { BOTTOM_LINKS, LOGO_SRC, QUICK_LINKS, SOCIALS } from "../../data/content.js";
import LogoMark from "../ui/LogoMark.jsx";
import Reveal from "../ui/Reveal.jsx";

function FooterLogo() {
  const [failed, setFailed] = useState(false);
  return (
    <a href="#home" className="sx-lf-logo" aria-label="SyStos Technology home">
      {failed ? (
        <>
          <LogoMark className="" />
          <span>
            <b>SyStos<i>Technology</i></b>
            <small>You Think We Do</small>
          </span>
        </>
      ) : (
        <img src={LOGO_SRC} alt="SyStos Technology - You Think We Do" onError={() => setFailed(true)} />
      )}
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="sx-lf-wrap w-full relative z-10 overflow-hidden">
      <div className="sx-lf-blob sx-lf-b1" aria-hidden="true" />
      <div className="sx-lf-blob sx-lf-b2" aria-hidden="true" />
      <div className="sx-lf-blob sx-lf-b3" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="sx-lf">
          <div className="sx-lf-in">
            <div className="sx-lf-top">
              {/* Brand & About Column */}
              <div className="sx-lf-col-brand">
                <FooterLogo />
                <p className="sx-lf-about">
                  SEO-friendly and responsive web designs for your business in your budget. At SyStos Technology, you get quality digital solutions delivered within time.
                </p>
                <div className="sx-lf-soc">
                  {SOCIALS.map((s) => (
                    <a key={s.label} href="#" aria-label={s.label}>
                      <i className={`fa-brands ${s.icon}`} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links Column */}
              <nav aria-label="Quick links" className="sx-lf-col-links">
                <h4>Quick Links</h4>
                <ul className="sx-lf-links">
                  {QUICK_LINKS.map((l) => (
                    <li key={l}>
                      <a href="#services">
                        <i className="fa-solid fa-angle-right text-[10px] opacity-50" aria-hidden="true" />
                        <span>{l}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Contact Info Column */}
              <div className="sx-lf-col-contact">
                <h4>Contact Info</h4>
                <div className="sx-lf-contact">
                  <p>
                    <span className="ic"><i className="fa-solid fa-location-dot" aria-hidden="true" /></span>
                    <span>
                      <strong>SyStos Technology</strong><br />
                      2nd Floor, Vaikunta Business Park,<br />
                      109 Vishal Nagar, Main Road, Indore (M.P) 452009
                    </span>
                  </p>
                  <a href="mailto:hr@systostechnology.com">
                    <span className="ic"><i className="fa-solid fa-envelope" aria-hidden="true" /></span>
                    <span>hr@systostechnology.com</span>
                  </a>
                  <a href="tel:+919893530547">
                    <span className="ic"><i className="fa-solid fa-phone" aria-hidden="true" /></span>
                    <span>+91 9893530547</span>
                  </a>
                  <a href="tel:07314280117">
                    <span className="ic"><i className="fa-solid fa-phone-volume" aria-hidden="true" /></span>
                    <span>0731-4280117 <small className="opacity-75 font-normal">(Office)</small></span>
                  </a>
                </div>
              </div>

              {/* Talent / Consultant Card Column */}
              <div className="sx-lf-col-card">
                <div className="sx-lf-card">
                  <div className="sx-lf-card-glow" aria-hidden="true" />
                  
                  <div className="sx-lf-card-header">
                    <div className="sx-lf-badge-online">
                      <span className="sx-lf-pulse-dot" />
                      <span>Available for Hire</span>
                    </div>
                    <span className="sx-lf-badge-rating">
                      <i className="fa-solid fa-star text-amber-400 text-[10px]" /> Top Rated
                    </span>
                  </div>

                  <div className="sx-lf-who">
                    <div className="sx-lf-av">
                      <span>AS</span>
                      <span className="sx-lf-av-status" />
                    </div>
                    <div className="sx-lf-who-text">
                      <div className="flex items-center gap-1.5">
                        <strong className="text-white text-base font-bold">Anuj Sakore</strong>
                        <i className="fa-solid fa-circle-check text-sky-400 text-xs" title="Verified Specialist" />
                      </div>
                      <span className="sx-lf-role">Lead Consultant &amp; Web Architect</span>
                    </div>
                  </div>

                  <div className="sx-lf-tags">
                    <span>SEO</span>
                    <span>GEO</span>
                    <span>AI-SEO</span>
                    <span>WordPress</span>
                    <span>PHP</span>
                  </div>

                  <div className="sx-lf-btns">
                    <a href="#contact" className="hire">
                      <i className="fa-solid fa-paper-plane text-[11px]" />
                      <span>Hire Me</span>
                    </a>
                    <a href="#" className="prof">
                      <i className="fa-solid fa-arrow-up-right-from-square text-[11px]" />
                      <span>Profile</span>
                    </a>
                  </div>

                  <div className="sx-lf-stats">
                    <div className="sx-lf-stat-box">
                      <b>278+</b>
                      <span>Reviews</span>
                    </div>
                    <div className="sx-lf-stat-sep" />
                    <div className="sx-lf-stat-box">
                      <b>304</b>
                      <span>Projects</span>
                    </div>
                    <div className="sx-lf-stat-sep" />
                    <div className="sx-lf-stat-box">
                      <b>$10</b>
                      <span>/ hour</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sx-lf-hr" />

            <div className="sx-lf-bot">
              <span>&copy; 2026 SyStos Technology. All Rights Reserved.</span>
              <nav aria-label="Footer navigation">
                {BOTTOM_LINKS.map((l) => (
                  <a key={l.label} href={l.href}>{l.label}</a>
                ))}
              </nav>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
