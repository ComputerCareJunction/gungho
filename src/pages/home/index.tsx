import { useMemo, useRef, useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, TrendingUp } from 'lucide-react';
import en from '../../locales/en.json';
import Seo from '../../components/Seo';
import HomeClientele from '../../components/HomeClientele';
import HomeAnimatedStats from '../../components/HomeAnimatedStats';

const heroGlassCardClassName = [
  'group relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-white/55',
  'bg-gradient-to-br from-white/45 via-white/25 to-white/[0.18]',
  'p-6 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.75),inset_0_-1px_0_0_rgba(15,23,42,0.04),0_14px_44px_-16px_rgba(15,23,42,0.18)]',
  'ring-1 ring-white/35 ring-inset backdrop-blur-2xl backdrop-saturate-150',
  'cursor-pointer will-change-transform',
  'transition-[transform,opacity,box-shadow,border-color,filter,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50',
  'motion-reduce:transition-opacity motion-reduce:duration-200 sm:p-7 lg:p-8',
].join(' ');

const heroGlassIconWrapClassName = [
  'relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl',
  'border border-white/55 bg-white/30 text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.65)]',
  'ring-1 ring-white/30 backdrop-blur-md backdrop-saturate-125',
  'transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
  'motion-reduce:transition-none',
].join(' ');

const heroGlassCtaClassName = [
  'relative mt-8 inline-flex items-center gap-2 self-start rounded-full',
  'border border-white/50 bg-white/25 px-4 py-2 text-sm font-semibold text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)]',
  'backdrop-blur-md backdrop-saturate-125',
  'transition-[background-color,border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
  'motion-reduce:transition-colors motion-reduce:duration-200',
].join(' ');

type HeroHoveredCard = 'event' | 'marketing' | null;

export default function HomePage() {
  const navigate = useNavigate();
  const heroCardsRef = useRef<HTMLDivElement>(null);
  const [heroHovered, setHeroHovered] = useState<HeroHoveredCard>(null);

  const handleHeroCardLeave = (e: MouseEvent) => {
    const next = e.relatedTarget as Node | null;
    if (heroCardsRef.current && next && heroCardsRef.current.contains(next)) return;
    setHeroHovered(null);
  };

  const stats = useMemo(
    () => [
      { number: en.aboutPage.stats.eventsManagedValue, label: en.aboutPage.stats.eventsManaged },
      { number: en.aboutPage.stats.happyClientsValue, label: en.aboutPage.stats.happyClients },
      { number: en.aboutPage.stats.yearsExperienceValue, label: en.aboutPage.stats.yearsExperience },
      { number: en.aboutPage.stats.teamMembersValue, label: en.aboutPage.stats.teamMembers }
    ],
    []
  );

  return (
    <>
      <Seo
        title={en.seo.homeTitle}
        description={en.seo.homeDescription}
        path="/"
      />
      {/* Full-viewport atmosphere: paints behind sticky navbar (nav has higher z-index). */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-slate-50 via-white to-white"
        aria-hidden
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-0 h-[min(28rem,55vh)] w-[22rem] rounded-full bg-gradient-to-br from-primary/28 via-primary/12 to-transparent blur-3xl sm:h-[32rem] sm:w-[28rem]" />
          <div className="absolute -bottom-44 -right-32 h-[26rem] w-[26rem] rounded-full bg-gradient-to-tl from-amber-100/80 via-orange-50/40 to-transparent blur-3xl sm:h-[32rem] sm:w-[32rem]" />
          <div className="absolute inset-x-0 top-0 h-[min(85vh,48rem)] bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,rgba(249,115,22,0.11),transparent_58%)]" />
          <div
            className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:72px_72px]"
            aria-hidden
          />
          <div
            className="animate-float absolute left-[8%] top-[min(22%,12rem)] hidden h-16 w-16 rotate-12 rounded-2xl border border-primary/15 bg-white/40 shadow-sm sm:block"
            aria-hidden
          />
          <div
            className="animate-float-delayed absolute bottom-[18%] right-[10%] hidden h-14 w-14 rounded-full border border-primary/15 bg-white/40 shadow-sm md:block"
            aria-hidden
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col">
        <section
          aria-labelledby="home-hero-heading"
          className="page-content-inset pb-14 pt-8 max-md:pt-6 sm:pb-16 sm:pt-10 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32"
        >
            <h1 id="home-hero-heading" className="sr-only">
              {en.home.leftCardTitle} · {en.home.rightCardTitle}
            </h1>
            <div
              ref={heroCardsRef}
              className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8"
            >
              <button
                type="button"
                onClick={() => navigate('/event-management')}
                onMouseEnter={() => setHeroHovered('event')}
                onMouseLeave={handleHeroCardLeave}
                className={[
                  heroGlassCardClassName,
                  heroHovered === 'event'
                    ? 'z-10 scale-[1.03] -translate-y-2 border-white/90 from-white/60 via-white/38 to-white/[0.28] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),inset_0_-1px_0_0_rgba(15,23,42,0.05),0_28px_70px_-22px_rgba(249,115,22,0.35)] ring-2 ring-primary/35 motion-reduce:translate-y-0 motion-reduce:scale-100'
                    : '',
                  heroHovered === 'marketing'
                    ? 'opacity-[0.52] saturate-[0.82] scale-[0.96] translate-y-0.5 motion-reduce:scale-100 motion-reduce:translate-y-0'
                    : '',
                ].join(' ')}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/55 via-transparent to-transparent opacity-70"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                  aria-hidden
                />
                <span
                  className={[
                    'pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.18] via-transparent to-primary/[0.06] transition-opacity duration-500 ease-out motion-reduce:transition-none',
                    heroHovered === 'event' ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                  aria-hidden
                />
                <span
                  className={[
                    heroGlassIconWrapClassName,
                    heroHovered === 'event'
                      ? 'scale-110 -rotate-3 border-white/75 bg-white/45 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85),0_10px_28px_-10px_rgba(249,115,22,0.35)] motion-reduce:scale-100 motion-reduce:rotate-0'
                      : '',
                    heroHovered === 'marketing' ? 'scale-95 opacity-80 motion-reduce:scale-100' : '',
                  ].join(' ')}
                >
                  <CalendarDays className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="relative text-balance text-lg font-bold uppercase leading-snug tracking-[0.04em] text-slate-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.45)] sm:text-xl lg:text-[1.35rem] lg:leading-snug">
                  {en.home.leftCardTitle}
                </h2>
                <span
                  className={[
                    heroGlassCtaClassName,
                    heroHovered === 'event'
                      ? 'border-white/80 bg-white/45 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.82),0_8px_26px_-10px_rgba(249,115,22,0.28)]'
                      : '',
                    heroHovered === 'marketing' ? 'opacity-75' : '',
                  ].join(' ')}
                >
                  <span>{en.home.exploreServices}</span>
                  <ArrowRight
                    className={[
                      'h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                      heroHovered === 'event' ? 'translate-x-1.5' : '',
                    ].join(' ')}
                    aria-hidden
                  />
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/marketing-services')}
                onMouseEnter={() => setHeroHovered('marketing')}
                onMouseLeave={handleHeroCardLeave}
                className={[
                  heroGlassCardClassName,
                  heroHovered === 'marketing'
                    ? 'z-10 scale-[1.03] -translate-y-2 border-white/90 from-white/60 via-white/38 to-white/[0.28] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.92),inset_0_-1px_0_0_rgba(15,23,42,0.05),0_28px_70px_-22px_rgba(249,115,22,0.35)] ring-2 ring-primary/35 motion-reduce:translate-y-0 motion-reduce:scale-100'
                    : '',
                  heroHovered === 'event'
                    ? 'opacity-[0.52] saturate-[0.82] scale-[0.96] translate-y-0.5 motion-reduce:scale-100 motion-reduce:translate-y-0'
                    : '',
                ].join(' ')}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/55 via-transparent to-transparent opacity-70"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
                  aria-hidden
                />
                <span
                  className={[
                    'pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.18] via-transparent to-primary/[0.06] transition-opacity duration-500 ease-out motion-reduce:transition-none',
                    heroHovered === 'marketing' ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                  aria-hidden
                />
                <span
                  className={[
                    heroGlassIconWrapClassName,
                    heroHovered === 'marketing'
                      ? 'scale-110 rotate-3 border-white/75 bg-white/45 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85),0_10px_28px_-10px_rgba(249,115,22,0.35)] motion-reduce:scale-100 motion-reduce:rotate-0'
                      : '',
                    heroHovered === 'event' ? 'scale-95 opacity-80 motion-reduce:scale-100' : '',
                  ].join(' ')}
                >
                  <TrendingUp className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                </span>
                <h2 className="relative text-balance text-lg font-bold uppercase leading-snug tracking-[0.04em] text-slate-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.45)] sm:text-xl lg:text-[1.35rem] lg:leading-snug">
                  {en.home.rightCardTitle}
                </h2>
                <span
                  className={[
                    heroGlassCtaClassName,
                    heroHovered === 'marketing'
                      ? 'border-white/80 bg-white/45 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.82),0_8px_26px_-10px_rgba(249,115,22,0.28)]'
                      : '',
                    heroHovered === 'event' ? 'opacity-75' : '',
                  ].join(' ')}
                >
                  <span>{en.home.exploreServices}</span>
                  <ArrowRight
                    className={[
                      'h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                      heroHovered === 'marketing' ? 'translate-x-1.5' : '',
                    ].join(' ')}
                    aria-hidden
                  />
                </span>
              </button>
            </div>
        </section>

        <div className="border-t border-slate-200/80 bg-white/60 backdrop-blur-sm">
          <HomeAnimatedStats
            items={stats}
            className="page-content-inset py-12 sm:py-14 md:py-16"
          />
        </div>

        <HomeClientele />
      </div>
    </>
  );
}
