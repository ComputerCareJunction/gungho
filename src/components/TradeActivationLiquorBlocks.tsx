import en from '../locales/en.json';
import CarlsbergTradeCaseStudy from './CarlsbergTradeCaseStudy';
import { liquorBrandAssociationTiles } from '../data/marketingTradeLiquorAssets';
import LiquorExpertiseLayout from './LiquorExpertiseLayout';

const ta = en.marketingServicesPage.sections.tradeActivation;

export default function TradeActivationLiquorBlocks() {
  return (
    <div className="space-y-12">
      <LiquorExpertiseLayout density="comfortable" />

      <div>
        <h2 className="text-lg font-bold tracking-wide text-primary sm:text-xl">{ta.brandAssociation.title}</h2>
        <div className="mt-4 rounded-xl border border-slate-600/60 bg-slate-50 p-3 shadow-lg ring-1 ring-black/20 sm:p-4">
          <ul
            className="mx-auto grid w-full list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5"
            aria-label={ta.brandAssociation.imageAlt}
          >
            {liquorBrandAssociationTiles.map((src) => (
              <li key={src} className="min-w-0">
                <div className="group/tile relative isolate aspect-square overflow-hidden rounded-lg bg-slate-50 p-2 transition duration-300 ease-out hover:bg-slate-100">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full origin-center object-contain transition duration-500 ease-out group-hover/tile:scale-[1.12] sm:group-hover/tile:scale-[1.18]"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CarlsbergTradeCaseStudy />
    </div>
  );
}
