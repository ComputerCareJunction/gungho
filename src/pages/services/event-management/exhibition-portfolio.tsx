import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PartyPopper } from 'lucide-react';
import en from '../../../locales/en.json';
import Seo from '../../../components/Seo';
import exhibitionImageNightStage from '../../../assets/images/exhibition-portfolio/kings-birthday-night-stage.png';
import exhibitionImageDayStage from '../../../assets/images/exhibition-portfolio/kings-birthday-day-stage.png';
import exhibitionImageNetworking from '../../../assets/images/exhibition-portfolio/kings-birthday-networking-zone.png';
import exhibitionImageEntryArch from '../../../assets/images/exhibition-portfolio/kings-birthday-entry-arch.png';

export default function EventExhibitionPortfolioPage() {
  const navigate = useNavigate();
  const c = en.eventManagementPage.exhibitionPortfolio;
  const exhibitionImages = [
    exhibitionImageNightStage,
    exhibitionImageDayStage,
    exhibitionImageNetworking,
    exhibitionImageEntryArch,
  ] as const;

  return (
    <>
      <Seo title={en.seo.eventManagementTitle} description={en.seo.eventManagementDescription} path="/event-management/exhibition-portfolio" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="page-content-inset py-10 pb-20 sm:py-12">
          <div className="fixed left-4 top-24 z-50 sm:left-8">
            <button
              type="button"
              onClick={() => navigate('/event-management')}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-slate-900/85 px-4 py-2 text-sm font-medium text-white/85 shadow-lg backdrop-blur transition hover:border-primary/40 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to event management
            </button>
          </div>

          <div className="mb-8 h-11" aria-hidden />

          <header className="mb-10 border-b border-white/10 pb-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-primary">
              <PartyPopper className="h-7 w-7" aria-hidden />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{c.cardTitle}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70">{c.cardDescription}</p>
          </header>

          <section className="space-y-8 rounded-2xl border border-white/10 bg-slate-950/40 p-5 sm:p-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{c.eventTitle}</h2>
              <p className="text-white/80">
                <span className="font-semibold text-primary">{c.dateLabel}: </span>
                {c.dateValue}
              </p>
              <p className="text-white/80">
                <span className="font-semibold text-primary">{c.venueLabel}: </span>
                {c.venueValue}
              </p>
              <p className="max-w-4xl text-white/75">{c.summary}</p>
            </div>

            <div>
              <h3 className="mb-5 text-xl font-semibold text-white sm:mb-6">{c.galleryHeading}</h3>
              <div className="mx-auto grid max-w-[48rem] grid-cols-2 gap-4 sm:max-w-[58rem] sm:gap-6 md:max-w-[68rem] md:gap-7 lg:max-w-[80rem] lg:grid-cols-4 lg:gap-8 xl:max-w-[88rem]">
                {c.galleryItems.map((card, index) => {
                  const aspectClass =
                    index === 0
                      ? 'aspect-[2/3]'
                      : index === 1
                        ? 'aspect-[3/4]'
                        : index === 2
                          ? 'aspect-[5/7]'
                          : 'aspect-[4/5]';
                  return (
                    <article
                      key={card.title}
                      className="group relative w-full overflow-hidden rounded-2xl border border-white/20 bg-slate-950 shadow-[0_20px_56px_-18px_rgba(0,0,0,0.78)] ring-1 ring-black/25 sm:rounded-3xl"
                    >
                      <div className={`relative w-full ${aspectClass}`}>
                        <img
                          src={exhibitionImages[index] ?? exhibitionImages[0]}
                          alt={card.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute bottom-0 left-0 right-0 top-auto z-[1] m-0 w-full rounded-b-2xl border-t border-white/50 bg-white/30 px-4 pt-3 pb-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-b-3xl sm:px-5 sm:pt-3.5 sm:pb-3.5 md:px-6 md:pt-4 md:pb-4">
                          <h4 className="text-sm font-semibold leading-snug text-slate-950 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] sm:text-base">
                            {card.title}
                          </h4>
                          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-800/95 sm:text-sm">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
