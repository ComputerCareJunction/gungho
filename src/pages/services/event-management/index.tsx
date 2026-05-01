import { Calendar, Users, Sparkles, Target } from 'lucide-react';
import en from '../../../locales/en.json';
import Seo from '../../../components/Seo';

export default function EventManagement() {
  const services = [
    {
      icon: <Calendar className="w-12 h-12" />,
      title: en.eventManagementPage.services.corporateEventsTitle,
      description: en.eventManagementPage.services.corporateEventsDescription
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: en.eventManagementPage.services.teamBuildingTitle,
      description: en.eventManagementPage.services.teamBuildingDescription
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: en.eventManagementPage.services.socialEventsTitle,
      description: en.eventManagementPage.services.socialEventsDescription
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: en.eventManagementPage.services.productLaunchesTitle,
      description: en.eventManagementPage.services.productLaunchesDescription
    }
  ];

  return (
    <>
      <Seo
        title={en.seo.eventManagementTitle}
        description={en.seo.eventManagementDescription}
        path="/event-management"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-8 py-12">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            {en.eventManagementPage.title}
          </h1>
          <p className="text-xl text-white/70">
            {en.eventManagementPage.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
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

        <div className="mt-16 bg-primary rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {en.eventManagementPage.ctaTitle}
          </h2>
          <p className="text-white/90 mb-6">
            {en.eventManagementPage.ctaSubtitle}
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
            {en.eventManagementPage.ctaButton}
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
