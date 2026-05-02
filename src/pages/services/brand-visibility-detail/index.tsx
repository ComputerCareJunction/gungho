import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Building2, Signpost, Store } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import en from '../../../locales/en.json';
import Seo from '../../../components/Seo';
import { OfficeBrandingPhotoGallery, OfficeBrandingThankYouCard } from '../../../components/OfficeBrandingShowcase';

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

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={`/marketing-services/${item.detailSlug}`} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="mx-auto max-w-5xl px-6 py-10 pb-20 sm:px-8 sm:py-12">
          <button
            type="button"
            onClick={() => navigate('/marketing-services')}
            className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-slate-800/80 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:border-primary/40 hover:bg-slate-800 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            {detailCopy.backLink}
          </button>

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
        </div>
      </div>
    </>
  );
}
