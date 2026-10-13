import ParticleBackground from "../scenes/ParticleBackground.jsx";
import Button from "../ui/Button.jsx";
import Eyebrow from "../ui/Eyebrow.jsx";
import Reveal from "../ui/Reveal.jsx";

export default function CTA({ onQuote }) {
  return (
    <section className="relative z-10 section-py overflow-hidden" aria-labelledby="cta-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="relative rounded-3xl overflow-hidden p-10 sm:p-16 border border-slate-200 shadow-xl text-center bg-gradient-to-r from-red-50 via-white to-blue-50 text-slate-900">
          <ParticleBackground />
          <div className="relative z-10 max-w-3xl mx-auto">
            <Eyebrow>Need any solution?</Eyebrow>
            <h2 id="cta-title" className="section-heading mt-4 mb-4">
              Let Us Convert Your Idea <br />
              <span className="gradient-text-red">Into Reality</span>
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Have an idea or a complex business challenge? Contact our expert engineering team in Indore today.
            </p>
            <Button onClick={onQuote} className="shadow-lg gap-3">
              <i className="fa-solid fa-paper-plane" aria-hidden="true" />
              <span>Let&apos;s Work Together</span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
