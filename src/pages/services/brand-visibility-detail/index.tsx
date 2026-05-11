import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Building2, PartyPopper, Signpost, Store } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import en from '../../../locales/en.json';
import Seo from '../../../components/Seo';
import MarketingServicesBackNav from '../../../components/MarketingServicesBackNav';
import { OfficeBrandingPhotoGallery, OfficeBrandingThankYouCard } from '../../../components/OfficeBrandingShowcase';
import exhibitionImageNightStage from '../../../assets/images/exhibition-portfolio/kings-birthday-night-stage.png';
import exhibitionImageDayStage from '../../../assets/images/exhibition-portfolio/kings-birthday-day-stage.png';
import exhibitionImageNetworking from '../../../assets/images/exhibition-portfolio/kings-birthday-networking-zone.png';
import exhibitionImageEntryArch from '../../../assets/images/exhibition-portfolio/kings-birthday-entry-arch.png';

type BrandItem = (typeof en.marketingServicesPage.sections.brandVisibility.items)[number];

function isBrandDetailItem(item: BrandItem): item is BrandItem & { detailSlug: string } {
  return 'detailSlug' in item && typeof (item as { detailSlug?: string }).detailSlug === 'string';
}

function isOfficeGalleryItem(item: BrandItem): item is BrandItem & { gallery: 'officeBranding' } {
  return 'gallery' in item && (item as { gallery?: string }).gallery === 'officeBranding';
}

function iconForSlug(slug: string): LucideIcon {
  switch (slug) {
    case 'in-shop-branding':
      return Store;
    case 'outshop-branding':
      return Signpost;
    case 'office-space-branding':
      return Building2;
    case 'exhibition-portfolio':
      return PartyPopper;
    default:
      return Store;
  }
}

function seoForSlug(slug: string): { title: string; description: string } {
  const s = en.seo;
  switch (slug) {
    case 'in-shop-branding':
      return { title: s.inShopBrandingTitle, description: s.inShopBrandingDescription };
    case 'outshop-branding':
      return { title: s.outshopBrandingTitle, description: s.outshopBrandingDescription };
    case 'office-space-branding':
      return { title: s.officeSpaceBrandingTitle, description: s.officeSpaceBrandingDescription };
    case 'exhibition-portfolio':
      return { title: s.exhibitionPortfolioTitle, description: s.exhibitionPortfolioDescription };
    default:
      return { title: s.marketingServicesTitle, description: s.marketingServicesDescription };
  }
}

export default function BrandVisibilityDetailPage() {
  const navigate = useNavigate();
  const { detailSlug } = useParams<{ detailSlug: string }>();
  const items = en.marketingServicesPage.sections.brandVisibility.items;
  const item = detailSlug ? items.find((i) => isBrandDetailItem(i) && i.detailSlug === detailSlug) : undefined;
  const detailCopy = en.marketingServicesPage.brandVisibilityDetail;

  if (!detailSlug || !item || !isBrandDetailItem(item)) {
    return <Navigate to="/marketing-services" replace />;
  }

  const Icon = iconForSlug(item.detailSlug);
  const seo = seoForSlug(item.detailSlug);
  const showOfficeGallery = isOfficeGalleryItem(item);
  const showExhibitionPortfolio = item.detailSlug === 'exhibition-portfolio';
  const exhibition = en.marketingServicesPage.exhibitionPortfolioDetail;
  const exhibitionImages = [
    exhibitionImageNightStage,
    exhibitionImageDayStage,
    exhibitionImageNetworking,
    exhibitionImageEntryArch,
  ] as const;

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={`/marketing-services/${item.detailSlug}`} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="page-content-inset py-10 pb-20 sm:py-12">
          <MarketingServicesBackNav label={detailCopy.backLink} onBack={() => navigate('/marketing-services')} />

          <header className="mb-10 border-b border-white/10 pb-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-primary">
              <Icon className="h-7 w-7" aria-hidden />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{item.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/75">{item.description}</p>
            {'pageLead' in item && typeof item.pageLead === 'string' ? (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/60">{item.pageLead}</p>
            ) : null}
          </header>

          {showOfficeGallery ? (
            <div className="space-y-14">
              <OfficeBrandingPhotoGallery />
              <OfficeBrandingThankYouCard />
            </div>
          ) : null}

          {showExhibitionPortfolio ? (
            <section className="space-y-8 rounded-2xl border border-white/10 bg-slate-950/40 p-5 sm:p-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">{exhibition.eventTitle}</h2>
                <p className="text-white/80">
                  <span className="font-semibold text-primary">{exhibition.dateLabel}: </span>
                  {exhibition.dateValue}
                </p>
                <p className="text-white/80">
                  <span className="font-semibold text-primary">{exhibition.venueLabel}: </span>
                  {exhibition.venueValue}
                </p>
                <p className="max-w-4xl text-white/75">{exhibition.summary}</p>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold text-white">{exhibition.galleryHeading}</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  {exhibition.galleryItems.map((card, index) => (
                    <article
                      key={card.title}
                      className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/70 shadow-lg"
                    >
                      <img
                        src={exhibitionImages[index] ?? exhibitionImages[0]}
                        alt={card.title}
                        className="h-56 w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">{card.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </>
  );
}
