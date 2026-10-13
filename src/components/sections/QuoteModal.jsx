import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICE_OPTIONS } from "../../data/content.js";
import Button from "../ui/Button.jsx";

const FIELD = "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-systos-red focus:bg-white transition-colors";
const LABEL = "block font-semibold text-slate-700 text-xs mb-1";

export default function QuoteModal({ open, onClose }) {
  const [sent, setSent] = useState(false);
  const first = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    first.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer.current);
    };
  }, [open, onClose]);

  const submit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSent(true);
    timer.current = setTimeout(() => {
      onClose();
      setSent(false);
      form.reset();
    }, 2400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl max-w-lg w-full p-8 border border-slate-200 shadow-2xl relative text-slate-900 max-h-[92vh] overflow-y-auto"
          >
            <button type="button" onClick={onClose} aria-label="Close dialog" className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-2 text-lg">
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>

            <div className="mb-6">
              <span className="badge-eyebrow text-systos-red">Start a project</span>
              <h3 id="quote-title" className="section-subheading !text-2xl mt-1">Talk to Our Experts</h3>
              <p className="mt-1">
                Tell us about your project parameters. Our Indore engineering team will respond within 24 hours.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label htmlFor="q-name" className={LABEL}>Your Full Name</label>
                <input ref={first} id="q-name" name="name" type="text" required autoComplete="name" className={FIELD} placeholder="e.g. John Doe" />
              </div>
              <div>
                <label htmlFor="q-email" className={LABEL}>Business Email Address</label>
                <input id="q-email" name="email" type="email" required autoComplete="email" className={FIELD} placeholder="john@enterprise.com" />
              </div>
              <div>
                <label htmlFor="q-service" className={LABEL}>Service Required</label>
                <select id="q-service" name="service" className={FIELD}>
                  {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="q-scope" className={LABEL}>Project Scope / Requirements</label>
                <textarea id="q-scope" name="scope" rows={3} required className={FIELD} placeholder="Describe your project requirements and goals..." />
              </div>
              <Button type="submit" onClick={undefined} size="sm" className="w-full !py-3.5">Submit Request</Button>
            </form>

            <AnimatePresence>
              {sent && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-emerald-600 font-bold mt-4 text-xs p-3 rounded-xl bg-emerald-50 border border-emerald-200"
                >
                  <i className="fa-solid fa-circle-check" aria-hidden="true" /> Thank you! Your request has been sent successfully.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
