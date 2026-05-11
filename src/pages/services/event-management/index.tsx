import { useNavigate } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { Briefcase, PartyPopper, Rocket, Users } from 'lucide-react';
import en from '../../../locales/en.json';
import Seo from '../../../components/Seo';
import EventManagementGlobalMap from '../../../components/EventManagementGlobalMap';
import sustainabilityIllustration from '../../../assets/images/sustainability-globe-hands.png';
import exhibitionPreview from '../../../assets/images/exhibition-portfolio/kings-birthday-night-stage.png';

export default function EventManagement() {
  const navigate = useNavigate();
  const c = en.eventManagementPage;
  const svc = c.services;

  const offerings: { icon: LucideIcon; title: string }[] = [
    { icon: Briefcase, title: svc.corporateEventsTitle },
    { icon: Users, title: svc.teamBuildingTitle },
    { icon: PartyPopper, title: svc.socialEventsTitle },
    { icon: Rocket, title: svc.productLaunchesTitle }
  ];

  return (
    <>
      <Seo title={en.seo.eventManagementTitle} description={en.seo.eventManagementDescription} path="/event-management" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="page-content-inset py-12">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold text-white">{c.title}</h1>
            <p className="text-xl text-white/70">{c.subtitle}</p>
          </div>

          <section className="mb-8">
            <button
              type="button"
              onClick={() => navigate('/event-management/exhibition-portfolio')}
              className="group w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-slate-800/90 to-slate-900/90 p-6 text-left shadow-lg ring-1 ring-white/5 transition hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:p-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <div className="min-w-0">
                  <h2 className="text-2xl font-bold text-white">{c.exhibitionPortfolio.cardTitle}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                    Front Row Seat to the expert orchestration of{' '}
                    <span className="font-bold text-red-500">POWER OF ONE</span>
                  </p>
                </div>
                <div className="relative h-32 w-full overflow-hidden rounded-xl border border-white/20 bg-slate-950 sm:h-36 sm:w-56">
                  <img
                    src={exhibitionPreview}
                    alt={c.exhibitionPortfolio.eventTitle}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-black/20" aria-hidden />
                  <span className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-3 text-center text-sm font-bold tracking-wide text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] sm:text-base">
                    See more+
                  </span>
                </div>
              </div>
            </button>
          </section>

          <section className="relative mb-16 overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/55 via-slate-900/95 to-slate-950 p-6 shadow-2xl shadow-black/35 ring-1 ring-emerald-400/20 sm:p-8 lg:p-10">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl"
              aria-hidden
            />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div className="order-2 flex justify-center lg:order-1 lg:justify-end">
                <div className="relative w-full max-w-md rounded-2xl border border-emerald-500/35 bg-black p-6 shadow-inner ring-1 ring-white/10 sm:p-8">
                  <img
                    src={sustainabilityIllustration}
                    alt={c.sustainabilityImageAlt}
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="mx-auto max-h-[min(22rem,52vh)] w-full object-contain object-center sm:max-h-[26rem]"
                  />
                </div>
              </div>

              <div className="order-1 min-w-0 lg:order-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/95">
                  {c.sustainabilityEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.25rem] lg:leading-tight">
                  {c.sustainabilityTitle}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-white/85 sm:text-lg">
                  {c.sustainabilityParagraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mt-10 border-t border-emerald-500/20 pt-10 sm:mt-12 sm:pt-12">
              <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300/90 sm:text-sm">
                {c.serviceOfferingsHeading}
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                {offerings.map(({ icon: Icon, title }) => (
                  <li
                    key={title}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-emerald-950/25 px-4 py-4 backdrop-blur-sm transition hover:border-emerald-400/35 hover:bg-emerald-950/40"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-500/15 text-emerald-200">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="text-base font-semibold leading-snug text-white sm:text-lg">{title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 shadow-2xl shadow-black/30 ring-1 ring-white/5 backdrop-blur-sm">
            <figure className="relative bg-slate-950 px-2 pb-2 pt-3 sm:px-4 sm:pb-3 sm:pt-4">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/25"
                aria-hidden
              />
              <div className="relative z-[1] overflow-hidden rounded-2xl border border-white/10 shadow-inner ring-1 ring-black/40">
                <EventManagementGlobalMap
                  ariaLabel={c.globalReachMapAria}
                  mapAttribution={c.globalReachMapAttribution}
                />
              </div>
              <figcaption className="sr-only">{c.globalReachImageAlt}</figcaption>
            </figure>
            <div className="border-t border-white/10 bg-gradient-to-b from-slate-950/90 to-slate-950 px-6 py-8 sm:px-10 sm:py-10">
              <p className="mx-auto max-w-4xl text-center text-base leading-relaxed text-white/85 sm:text-lg">
                {c.globalReachBody}
              </p>
            </div>
          </section>

          <div className="relative z-20 isolate mt-16 rounded-2xl bg-primary p-8 text-center shadow-lg ring-1 ring-white/15">
            <h2 className="mb-4 text-3xl font-bold text-white">{c.ctaTitle}</h2>
            <p className="mb-6 text-white/90">{c.ctaSubtitle}</p>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="relative z-10 inline-flex min-h-[3rem] min-w-[11rem] items-center justify-center rounded-lg bg-white px-8 py-3 font-semibold text-primary shadow-md ring-2 ring-primary/25 transition hover:bg-slate-100 hover:text-primary hover:shadow-lg hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary active:scale-[0.98]"
            >
              {c.ctaButton}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
