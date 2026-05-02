import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Handshake } from 'lucide-react';
import en from '../../../locales/en.json';
import Seo from '../../../components/Seo';
import TradeActivationLiquorBlocks from '../../../components/TradeActivationLiquorBlocks';

const copy = en.marketingServicesPage.tradeActivationDetail;
const ta = en.marketingServicesPage.sections.tradeActivation;

export default function TradeActivationDetailPage() {
  const navigate = useNavigate();

  return (
    <>
      <Seo title={en.seo.tradeActivationTitle} description={en.seo.tradeActivationDescription} path="/marketing-services/trade-activation" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-10 pb-20 sm:px-8 sm:py-12">
          <button
            type="button"
            onClick={() => navigate('/marketing-services')}
            className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-slate-800/80 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:border-primary/40 hover:bg-slate-800 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            {copy.backLink}
          </button>

          <header className="mb-10 border-b border-white/10 pb-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 text-primary">
              <Handshake className="h-7 w-7" aria-hidden />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">{ta.heading}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/75">{ta.body}</p>
            {copy.pageLead ? <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/60">{copy.pageLead}</p> : null}
          </header>

          <TradeActivationLiquorBlocks />
        </div>
      </div>
    </>
  );
}
