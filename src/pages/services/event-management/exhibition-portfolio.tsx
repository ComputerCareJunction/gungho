import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PartyPopper } from 'lucide-react';
import en from '../../../locales/en.json';
import Seo from '../../../components/Seo';
import { ExhibitionPortfolioCollage } from '../../../components/ExhibitionPortfolioCollage';
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
      <div className="min-h-screen bg-white">
        <div className="page-content-inset py-10 pb-20 sm:py-12">
          <div className="fixed left-4 top-24 z-50 sm:left-8">
            <button
              type="button"
              onClick={() => navigate('/event-management')}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-md backdrop-blur transition hover:border-primary/40 hover:bg-slate-100 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to event management
            </button>
          </div>

          <div className="mb-8 h-11" aria-hidden />

          <header className="mb-10 border-b border-slate-200 pb-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-primary">
              <PartyPopper className="h-7 w-7" aria-hidden />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">{c.cardTitle}</h1>
          </header>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-x-12 lg:gap-y-0">
              <div className="min-w-0 space-y-3 lg:max-w-xl lg:pr-4">
                <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">{c.eventTitle}</h2>
                <p className="text-slate-700">
                  <span className="font-semibold text-primary">{c.dateLabel}: </span>
                  {c.dateValue}
                </p>
                <p className="text-slate-700">
                  <span className="font-semibold text-primary">{c.venueLabel}: </span>
                  {c.venueValue}
                </p>
                <p className="max-w-4xl text-pretty leading-relaxed text-slate-600">{c.summary}</p>
              </div>

              <div className="flex min-w-0 flex-col lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-2xl ring-1 ring-stone-200/80">
                  <ExhibitionPortfolioCollage
                    images={exhibitionImages}
                    alts={c.galleryItems.map((card) => card.title)}
                    density="comfortable"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
