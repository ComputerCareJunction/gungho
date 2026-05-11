import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import en from '../locales/en.json';
import { clienteleByColumnId, type ClienteleEntry } from '../data/clientele';

/** Time between auto-advance steps (smooth scroll needs time to finish before the next tick). */
const AUTO_ADVANCE_MS = 5200;

function faviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
}

/** ID-1 card proportions (width / height) */
const CARD_ASPECT = '85.6 / 53.98' as const;

function ClientCreditCard({ entry, isActive }: { entry: ClienteleEntry; isActive: boolean }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = entry.logo ?? faviconUrl(entry.domain);

  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative isolate mx-auto block w-full max-w-[min(22rem,calc(100%-0.5rem))] overflow-hidden rounded-[14px] border border-primary/25 bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_70%,var(--color-primary)_70%,var(--color-primary)_100%)] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.55),inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-primary/15 transition-[transform,box-shadow,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_28px_56px_-14px_rgba(0,0,0,0.5),0_0_48px_-14px_color-mix(in_oklab,var(--color-primary)_22%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none sm:max-w-[24rem] sm:rounded-2xl md:max-w-[26rem] ${
        isActive
          ? 'translate-y-0 scale-100 opacity-100 saturate-100'
          : 'translate-y-0.5 scale-[0.97] opacity-[0.82] saturate-[0.88] hover:opacity-95'
      }`}
      style={{ aspectRatio: CARD_ASPECT }}
      aria-label={`${entry.name} — opens partner site in a new tab`}
    >
      <div className="pointer-events-none absolute left-1/2 top-[38%] z-[2] flex w-[88%] max-w-[16.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:top-[37%] sm:max-w-[18rem]">
        {!imgError ? (
          <img
            src={imgSrc}
            alt=""
            width={140}
            height={56}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="max-h-[34%] w-auto max-w-[88%] object-contain drop-shadow-sm transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none sm:max-h-[36%]"
            onError={() => setImgError(true)}
          />
        ) : (
          <svg
            className="h-14 w-14 text-primary/45 sm:h-16 sm:w-16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex justify-center px-3 pb-3.5 pt-2 text-center sm:px-4 sm:pb-4 sm:pt-2.5">
        <p className="line-clamp-2 max-w-[95%] text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.1em] text-primary-foreground sm:text-xs">
          {entry.name}
        </p>
      </div>
    </a>
  );
}

export default function HomeClientele() {
  const c = en.home.clients;
  const clients = useMemo(
    () => en.home.clients.columns.flatMap((col) => clienteleByColumnId[col.id] ?? []),
    []
  );

  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const tabHiddenRef = useRef(typeof document !== 'undefined' && document.visibilityState === 'hidden');
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, startScroll: 0, moved: 0 });
  const suppressLinkClickRef = useRef(false);

  activeRef.current = active;

  /** Centers a slide in the scroller using native smooth scrolling (works cleanly with flex + gap). */
  const scrollToIndex = useCallback(
    (index: number) => {
      const n = clients.length;
      if (n === 0) return;
      const i = ((index % n) + n) % n;
      const root = scrollerRef.current;
      const slide = slideRefs.current[i];
      if (!root || !slide) return;

      const rootRect = root.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const rootCenter = rootRect.left + rootRect.width / 2;
      const delta = slideCenter - rootCenter;
      const maxScroll = Math.max(0, root.scrollWidth - root.clientWidth);
      const nextLeft = Math.max(0, Math.min(maxScroll, root.scrollLeft + delta));

      root.scrollTo({ left: nextLeft, behavior: 'smooth' });
    },
    [clients.length]
  );

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || clients.length === 0) return;

    const slides = slideRefs.current.slice(0, clients.length).filter((el): el is HTMLDivElement => el != null);
    if (slides.length !== clients.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = -1;
        let bestRatio = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = slides.indexOf(e.target as HTMLDivElement);
          if (idx < 0) continue;
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            bestIdx = idx;
          }
        }
        if (bestIdx >= 0 && bestRatio >= 0.38) setActive(bestIdx);
      },
      { root, rootMargin: '0px', threshold: [0.35, 0.5, 0.65, 0.8] }
    );

    for (const s of slides) observer.observe(s);
    return () => observer.disconnect();
  }, [clients.length]);

  useEffect(() => {
    if (clients.length <= 1) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    const onVisibility = () => {
      tabHiddenRef.current = document.visibilityState === 'hidden';
    };
    document.addEventListener('visibilitychange', onVisibility);

    const id = window.setInterval(() => {
      if (tabHiddenRef.current || dragRef.current.active) return;
      const next = (activeRef.current + 1) % clients.length;
      scrollToIndex(next);
    }, AUTO_ADVANCE_MS);

    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [clients.length, scrollToIndex]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWinMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d.active || e.pointerId !== d.pointerId) return;
      el.scrollLeft = d.startScroll - (e.clientX - d.startX);
      d.moved = Math.max(d.moved, Math.abs(e.clientX - d.startX));
    };

    const onWinUp = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d.active || e.pointerId !== d.pointerId) return;
      d.active = false;
      el.classList.remove('cursor-grabbing');
      window.removeEventListener('pointermove', onWinMove);
      window.removeEventListener('pointerup', onWinUp);
      window.removeEventListener('pointercancel', onWinUp);
      if (d.moved > 8) {
        suppressLinkClickRef.current = true;
        window.setTimeout(() => {
          suppressLinkClickRef.current = false;
        }, 80);
      }
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragRef.current = {
        active: true,
        pointerId: e.pointerId,
        startX: e.clientX,
        startScroll: el.scrollLeft,
        moved: 0
      };
      el.classList.add('cursor-grabbing');
      window.addEventListener('pointermove', onWinMove);
      window.addEventListener('pointerup', onWinUp);
      window.addEventListener('pointercancel', onWinUp);
    };

    el.addEventListener('pointerdown', onDown);

    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onWinMove);
      window.removeEventListener('pointerup', onWinUp);
      window.removeEventListener('pointercancel', onWinUp);
      el.classList.remove('cursor-grabbing');
    };
  }, [clients.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onClickCapture = (e: MouseEvent) => {
      if (suppressLinkClickRef.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    el.addEventListener('click', onClickCapture, true);
    return () => el.removeEventListener('click', onClickCapture, true);
  }, [clients.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollToIndex(activeRef.current - 1);
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        scrollToIndex(activeRef.current + 1);
        e.preventDefault();
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [clients.length, scrollToIndex]);

  if (clients.length === 0) {
    return null;
  }

  return (
    <section
      className="relative border-t border-white/10 bg-transparent text-white"
      aria-labelledby="home-clientele-heading"
    >
      <div className="page-content-inset relative pb-16 pt-10 text-center sm:pb-20 sm:pt-12 md:pb-24 md:pt-14">
        <h2
          id="home-clientele-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          {c.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-400 sm:mt-4 sm:text-base">
          {c.subtitle}
        </p>

        <div className="relative mt-8 min-w-0 sm:mt-10 md:mt-12">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_16px_48px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/5 backdrop-blur-md [mask-image:linear-gradient(90deg,transparent_0%,black_5%,black_95%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_5%,black_95%,transparent_100%)]">
            <div
              ref={scrollerRef}
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label="Our clients. Drag sideways with the mouse or trackpad to scroll. Use dots or arrow keys to jump between partners."
              className="flex cursor-grab snap-x snap-mandatory scroll-pb-3 scroll-pt-3 scroll-smooth gap-6 overflow-x-auto overflow-y-visible px-5 py-6 [-ms-overflow-style:none] [scrollbar-width:none] outline-none selection:bg-primary/30 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:scroll-auto motion-reduce:cursor-default motion-reduce:snap-none sm:gap-8 sm:px-7 sm:py-8 [&::-webkit-scrollbar]:hidden"
            >
              {clients.map((entry, slideIndex) => (
                <div
                  key={`${entry.domain}-${entry.name}`}
                  ref={(el) => {
                    slideRefs.current[slideIndex] = el;
                  }}
                  className="w-[min(22rem,calc(100%-1rem))] shrink-0 snap-center snap-always scroll-mx-2 sm:w-[min(24rem,calc(100%-1.5rem))] md:w-[min(26rem,calc(100%-2rem))] sm:scroll-mx-4"
                  aria-roledescription="slide"
                  aria-label={`${entry.name}, slide ${slideIndex + 1} of ${clients.length}`}
                >
                  <ClientCreditCard entry={entry} isActive={slideIndex === active} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {clients.length > 1 ? (
          <div
            className="mt-8 flex max-h-24 flex-wrap items-center justify-center gap-1.5 overflow-y-auto px-2 sm:mt-10 sm:gap-2"
            role="tablist"
            aria-label="Slide indicators"
          >
            {clients.map((entry, i) => (
              <button
                key={`dot-${entry.domain}-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to ${entry.name}`}
                className={`h-2 shrink-0 rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                  i === active ? 'w-7 bg-sky-400 shadow-[0_0_14px_-2px_rgba(56,189,248,0.55)] sm:w-8' : 'w-2 bg-white/25 hover:bg-white/45 sm:w-2.5'
                }`}
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
