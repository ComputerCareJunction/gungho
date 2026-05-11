import { Lightbulb, Palette, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import en from '../locales/en.json';
import carlsberg1 from '../assets/images/carlsberg-1.jpg';
import carlsberg2 from '../assets/images/carlsberg-2.jpg';
import carlsberg3 from '../assets/images/carlsberg-3.jpg';

const ta = en.marketingServicesPage.sections.tradeActivation;
const cs = ta.carlsberg.caseStudy;
const carlsbergImages = [carlsberg1, carlsberg2, carlsberg3] as const;

const featureIcons: LucideIcon[] = [Lightbulb, Palette, Zap];

export default function CarlsbergTradeCaseStudy() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl ring-1 ring-white/5"
      aria-labelledby="carlsberg-trade-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(249,115,22,0.12),transparent_55%),linear-gradient(180deg,#0a1628_0%,#0f172a_38%,#111827_100%)]"
        aria-hidden
      />
      <div className="relative px-5 py-12 sm:px-8 sm:py-14 md:px-10 md:py-16">
        <header className="mx-auto w-full text-center">
          <h2
            id="carlsberg-trade-heading"
            className="text-balance text-2xl font-bold uppercase leading-tight tracking-[0.08em] text-primary sm:text-3xl md:text-4xl lg:text-[2.35rem] lg:tracking-[0.1em]"
          >
            {ta.carlsberg.bannerTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-pretty text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-base md:text-lg">
            {cs.heroIntro}
          </p>

          <div className="mx-auto mt-8 max-w-3xl space-y-6 text-left sm:mt-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
                {ta.carlsberg.clientBriefHeading}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">{ta.carlsberg.clientBrief}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
                {ta.carlsberg.solutionHeading}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">{ta.carlsberg.solution}</p>
            </div>
          </div>
        </header>

        <ul
          className="mx-auto mt-10 grid w-full list-none grid-cols-1 gap-5 p-0 sm:mt-12 sm:grid-cols-3 sm:gap-6 md:mt-14"
          aria-label={ta.carlsberg.galleryAriaLabel}
        >
          {carlsbergImages.map((src, i) => (
            <li key={src} className="min-w-0">
              <div className="group/img relative overflow-hidden rounded-2xl bg-slate-950/40 shadow-lg ring-1 ring-white/5 transition-shadow duration-300 hover:shadow-primary/15">
                <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                  <img
                    src={src}
                    alt={ta.carlsberg.imageAlts[i] ?? ''}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full origin-center object-cover transition duration-500 ease-out group-hover/img:scale-[1.06]"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-10 grid w-full grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6 md:mt-14">
          {cs.featureCards.map((card, index) => {
            const Icon = featureIcons[index] ?? Lightbulb;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm transition-colors duration-300 hover:border-primary/25 hover:bg-slate-800/70"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary ring-1 ring-primary/30">
                  <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-[15px]">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
