import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Compass } from 'lucide-react';

type BrandVisibilityCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Used when `previewSlot` is not set */
  previewSrc?: string;
  /**
   * When more than one URL is provided (and no `previewSlot`), the first image is shown
   * with a centered “see more” cue — e.g. office branding gallery on marketing services.
   */
  previewGallery?: readonly string[];
  /** Label for the multi-image overlay; defaults to “See more +”. */
  previewGallerySeeMoreLabel?: string;
  /** Custom preview (e.g. coded layout); takes precedence over `previewSrc` */
  previewSlot?: ReactNode;
  exploreLabel: string;
  onClick: () => void;
  /** When set, only preview + Explore show (title/description/icon used for accessibility only). Avoids duplicating section copy. */
  variant?: 'default' | 'mediaOnly';
  /** Shown on the left when variant is mediaOnly (replaces bullet list if set). */
  highlightImageSrc?: string;
  highlightImageAlt?: string;
  /** Shown on the left when variant is mediaOnly and no `highlightImageSrc`. */
  highlightHeading?: string;
  highlightPoints?: string[];
};

export default function BrandVisibilityCard({
  title,
  description,
  icon: Icon,
  previewSrc,
  previewGallery,
  previewGallerySeeMoreLabel = 'See more +',
  previewSlot,
  exploreLabel,
  onClick,
  variant = 'default',
  highlightImageSrc,
  highlightImageAlt,
  highlightHeading,
  highlightPoints
}: BrandVisibilityCardProps) {
  const mediaOnly = variant === 'mediaOnly';
  const hasMultiPreview =
    !previewSlot && previewGallery != null && previewGallery.length > 1;
  const displayPreviewSrc = hasMultiPreview ? previewGallery[0] : previewSrc;
  const showHighlightImage = mediaOnly && !!highlightImageSrc;
  const showHighlightList =
    mediaOnly && !showHighlightImage && highlightPoints && highlightPoints.length > 0;
  const showLeftColumn = showHighlightImage || showHighlightList;
  const mediaOnlyLargePreview =
    mediaOnly && (!!previewSrc || !!previewSlot);
  /** No inner frame/border around the image — only for large media-only `previewSrc` (not slot). */
  const previewImageBare =
    mediaOnlyLargePreview && !!previewSrc && !previewSlot && !hasMultiPreview;

  const mediaBlock = (
    <div
      className={`flex min-w-0 flex-col gap-2.5 ${mediaOnlyLargePreview && showLeftColumn ? 'w-full items-stretch' : 'items-center sm:items-end'}`}
    >
      <div
        className={`group/preview relative ${previewImageBare ? 'overflow-visible' : 'overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-md ring-1 ring-slate-900/5'} ${mediaOnlyLargePreview ? 'h-48 min-h-[12rem] w-full min-w-0 sm:h-56 sm:min-h-[14rem] lg:h-[17rem] lg:min-h-[15rem]' : mediaOnly ? 'h-32 w-full max-w-md sm:h-36' : 'h-24 w-40 sm:h-28 sm:w-44'} ${previewSlot ? 'bg-slate-50' : ''}`}
      >
        {previewSlot ? (
          <div className="flex h-full w-full items-stretch justify-stretch">{previewSlot}</div>
        ) : displayPreviewSrc ? (
          <>
            <img
              src={displayPreviewSrc}
              alt={mediaOnly && highlightImageAlt ? highlightImageAlt : ''}
              className={`h-full w-full origin-center transition duration-700 ease-out ${previewImageBare ? 'group-hover/preview:scale-[1.12] sm:group-hover/preview:scale-[1.18]' : mediaOnlyLargePreview ? 'group-hover/preview:scale-[1.03]' : 'group-hover/preview:scale-110'} ${mediaOnly ? 'object-contain' : 'object-cover'}`}
            />
            {!previewImageBare ? (
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover/preview:opacity-100"
                aria-hidden
              />
            ) : null}
            {hasMultiPreview ? (
              <>
                <span
                  className="pointer-events-none absolute inset-0 bg-black/20"
                  aria-hidden
                />
                <span className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center p-3">
                  <span className="max-w-[min(100%,14rem)] text-center text-sm font-semibold leading-tight tracking-wide text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] sm:text-base">
                    {previewGallerySeeMoreLabel}
                  </span>
                </span>
              </>
            ) : null}
          </>
        ) : null}
      </div>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide text-primary transition group-hover:text-primary/90 sm:text-base">
        <Compass className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
        {exploreLabel}
      </span>
    </div>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${exploreLabel}: ${title}`}
      className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left shadow-md ring-1 ring-slate-900/5 transition hover:border-primary/35 hover:bg-slate-100 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 sm:p-8"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
        aria-hidden
      />
      {mediaOnly ? (
        <div
          className={`relative flex flex-col gap-8 ${showLeftColumn ? 'lg:flex-row lg:items-stretch lg:justify-between lg:gap-10' : 'items-center justify-center sm:justify-end'}`}
        >
          {showHighlightImage ? (
            <div className="min-w-0 flex-1">
              <img
                src={highlightImageSrc}
                alt={highlightImageAlt ?? ''}
                className="max-h-48 w-full max-w-xl rounded-xl border border-slate-200 object-contain object-left shadow-md ring-1 ring-slate-900/5 sm:max-h-56"
              />
            </div>
          ) : showHighlightList ? (
            <div className="min-w-0 flex-1 text-left">
              {highlightHeading ? (
                <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">{highlightHeading}</p>
              ) : null}
              <ul className={`space-y-2.5 text-left ${highlightHeading ? 'mt-3' : ''}`}>
                {highlightPoints.map((line, i) => (
                  <li key={line} className="flex gap-3 text-sm leading-snug text-slate-700 sm:text-base">
                    <span
                      className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-sm ${i % 2 === 0 ? 'bg-cyan-400' : 'bg-orange-400'}`}
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div
            className={`flex min-w-0 ${showLeftColumn ? 'w-full flex-1 basis-0 justify-center lg:justify-end' : 'justify-center sm:justify-end'}`}
          >
            {mediaBlock}
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex min-w-0 gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/15 text-primary">
              <Icon className="h-6 w-6" aria-hidden />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h3>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>
            </div>
          </div>
          {mediaBlock}
        </div>
      )}
    </button>
  );
}
