import { useNavigate } from 'react-router-dom';
import { Handshake } from 'lucide-react';
import en from '../../../locales/en.json';
import Seo from '../../../components/Seo';
import MarketingServicesBackNav from '../../../components/MarketingServicesBackNav';
import TradeActivationLiquorBlocks from '../../../components/TradeActivationLiquorBlocks';

const copy = en.marketingServicesPage.tradeActivationDetail;
const ta = en.marketingServicesPage.sections.tradeActivation;

export default function TradeActivationDetailPage() {
  const navigate = useNavigate();

  return (
    <>
      <Seo title={en.seo.tradeActivationTitle} description={en.seo.tradeActivationDescription} path="/marketing-services/trade-activation" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="page-content-inset py-10 pb-20 sm:py-12">
          <MarketingServicesBackNav label={copy.backLink} onBack={() => navigate('/marketing-services')} />

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
