import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import en from '../locales/en.json';
import { clienteleByColumnId, type ClienteleEntry } from '../data/clientele';

/** Pixels per frame (~60fps). Must avoid CSS scroll-smooth on this container or RAF updates fight the browser. */
const AUTO_SCROLL_PX_PER_FRAME = 1.25;
/** Pause auto-scroll after manual arrow use so smooth scroll can finish */
const PAUSE_AFTER_ARROW_MS = 2800;

function faviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
}

function ClientLogoCard({ entry }: { entry: ClienteleEntry }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = entry.logo ?? faviconUrl(entry.domain);

  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative isolate flex w-[13.5rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-800 to-slate-900/95 p-5 shadow-lg outline-none ring-offset-2 ring-offset-slate-900 transition-[box-shadow,border-color] duration-300 ease-out hover:border-white/30 hover:from-slate-700 hover:to-slate-800 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.14),0_0_40px_-8px_rgba(249,115,22,0.2)] focus-visible:ring-2 focus-visible:ring-white/40 sm:w-60 md:w-64"
      aria-label={`${entry.name}, opens in a new tab`}
    >
      <div className="relative z-[1] grid h-32 grid-cols-1 grid-rows-1 overflow-hidden rounded-xl bg-white p-2 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06)] ring-1 ring-slate-200/80 transition-[box-shadow,ring-color] duration-300 group-hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.05),0_6px_24px_-4px_rgba(0,0,0,0.18)] group-hover:ring-white/50 sm:h-36 sm:p-2.5">
        {!imgError ? (
          <img
            src={imgSrc}
            alt=""
            width={160}
            height={160}
            loading="lazy"
            decoding="async"
            className="col-start-1 row-start-1 h-full w-full min-h-0 min-w-0 object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="col-start-1 row-start-1 select-none self-center justify-self-center text-base font-bold uppercase tracking-wide text-slate-500">
            {entry.name
              .split(/\s+/)
              .slice(0, 2)
              .map((w) => w[0])
              .join('')}
          </span>
        )}
      </div>
      <p className="relative z-[1] mt-4 line-clamp-2 min-h-[3rem] text-center text-base font-semibold leading-snug text-white sm:text-lg">
        {entry.name}
      </p>
    </a>
  );
}

export default function HomeClientele() {
  const c = en.home.clients;
  const allClients = c.columns.flatMap((col) => clienteleByColumnId[col.id] ?? []);
  const loopClients = [...allClients, ...allClients];

  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const hoverPausedRef = useRef(false);
  const pauseAutoUntilRef = useRef(0);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = Math.max(0, scrollWidth - clientWidth);
    const epsilon = 2;
    setCanScrollPrev(scrollLeft > epsilon);
    setCanScrollNext(scrollLeft < max - epsilon);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollEdges();
    el.addEventListener('scroll', updateScrollEdges, { passive: true });
    window.addEventListener('resize', updateScrollEdges);

    const ro = new ResizeObserver(() => updateScrollEdges());
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', updateScrollEdges);
      window.removeEventListener('resize', updateScrollEdges);
      ro.disconnect();
    };
  }, [allClients.length, updateScrollEdges]);

  useEffect(() => {
    if (allClients.length === 0) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      const el = scrollerRef.current;
      if (el) {
        const pausedByInteraction = hoverPausedRef.current;
        const pausedByArrow = Date.now() < pauseAutoUntilRef.current;
        if (!pausedByInteraction && !pausedByArrow) {
          el.scrollLeft += AUTO_SCROLL_PX_PER_FRAME;
          const half = el.scrollWidth / 2;
          if (half > 0 && el.scrollLeft >= half - 1) {
            el.scrollLeft -= half;
          }
        }
      }
      if (!cancelled) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const startId = requestAnimationFrame(() => {
      if (cancelled) return;
      rafRef.current = requestAnimationFrame(tick);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(startId);
      cancelAnimationFrame(rafRef.current);
    };
  }, [allClients.length]);

  const getScrollStep = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 300;
    const first = el.querySelector('a');
    if (first instanceof HTMLElement) {
      const styles = window.getComputedStyle(el);
      const gapParsed = parseFloat(styles.gap || '0');
      const gap = Number.isFinite(gapParsed) && gapParsed > 0 ? gapParsed : 20;
      return Math.min(el.clientWidth * 0.75, first.offsetWidth + gap);
    }
    return Math.min(320, el.clientWidth * 0.75);
  }, []);

  const scrollPrev = () => {
    pauseAutoUntilRef.current = Date.now() + PAUSE_AFTER_ARROW_MS;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  };

  const scrollNext = () => {
    pauseAutoUntilRef.current = Date.now() + PAUSE_AFTER_ARROW_MS;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  };

  const arrowClass =
    'pointer-events-auto z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white shadow-lg backdrop-blur-md transition hover:border-primary hover:bg-slate-900/90 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-30';

  return (
    <section
      className="relative overflow-hidden border-t border-white/10 bg-transparent text-white"
      aria-labelledby="home-clientele-heading"
    >
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 text-center sm:px-8 sm:pb-32 sm:pt-28 md:pb-36 md:pt-32">
        <h2
          id="home-clientele-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          {c.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:mt-4 sm:text-base">
          {c.subtitle}
        </p>

        <div className="relative mt-16 sm:mt-24">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-950/80 via-slate-950/25 to-transparent sm:w-20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-950/80 via-slate-950/25 to-transparent sm:w-20"
            aria-hidden
          />

          <button
            type="button"
            className={`${arrowClass} absolute left-1 top-1/2 -translate-y-1/2 sm:left-2`}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Scroll clients backward"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden />
          </button>
          <button
            type="button"
            className={`${arrowClass} absolute right-1 top-1/2 -translate-y-1/2 sm:right-2`}
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Scroll clients forward"
          >
            <ChevronRight className="h-6 w-6" aria-hidden />
          </button>

          <div
            ref={scrollerRef}
            role="region"
            aria-label="Client logos. Auto-scrolls horizontally; pauses while the pointer is over the cards, while dragging, when a card is focused, or briefly after using the arrows."
            className="flex justify-start gap-5 overflow-x-auto overflow-y-visible scroll-auto px-14 py-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-7 sm:px-16 [&::-webkit-scrollbar]:hidden"
            onMouseEnter={() => {
              hoverPausedRef.current = true;
            }}
            onMouseLeave={() => {
              hoverPausedRef.current = false;
            }}
            onPointerDown={() => {
              hoverPausedRef.current = true;
            }}
            onPointerUp={() => {
              hoverPausedRef.current = false;
            }}
            onPointerCancel={() => {
              hoverPausedRef.current = false;
            }}
            onFocusCapture={() => {
              hoverPausedRef.current = true;
            }}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                hoverPausedRef.current = false;
              }
            }}
          >
            {loopClients.map((entry, index) => (
              <ClientLogoCard
                key={`${entry.name}-${entry.domain}-${index}`}
                entry={entry}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
