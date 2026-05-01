import { TrendingUp, Megaphone, BarChart3, Lightbulb } from 'lucide-react';
import en from '../../../locales/en.json';
import Seo from '../../../components/Seo';

export default function MarketingServices() {
  const services = [
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: en.marketingServicesPage.services.digitalMarketingTitle,
      description: en.marketingServicesPage.services.digitalMarketingDescription
    },
    {
      icon: <Megaphone className="w-12 h-12" />,
      title: en.marketingServicesPage.services.brandDevelopmentTitle,
      description: en.marketingServicesPage.services.brandDevelopmentDescription
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: en.marketingServicesPage.services.marketResearchTitle,
      description: en.marketingServicesPage.services.marketResearchDescription
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: en.marketingServicesPage.services.contentStrategyTitle,
      description: en.marketingServicesPage.services.contentStrategyDescription
    }
  ];

  return (
    <>
      <Seo
        title={en.seo.marketingServicesTitle}
        description={en.seo.marketingServicesDescription}
        path="/marketing-services"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-8 py-12">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            {en.marketingServicesPage.title}
          </h1>
          <p className="text-xl text-white/70">
            {en.marketingServicesPage.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/50 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-white/70">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl p-8 text-center border border-primary/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            {en.marketingServicesPage.ctaTitle}
          </h2>
          <p className="text-white/90 mb-6">
            {en.marketingServicesPage.ctaSubtitle}
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            {en.marketingServicesPage.ctaButton}
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
