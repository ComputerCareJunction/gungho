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

  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative isolate flex w-[13.5rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-b from-slate-800 via-slate-800/98 to-slate-950/90 p-5 outline-none ring-offset-2 ring-offset-slate-950 transition duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/55 focus-visible:ring-2 focus-visible:ring-primary sm:w-60 md:w-64
        shadow-[0_2px_8px_-2px_rgba(0,0,0,0.5),0_12px_40px_-10px_rgba(249,115,22,0.18),0_0_0_1px_rgba(249,115,22,0.12)_inset]
        hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.45),0_16px_48px_-8px_rgba(249,115,22,0.32),0_0_32px_-8px_rgba(249,115,22,0.25),0_0_0_1px_rgba(249,115,22,0.2)_inset]
        before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-br before:from-primary/10 before:via-transparent before:to-transparent before:opacity-60 before:transition-opacity before:content-[''] hover:before:opacity-100"
      aria-label={`${entry.name}, opens in a new tab`}
    >
      <div className="relative z-[1] flex h-32 items-center justify-center rounded-xl bg-white p-5 shadow-[inset_0_1px_4px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.9)_inset] ring-1 ring-slate-200/80 transition-shadow duration-300 group-hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.06),0_0_0_3px_rgba(249,115,22,0.15),0_8px_24px_-6px_rgba(249,115,22,0.2)] sm:h-36">
        {!imgError ? (
          <img
            src={faviconUrl(entry.domain)}
            alt=""
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
            className="h-[4.25rem] w-[4.25rem] object-contain sm:h-20 sm:w-20"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="select-none text-base font-bold uppercase tracking-wide text-slate-500">
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
      <div className="relative z-[1] mt-auto h-1 w-full rounded-full bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-70 transition-all duration-300 group-hover:via-primary group-hover:opacity-100 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.65)]" />
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
    'pointer-events-auto z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-600 bg-slate-950/90 text-white shadow-lg backdrop-blur-sm transition hover:border-primary hover:bg-slate-900 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-30';

  return (
    <section
      className="relative overflow-hidden border-t border-slate-800/80 bg-slate-950 text-white"
      aria-labelledby="home-clientele-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-primary/5 blur-[90px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 text-center sm:px-8 sm:pb-24 sm:pt-20">
        <h2
          id="home-clientele-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          {c.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
          {c.subtitle}
        </p>

        <div className="relative mt-12 sm:mt-14">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-950 to-transparent sm:w-20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-950 to-transparent sm:w-20"
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
            className="flex justify-start gap-5 overflow-x-auto scroll-auto px-14 pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-7 sm:px-16 [&::-webkit-scrollbar]:hidden"
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
