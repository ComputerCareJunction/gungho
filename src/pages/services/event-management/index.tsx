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
      <div className="min-h-screen bg-white">
        <div className="page-content-inset py-12">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold text-slate-900">{c.title}</h1>
            <p className="text-xl text-slate-600">{c.subtitle}</p>
          </div>

          <section className="mb-8">
            <button
              type="button"
              onClick={() => navigate('/event-management/exhibition-portfolio')}
              className="group w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left shadow-md ring-1 ring-slate-900/5 transition hover:border-primary/35 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 sm:p-8"
            >
              <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,14rem)] sm:gap-x-8 sm:gap-y-0 lg:gap-x-10">
                <div className="min-w-0 text-left sm:max-w-xl sm:justify-self-start">
                  <h2 className="text-2xl font-bold leading-tight text-slate-900">
                    {c.exhibitionPortfolio.cardTitle}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    Front Row Seat to the expert orchestration of{' '}
                    <span className="font-bold text-red-500">POWER OF ONE</span>
                  </p>
                </div>
                <div className="w-full max-w-md justify-self-center sm:max-w-none sm:justify-self-end">
                  <div className="relative h-32 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:h-36 sm:w-56">
                    <img
                      src={exhibitionPreview}
                      alt={c.exhibitionPortfolio.galleryItems[0]?.title ?? c.exhibitionPortfolio.eventTitle}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-black/10" aria-hidden />
                    <span className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-3 text-center text-sm font-bold tracking-wide text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] sm:text-base">
                      {c.exhibitionPortfolio.seeMoreLabel}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </section>

          <section className="relative mb-16 overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50/80 p-6 shadow-lg ring-1 ring-emerald-900/5 sm:p-8 lg:p-10">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-lime-200/30 blur-3xl"
              aria-hidden
            />

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div className="order-2 flex justify-center lg:order-1 lg:justify-end">
                <div className="relative w-full max-w-md rounded-2xl border border-emerald-200 bg-slate-50 p-6 shadow-inner ring-1 ring-slate-900/5 sm:p-8">
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
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">
                  {c.sustainabilityEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.25rem] lg:leading-tight">
                  {c.sustainabilityTitle}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg">
                  {c.sustainabilityParagraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mt-10 border-t border-emerald-200/80 pt-10 sm:mt-12 sm:pt-12">
              <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800 sm:text-sm">
                {c.serviceOfferingsHeading}
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                {offerings.map(({ icon: Icon, title }) => (
                  <li
                    key={title}
                    className="flex items-center gap-4 rounded-2xl border border-emerald-200/80 bg-emerald-50 px-4 py-4 backdrop-blur-sm transition hover:border-emerald-400/60 hover:bg-emerald-100"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-300/80 bg-emerald-100 text-emerald-800">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <span className="text-base font-semibold leading-snug text-slate-900 sm:text-lg">{title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-16 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-lg ring-1 ring-slate-900/5 backdrop-blur-sm">
            <figure className="relative bg-slate-50 px-2 pb-2 pt-3 sm:px-4 sm:pb-3 sm:pt-4">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-100/80 via-transparent to-transparent"
                aria-hidden
              />
              <div className="relative z-[1] overflow-hidden rounded-2xl border border-slate-200 shadow-inner ring-1 ring-slate-900/5">
                <EventManagementGlobalMap
                  ariaLabel={c.globalReachMapAria}
                  mapAttribution={c.globalReachMapAttribution}
                />
              </div>
              <figcaption className="sr-only">{c.globalReachImageAlt}</figcaption>
            </figure>
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-8 sm:px-10 sm:py-10">
              <p className="mx-auto max-w-4xl text-center text-base leading-relaxed text-slate-700 sm:text-lg">
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
