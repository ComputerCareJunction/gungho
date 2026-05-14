type ExhibitionPortfolioCollageProps = {
  images: readonly string[];
  alts: readonly string[];
  density?: 'compact' | 'comfortable';
};

const COMFORTABLE_FRAMES = [
  'w-28 shrink-0 -rotate-[2.5deg] sm:w-32 md:w-36 lg:w-40',
  'w-28 shrink-0 rotate-[2deg] sm:w-32 md:w-36 lg:w-40',
  'w-28 shrink-0 -rotate-[1.5deg] sm:w-32 md:w-36 lg:w-40',
  'w-28 shrink-0 rotate-[3deg] sm:w-32 md:w-36 lg:w-40',
] as const;

const COMPACT_FRAMES = [
  'w-14 shrink-0 -rotate-[4deg] sm:w-[3.65rem]',
  'w-14 shrink-0 rotate-[3deg] sm:w-[3.65rem]',
  'w-14 shrink-0 -rotate-[3deg] sm:w-[3.65rem]',
  'w-14 shrink-0 rotate-[4deg] sm:w-[3.65rem]',
] as const;

const COMFORTABLE_IMG = 'aspect-[3/4] w-full object-cover sm:aspect-[4/5]';
const COMPACT_IMG = 'aspect-[3/4] w-full object-cover';

/**
 * Scattered photo strip (cream field, rounded frames, light rotation) for exhibition portfolio shots — no captions on images.
 */
export function ExhibitionPortfolioCollage({
  images,
  alts,
  density = 'comfortable',
}: ExhibitionPortfolioCollageProps) {
  const frames = density === 'compact' ? COMPACT_FRAMES : COMFORTABLE_FRAMES;
  const imgClass = density === 'compact' ? COMPACT_IMG : COMFORTABLE_IMG;

  return (
    <div
      className={
        density === 'compact'
          ? 'flex min-h-[7.5rem] flex-nowrap items-center justify-center gap-2 bg-[#f4f1eb] px-2 py-3 sm:min-h-[8.5rem] sm:gap-2.5 sm:px-2.5 sm:py-4'
          : 'flex min-h-[13rem] flex-wrap content-center items-center justify-center gap-x-4 gap-y-5 bg-[#f4f1eb] px-4 py-8 sm:min-h-[15rem] sm:gap-x-5 sm:gap-y-6 sm:px-6 sm:py-12 md:min-h-[17rem] md:gap-x-6 md:gap-y-6 md:px-8'
      }
      role="list"
    >
      {images.map((src, index) => {
        const frame = frames[index % frames.length] ?? frames[0];
        const alt = alts[index] ?? alts[0] ?? 'Exhibition photo';

        return (
          <div
            key={`${src}-${index}`}
            role="listitem"
            className={[
              'relative overflow-hidden rounded-2xl border border-white/70 shadow-[0_10px_36px_-12px_rgba(0,0,0,0.22)] ring-1 ring-stone-900/[0.06] transition duration-500 ease-out will-change-transform',
              frame,
            ].join(' ')}
          >
            <img src={src} alt={alt} className={imgClass} loading="lazy" decoding="async" />
          </div>
        );
      })}
    </div>
  );
}
