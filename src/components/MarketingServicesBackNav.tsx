import { ArrowLeft } from 'lucide-react';

type MarketingServicesBackNavProps = {
  label: string;
  onBack: () => void;
};

/**
 * Sticks below the main navbar while the page scrolls (detail pages opened from marketing / via history).
 */
export default function MarketingServicesBackNav({ label, onBack }: MarketingServicesBackNavProps) {
  return (
    <div className="sticky top-28 z-40 mb-8 w-fit max-w-full print:relative print:top-0">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800 shadow-md ring-1 ring-slate-900/5 backdrop-blur-md transition hover:border-primary/40 hover:bg-slate-100 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
        {label}
      </button>
    </div>
  );
}
