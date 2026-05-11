import { useNavigate } from 'react-router-dom';
import {
  Eye,
  Handshake,
  Sprout,
  Radio,
  Layers,
  Megaphone,
  MonitorSmartphone,
  Store,
  PartyPopper,
  Clapperboard,
  Building2,
  Signpost
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import en from '../../../locales/en.json';
import Seo from '../../../components/Seo';
import BrandVisibilityCard from '../../../components/BrandVisibilityCard';
import { previewImageForBrandSlug } from '../../../data/brandVisibilityPreviews';
import { officeBrandingGallerySources } from '../../../data/officeBrandingGallery';
import liquorSegmentImg from '../../../assets/images/liquor-segment.png';

type BrandVisibilityItem = (typeof en.marketingServicesPage.sections.brandVisibility.items)[number];

function isBrandDetailItem(item: BrandVisibilityItem): item is BrandVisibilityItem & { detailSlug: string } {
  return 'detailSlug' in item && typeof (item as { detailSlug?: string }).detailSlug === 'string';
}

function previewGalleryFromItem(item: BrandVisibilityItem & { detailSlug: string }): readonly string[] | undefined {
  const galleryKey = (item as { gallery?: string }).gallery;
  if (galleryKey === 'officeBranding') return officeBrandingGallerySources;
  return undefined;
}

function iconForBrandSlug(slug: string): LucideIcon {
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

export default function MarketingServices() {
  const navigate = useNavigate();
  const { sections } = en.marketingServicesPage;
  const brandVisibility = sections.brandVisibility;
  const brandDetailCopy = en.marketingServicesPage.brandVisibilityDetail;

  return (
    <>
      <Seo
        title={en.seo.marketingServicesTitle}
        description={en.seo.marketingServicesDescription}
        path="/marketing-services"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="page-content-inset py-12 pb-20">
          <header className="text-center mb-14 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              {en.marketingServicesPage.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed">
              {en.marketingServicesPage.subtitle}
            </p>
          </header>

          <div className="space-y-10">
            <section className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700/40 to-slate-800/40 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="rounded-xl bg-primary/15 p-3 text-primary shrink-0">
                  <Eye className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {brandVisibility.heading}
                  </h2>
                  <p className="mt-2 text-white/70 leading-relaxed">
                    {brandVisibility.lead}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-4 sm:pl-14">
                {brandVisibility.items
                  .filter(isBrandDetailItem)
                  .map((item) => (
                    <BrandVisibilityCard
                      key={item.detailSlug}
                      title={item.title}
                      description={item.description}
                      icon={iconForBrandSlug(item.detailSlug)}
                      previewSrc={previewImageForBrandSlug(item.detailSlug)}
                      previewGallery={previewGalleryFromItem(item)}
                      previewGallerySeeMoreLabel={brandDetailCopy.seeMoreGallery}
                      exploreLabel={brandDetailCopy.exploreLabel}
                      onClick={() => navigate(`/marketing-services/${item.detailSlug}`)}
                    />
                  ))}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700/40 to-slate-800/40 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="rounded-xl bg-primary/15 p-3 text-primary shrink-0">
                  <Handshake className="w-7 h-7" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {sections.tradeActivation.heading}
                  </h2>
                  <p className="mt-2 text-white/70 leading-relaxed">
                    {sections.tradeActivation.body}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:pl-14">
                <BrandVisibilityCard
                  title={sections.tradeActivation.heading}
                  description={sections.tradeActivation.body}
                  icon={Handshake}
                  previewSrc={liquorSegmentImg}
                  exploreLabel={brandDetailCopy.exploreLabel}
                  variant="mediaOnly"
                  highlightHeading={sections.tradeActivation.liquorExpertise.title}
                  highlightPoints={sections.tradeActivation.cardHighlightPoints}
                  highlightImageAlt={sections.tradeActivation.cardLiquorSegmentImageAlt}
                  onClick={() => navigate('/marketing-services/trade-activation')}
                />
              </div>
            </section>

            <section className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700/40 to-slate-800/40 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="rounded-xl bg-primary/15 p-3 text-primary shrink-0">
                  <Sprout className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {sections.businessIncubation.heading}
                  </h2>
                  <p className="mt-2 text-white/70 leading-relaxed">
                    {sections.businessIncubation.lead}
                  </p>
                </div>
              </div>
              <ul className="space-y-4 pl-0 sm:pl-14 list-none">
                {sections.businessIncubation.items.map((item) => (
                  <li
                    key={item.title}
                    className="border-l-2 border-primary/40 pl-4 sm:pl-5"
                  >
                    <span className="font-semibold text-white">{item.title}</span>
                    <span className="text-white/60"> — </span>
                    <span className="text-white/75">{item.description}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700/40 to-slate-800/40 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="rounded-xl bg-primary/15 p-3 text-primary shrink-0">
                  <Radio className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {sections.mediaBuying.heading}
                  </h2>
                  <p className="mt-2 text-white/70 leading-relaxed">
                    {sections.mediaBuying.lead}
                  </p>
                </div>
              </div>
              <ul className="space-y-3 pl-0 sm:pl-14 list-disc list-inside marker:text-primary text-white/75">
                {sections.mediaBuying.bullets.map((line) => (
                  <li key={line} className="leading-relaxed pl-1">
                    {line}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-slate-800/50 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="rounded-xl bg-primary/20 p-3 text-primary shrink-0">
                  <Layers className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {sections.integratedMarketing.heading}
                  </h2>
                  <p className="mt-2 text-white/70 leading-relaxed">
                    {sections.integratedMarketing.lead}
                  </p>
                </div>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3 pl-0 sm:pl-14">
                {sections.integratedMarketing.items.map((line) => (
                  <li
                    key={line}
                    className="flex items-center gap-2 rounded-lg bg-slate-900/40 px-4 py-2.5 text-white/90 text-sm sm:text-base border border-slate-600/30"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700/40 to-slate-800/40 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="rounded-xl bg-primary/15 p-3 text-primary shrink-0">
                  <Megaphone className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {sections.marketingServices.heading}
                  </h2>
                  <p className="mt-2 text-white/70 leading-relaxed">
                    {sections.marketingServices.lead}
                  </p>
                </div>
              </div>
              <ul className="space-y-3 pl-0 sm:pl-14 list-disc list-inside marker:text-primary text-white/75">
                {sections.marketingServices.items.map((line) => (
                  <li key={line} className="leading-relaxed pl-1">
                    {line}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700/40 to-slate-800/40 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary/15 p-3 text-primary shrink-0">
                  <MonitorSmartphone className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {sections.digitalMarketing.heading}
                  </h2>
                  <p className="mt-3 text-white/75 leading-relaxed">
                    {sections.digitalMarketing.body}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700/40 to-slate-800/40 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-primary/15 p-3 text-primary shrink-0">
                  <Store className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {sections.retailDesign.heading}
                  </h2>
                  <p className="mt-3 text-white/75 leading-relaxed">
                    {sections.retailDesign.body}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700/40 to-slate-800/40 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="rounded-xl bg-primary/15 p-3 text-primary shrink-0">
                  <PartyPopper className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {sections.eventsExhibitions.heading}
                  </h2>
                  <p className="mt-2 text-white/70 leading-relaxed">
                    {sections.eventsExhibitions.lead}
                  </p>
                </div>
              </div>
              <ul className="space-y-3 pl-0 sm:pl-14 list-disc list-inside marker:text-primary text-white/75">
                {sections.eventsExhibitions.items.map((line) => (
                  <li key={line} className="leading-relaxed pl-1">
                    {line}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-slate-600/50 bg-gradient-to-br from-slate-700/40 to-slate-800/40 p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="rounded-xl bg-primary/15 p-3 text-primary shrink-0">
                  <Clapperboard className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {sections.contentCuration.heading}
                  </h2>
                  <p className="mt-2 text-white/70 leading-relaxed">
                    {sections.contentCuration.lead}
                  </p>
                </div>
              </div>
              <ul className="space-y-3 pl-0 sm:pl-14 list-disc list-inside marker:text-primary text-white/75">
                {sections.contentCuration.items.map((line) => (
                  <li key={line} className="leading-relaxed pl-1">
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-14 rounded-2xl bg-gradient-to-r from-slate-700 to-slate-600 p-8 text-center border border-primary/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {en.marketingServicesPage.ctaTitle}
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              {en.marketingServicesPage.ctaSubtitle}
            </p>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {en.marketingServicesPage.ctaButton}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
