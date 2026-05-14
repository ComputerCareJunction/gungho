import type { LucideIcon } from 'lucide-react';
import {
  CalendarDays,
  Gift,
  Heart,
  Monitor,
  Package,
  PackageOpen,
  Search,
  Signpost,
  Snowflake,
  Truck,
  Users,
  Wallet
} from 'lucide-react';
import en from '../locales/en.json';
import liquorSegmentImg from '../assets/images/liquor-segment.png';

const ta = en.marketingServicesPage.sections.tradeActivation;

type ExpertiseItem = {
  primary?: string;
  rest: string;
};

type LiquorExpertiseLayoutProps = {
  /** `compact` fits a small preview; `comfortable` is the full trade detail layout */
  density?: 'comfortable' | 'compact';
};

const CARD_ICONS: LucideIcon[] = [
  Users,
  Package,
  Gift,
  Signpost,
  PackageOpen,
  Wallet,
  CalendarDays,
  Truck,
  Snowflake,
  Heart,
  Search,
  Monitor
];

function formatItem(item: ExpertiseItem): { title: string; description: string | null } {
  if (item.primary) {
    const rest = item.rest.trim().replace(/^—\s*/, '');
    return { title: item.primary, description: rest || null };
  }
  const r = item.rest.trim();
  const idx = r.indexOf('—');
  if (idx === -1) {
    return { title: r, description: null };
  }
  return { title: r.slice(0, idx).trim(), description: r.slice(idx + 1).trim() };
}

function ExpertiseServiceCard({ item, icon: Icon, compact }: { item: ExpertiseItem; icon: LucideIcon; compact?: boolean }) {
  const { title, description } = formatItem(item);
  return (
    <div
      className={`group/svc flex gap-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm backdrop-blur-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:bg-slate-100 hover:shadow-md ${compact ? 'p-3' : 'p-4 sm:gap-4 sm:p-5'}`}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary ring-1 ring-primary/25 transition-transform duration-300 ease-out group-hover/svc:scale-110 ${compact ? 'h-9 w-9' : 'h-10 w-10 sm:h-11 sm:w-11'}`}
      >
        <Icon className={compact ? 'h-4 w-4' : 'h-5 w-5 sm:h-[22px] sm:w-[22px]'} strokeWidth={2} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className={`font-bold text-slate-900 ${compact ? 'text-xs leading-snug' : 'text-sm sm:text-base'}`}>{title}</p>
        {description ? (
          <p className={`mt-1 text-slate-600 ${compact ? 'text-[10px] leading-tight' : 'text-xs leading-relaxed sm:text-sm'}`}>
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function LiquorExpertiseLayout({ density = 'comfortable' }: LiquorExpertiseLayoutProps) {
  const allItems = ta.liquorExpertiseItems as ExpertiseItem[];
  const title = ta.liquorExpertise.title;
  const compact = density === 'compact';
  const items = compact ? allItems.slice(0, 5) : allItems;

  const columnItems = compact ? items : items.slice(0, 6);
  const gridItems = compact ? [] : items.slice(6, 12);

  if (compact) {
    return (
      <div className="w-full" aria-label={ta.liquorExpertise.imageAlt}>
        <h2 className="mb-2 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-primary">
          {title}
        </h2>
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="group/liqimg flex w-auto shrink-0 items-center justify-center overflow-hidden rounded-lg">
            <img
              src={liquorSegmentImg}
              alt=""
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full max-w-28 shrink-0 origin-center object-contain transition duration-500 ease-out group-hover/liqimg:scale-105 sm:max-w-32"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            {columnItems.map((item, i) => (
              <ExpertiseServiceCard key={i} item={item} icon={CARD_ICONS[i] ?? Users} compact />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full" aria-labelledby="liquor-expertise-heading">
      <h2
        id="liquor-expertise-heading"
        className="text-balance text-center text-lg font-bold uppercase tracking-[0.06em] text-primary sm:text-xl md:text-2xl"
      >
        {title}
      </h2>

      <div className="mt-8 grid gap-8 sm:mt-10 lg:mt-12 lg:grid-cols-2 lg:items-center lg:gap-x-12 lg:gap-y-10 xl:gap-x-16">
        <div className="flex h-full min-h-0 w-full items-center justify-center p-2 lg:px-4">
          <div className="group/liqimg overflow-hidden rounded-xl">
            <img
              src={liquorSegmentImg}
              alt={ta.liquorExpertise.imageAlt}
              loading="lazy"
              decoding="async"
              className="mx-auto h-auto w-full max-w-[16rem] origin-center object-contain transition duration-500 ease-out group-hover/liqimg:scale-[1.06] sm:max-w-56 md:max-w-90 lg:max-w-90"
            />
          </div>
        </div>

        <ul className="flex list-none flex-col gap-3 p-0 sm:gap-4" aria-label={ta.liquorExpertise.title}>
          {columnItems.map((item, i) => (
            <li key={i}>
              <ExpertiseServiceCard item={item} icon={CARD_ICONS[i] ?? Users} />
            </li>
          ))}
        </ul>
      </div>

      {gridItems.length > 0 ? (
        <ul
          className="mt-8 grid list-none grid-cols-1 gap-4 p-0 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3"
          aria-label={`${ta.liquorExpertise.title} — additional services`}
        >
          {gridItems.map((item, i) => (
            <li key={i + 6}>
              <ExpertiseServiceCard item={item} icon={CARD_ICONS[i + 6] ?? Monitor} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
