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
              <h3 className="mb-4 text-xl font-semibold text-white">{c.galleryHeading}</h3>
              <div className="grid gap-5 md:grid-cols-2">
                {c.galleryItems.map((card, index) => (
                  <article
                    key={card.title}
                    className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/70 shadow-lg"
                  >
                    <div className="h-64 w-full overflow-hidden bg-slate-950 sm:h-72">
                      <img
                        src={exhibitionImages[index] ?? exhibitionImages[0]}
                        alt={card.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{card.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
