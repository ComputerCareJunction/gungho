import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import en from '../locales/en.json';
import { clienteleByColumnId, type ClienteleEntry } from '../data/clientele';

/** Horizontal playback speed (pixels per second), like a slow filmstrip. */
const PLAYBACK_PX_PER_SEC = 42;

function faviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
}

/** Fixed viewport so every logo (wordmark or icon) scales to the same slot. */
const LOGO_BOX =
  'flex h-[4.5rem] w-[7.25rem] shrink-0 items-center justify-center sm:h-[5.5rem] sm:w-[10.5rem] md:h-32 md:w-[13rem]';

function ClientLogoLink({ entry, isActive }: { entry: ClienteleEntry; isActive: boolean }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = entry.logo ?? faviconUrl(entry.domain);
  const hideName = Boolean(entry.logo && !imgError && entry.showNameWithLogo !== true);

  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group mx-auto flex w-full max-w-full rounded-lg px-1.5 py-1.5 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-3 sm:py-2 ${
        hideName
          ? 'min-h-[7.5rem] flex-col items-center justify-center gap-0 sm:min-h-[8.5rem]'
          : 'min-h-[7.5rem] flex-row items-center justify-center gap-3 sm:min-h-[8.5rem] sm:gap-4'
      } ${isActive ? 'opacity-100' : 'opacity-[0.88] hover:opacity-100'}`}
      aria-label={`${entry.name} — opens partner site in a new tab`}
    >
      <div className={LOGO_BOX}>
        {!imgError ? (
          <img
            src={imgSrc}
            alt=""
            width={200}
            height={80}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="max-h-[92%] max-w-[92%] object-contain object-center transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
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
      {!hideName ? (
        <p className="min-w-0 flex-1 self-center text-left text-sm font-semibold leading-snug text-slate-800 transition-colors group-hover:text-primary sm:text-base">
          {entry.name}
        </p>
      ) : null}
    </a>
  );
}

export default function HomeClientele() {
  const c = en.home.clients;
  const clients = useMemo(
    () => en.home.clients.columns.flatMap((col) => clienteleByColumnId[col.id] ?? []),
    []
  );

  const n = clients.length;
  const loopClients = useMemo(() => {
    if (n <= 1) return clients;
    return [...clients, ...clients];
  }, [clients, n]);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const loopWidthRef = useRef(0);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const carouselIndexRef = useRef(0);
  const tabHiddenRef = useRef(typeof document !== 'undefined' && document.visibilityState === 'hidden');
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, startScroll: 0, moved: 0 });
  const suppressLinkClickRef = useRef(false);
  const hoverPauseRef = useRef(false);

  activeRef.current = active;

  const remeasureLoop = useCallback(() => {
    const root = scrollerRef.current;
    if (!root || n === 0) return;
    if (n <= 1) {
      loopWidthRef.current = 0;
      return;
    }
    loopWidthRef.current = Math.max(1, root.scrollWidth / 2);
  }, [n]);

  useLayoutEffect(() => {
    remeasureLoop();
    const root = scrollerRef.current;
    if (!root) return;
    const ro = new ResizeObserver(() => remeasureLoop());
    ro.observe(root);
    return () => ro.disconnect();
  }, [n, loopClients.length, remeasureLoop]);

  /** Jump to a slide in the first copy (instant scroll so it does not fight playback rAF). */
  const scrollToIndex = useCallback(
    (index: number) => {
      if (n === 0) return;
      const i = ((index % n) + n) % n;
      const root = scrollerRef.current;
      const slide = slideRefs.current[i];
      if (!root || !slide) return;

      carouselIndexRef.current = i;
      setActive(i);

      const rootRect = root.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const rootCenter = rootRect.left + rootRect.width / 2;
      const delta = slideCenter - rootCenter;
      const maxScroll = Math.max(0, root.scrollWidth - root.clientWidth);
      const nextLeft = Math.max(0, Math.min(maxScroll, root.scrollLeft + delta));

      root.scrollTo({ left: nextLeft, behavior: 'auto' });
    },
    [n]
  );

  useEffect(() => {
    if (n === 0) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let raf = 0;
    let attempts = 0;

    const trySetup = () => {
      if (cancelled) return;
      attempts += 1;
      const root = scrollerRef.current;
      if (!root) {
        if (attempts < 40) raf = requestAnimationFrame(trySetup);
        return;
      }
      const slides = slideRefs.current.slice(0, n).filter((el): el is HTMLDivElement => el != null);
      if (slides.length !== n) {
        if (attempts < 40) raf = requestAnimationFrame(trySetup);
        return;
      }

      observer = new IntersectionObserver(
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
          if (bestIdx >= 0 && bestRatio >= 0.2) {
            carouselIndexRef.current = bestIdx;
            setActive(bestIdx);
          }
        },
        { root, rootMargin: '0px', threshold: [0.2, 0.35, 0.5, 0.65, 0.8] }
      );

      for (const s of slides) observer.observe(s);
    };

    raf = requestAnimationFrame(trySetup);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [n]);

  useEffect(() => {
    if (n <= 1) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    let cancelled = false;
    let rafId = 0;
    let lastTs = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const root = scrollerRef.current;
      const loopW = loopWidthRef.current;
      if (!root || loopW <= 1) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (tabHiddenRef.current || dragRef.current.active || hoverPauseRef.current) {
        lastTs = now;
        rafId = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(48, now - lastTs) / 1000;
      lastTs = now;

      root.scrollLeft += PLAYBACK_PX_PER_SEC * dt;
      if (root.scrollLeft >= loopW - 1) {
        root.scrollLeft -= loopW;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onVisibility = () => {
      tabHiddenRef.current = document.visibilityState === 'hidden';
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [n]);

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
  }, [n, loopClients.length]);

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
  }, [n, loopClients.length]);

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
  }, [n, scrollToIndex, loopClients.length]);

  if (n === 0) {
    return null;
  }

  return (
    <section
      className="relative border-t border-slate-200 bg-white text-slate-900"
      aria-labelledby="home-clientele-heading"
    >
      <div className="page-content-inset relative pb-16 pt-10 text-center sm:pb-20 sm:pt-12 md:pb-24 md:pt-14 lg:pb-32">
        <h2
          id="home-clientele-heading"
          className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
        >
          {c.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
          {c.subtitle}
        </p>

        <div className="relative mt-8 min-w-0 sm:mt-10 md:mt-12">
          <div
            ref={scrollerRef}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Our clients. The list scrolls horizontally like a filmstrip. Drag to scrub, or use dots and arrow keys to jump."
            onPointerEnter={() => {
              if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                hoverPauseRef.current = true;
              }
            }}
            onPointerLeave={() => {
              if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                hoverPauseRef.current = false;
              }
            }}
            className="flex max-md:snap-none cursor-grab items-stretch scroll-pb-3 scroll-pt-3 gap-1 overflow-x-auto overflow-y-visible px-0.5 py-3 [-ms-overflow-style:none] [scrollbar-width:none] outline-none selection:bg-primary/30 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:cursor-default motion-reduce:snap-none md:snap-x md:snap-mandatory sm:gap-3 sm:px-1.5 sm:py-5 md:gap-4 md:px-2 md:py-6 [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(90deg,transparent_0%,black_5%,black_95%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_5%,black_95%,transparent_100%)]"
          >
              {loopClients.map((entry, slideIndex) => {
                const logicalIndex = slideIndex % n;
                return (
                  <div
                    key={`${entry.domain}-${entry.name}-${slideIndex}`}
                    ref={(el) => {
                      slideRefs.current[slideIndex] = el;
                    }}
                    className="flex w-[min(13.5rem,calc(100vw-1.25rem))] shrink-0 scroll-mx-0.5 self-stretch items-center justify-center sm:w-[min(20rem,calc(100%-0.75rem))] sm:scroll-mx-2 md:snap-center"
                    aria-roledescription="slide"
                    aria-label={`${entry.name}, slide ${logicalIndex + 1} of ${n}`}
                  >
                    <ClientLogoLink entry={entry} isActive={logicalIndex === active} />
                  </div>
                );
              })}
          </div>
        </div>

        {n > 1 ? (
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
                className={`h-2 shrink-0 rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  i === active ? 'w-7 bg-sky-500 shadow-[0_0_14px_-2px_rgba(14,165,233,0.45)] sm:w-8' : 'w-2 bg-slate-300 hover:bg-slate-400 sm:w-2.5'
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
