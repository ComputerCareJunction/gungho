import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import en from '../locales/en.json';
import { officeBrandingGallerySources } from '../data/officeBrandingGallery';

const bv = en.marketingServicesPage.sections.brandVisibility;
const lb = bv.galleryLightbox;

const ZOOM_MIN = 1;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;

export function OfficeBrandingPhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [fs, setFs] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setActiveIndex(null);
    setZoom(1);
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
    }
  }, []);

  const len = officeBrandingGallerySources.length;

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + len) % len));
  }, [len]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % len));
  }, [len]);

  useEffect(() => {
    if (activeIndex === null) return;
    setZoom(1);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, goPrev, goNext]);

  useEffect(() => {
    const onFsChange = () => setFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const zoomIn = () => setZoom((z) => Math.min(ZOOM_MAX, Math.round((z + ZOOM_STEP) * 100) / 100));
  const zoomOut = () => setZoom((z) => Math.max(ZOOM_MIN, Math.round((z - ZOOM_STEP) * 100) / 100));
  const resetZoom = () => setZoom(1);

  const toggleFullscreen = async () => {
    const el = shellRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* unsupported or denied */
    }
  };

  const activeSrc = activeIndex !== null ? officeBrandingGallerySources[activeIndex] : null;

  const toolBtn =
    'flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-slate-900/90 text-white transition hover:border-primary/50 hover:bg-slate-800 hover:text-primary disabled:pointer-events-none disabled:opacity-35 sm:h-11 sm:w-11';

  return (
    <section aria-label={bv.officeBrandingGalleryHeading}>
      <h2 className="mb-4 text-lg font-semibold text-slate-900 sm:text-xl">{bv.officeBrandingGalleryHeading}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {officeBrandingGallerySources.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-left shadow-md ring-0 transition hover:border-primary/45 hover:bg-slate-100 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
            aria-label={`${lb.openHint}: ${bv.officeBrandingGalleryAlt} (${i + 1})`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] h-full w-full object-cover transition duration-500 ease-out will-change-transform group-hover:scale-110"
            />
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
              aria-hidden
            />
            <span className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/55 px-2.5 py-1 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100 sm:text-sm">
              <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
              {lb.openHint}
            </span>
          </button>
        ))}
      </div>

      {activeIndex !== null && activeSrc ? (
        <div
          ref={shellRef}
          className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={bv.officeBrandingGalleryHeading}
        >
          <div className="relative z-30 flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-slate-950/90 px-3 py-2 sm:px-4">
            <p className="min-w-0 truncate px-1 text-xs text-white/70 sm:text-sm">
              {bv.officeBrandingGalleryAlt} ({activeIndex + 1} / {len})
            </p>
            <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
              <button type="button" className={toolBtn} onClick={goPrev} aria-label={lb.previous}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" className={toolBtn} onClick={goNext} aria-label={lb.next}>
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                type="button"
                className={toolBtn}
                onClick={zoomOut}
                disabled={zoom <= ZOOM_MIN}
                aria-label={lb.zoomOut}
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button type="button" className={toolBtn} onClick={resetZoom} aria-label={lb.resetZoom}>
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                type="button"
                className={toolBtn}
                onClick={zoomIn}
                disabled={zoom >= ZOOM_MAX}
                aria-label={lb.zoomIn}
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button type="button" className={toolBtn} onClick={toggleFullscreen} aria-label={fs ? lb.exitFullscreen : lb.fullscreen}>
                {fs ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
              <button type="button" className={toolBtn} onClick={close} aria-label={lb.close}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative z-10 flex min-h-0 flex-1 overflow-auto overscroll-contain p-4 sm:p-8">
            <div className="m-auto flex min-h-full min-w-full items-center justify-center">
              <div
                className="inline-block origin-center transition-transform duration-200 ease-out"
                style={{ transform: `scale(${zoom})` }}
              >
                <img
                  src={activeSrc}
                  alt={`${bv.officeBrandingGalleryAlt} (${activeIndex + 1})`}
                  className="max-h-[min(85dvh,85vh)] max-w-[min(92vw,1200px)] select-none object-contain shadow-2xl"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white/90 backdrop-blur-md sm:text-sm">
            {Math.round(zoom * 100)}%
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function OfficeBrandingThankYouCard() {
  const thankYou = bv.thankYouClosing;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-300/90 bg-slate-50 px-6 py-10 text-slate-900 shadow-xl sm:px-10 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="flex flex-wrap items-baseline gap-3 sm:gap-4">
            <span className="shrink-0 rounded-sm bg-slate-200 px-3 py-2 text-sm font-medium tracking-tight text-slate-600">
              {thankYou.prefix}
            </span>
            <span className="text-3xl font-bold tracking-tight text-red-600 sm:text-5xl">{thankYou.execution}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3 pl-6 sm:gap-4 sm:pl-12">
            <span className="shrink-0 rounded-sm bg-slate-200 px-3 py-2 text-sm font-medium tracking-tight text-slate-600">
              {thankYou.prefix}
            </span>
            <span className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">{thankYou.strategy}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-3 pl-12 sm:gap-4 sm:pl-24">
            <span className="shrink-0 rounded-sm bg-slate-200 px-3 py-2 text-sm font-medium tracking-tight text-slate-600">
              {thankYou.prefix}
            </span>
            <span className="text-3xl font-bold tracking-tight text-red-600 sm:text-5xl">{thankYou.creative}</span>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600 sm:text-base">{thankYou.taglineLead}</p>
          <div className="mt-3 flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-px min-w-[2.5rem] flex-1 max-w-[140px] bg-slate-300" aria-hidden />
            <span className="shrink-0 text-lg font-bold tracking-tight text-slate-800 sm:text-2xl">
              {thankYou.taglineHighlight}
            </span>
            <span className="h-px min-w-[2.5rem] flex-1 max-w-[140px] bg-slate-300" aria-hidden />
          </div>
        </div>

        <p
          className="mt-12 text-center text-5xl leading-none text-red-600 sm:text-7xl"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {thankYou.scriptTitle}
        </p>
      </div>
    </div>
  );
}
