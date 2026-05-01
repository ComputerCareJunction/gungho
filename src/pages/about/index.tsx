import { Award, Target, Users, TrendingUp } from 'lucide-react';
import en from '../../locales/en.json';
import Seo from '../../components/Seo';

export default function About() {
  const values = [
    {
      icon: <Target className="w-12 h-12" />,
      title: en.aboutPage.values.missionTitle,
      description: en.aboutPage.values.missionDescription
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: en.aboutPage.values.excellenceTitle,
      description: en.aboutPage.values.excellenceDescription
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: en.aboutPage.values.clientFocusedTitle,
      description: en.aboutPage.values.clientFocusedDescription
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: en.aboutPage.values.innovationTitle,
      description: en.aboutPage.values.innovationDescription
    }
  ];

  const stats = [
    { number: en.aboutPage.stats.eventsManagedValue, label: en.aboutPage.stats.eventsManaged },
    { number: en.aboutPage.stats.happyClientsValue, label: en.aboutPage.stats.happyClients },
    { number: en.aboutPage.stats.yearsExperienceValue, label: en.aboutPage.stats.yearsExperience },
    { number: en.aboutPage.stats.teamMembersValue, label: en.aboutPage.stats.teamMembers }
  ];

  return (
    <>
      <Seo
        title={en.seo.aboutTitle}
        description={en.seo.aboutDescription}
        path="/about"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {en.aboutPage.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {en.aboutPage.subtitle}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 text-center shadow-xl"
            >
              <div className="text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">{en.aboutPage.ourStoryTitle}</h2>
            <p className="text-white/70 mb-4">
              {en.aboutPage.ourStoryParagraph1}
            </p>
            <p className="text-white/70 mb-4">
              {en.aboutPage.ourStoryParagraph2}
            </p>
            <p className="text-white/70">
              {en.aboutPage.ourStoryParagraph3}
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-8 border border-primary/30">
            <h3 className="text-2xl font-bold text-white mb-4">{en.aboutPage.whyChooseUs}</h3>
            <ul className="space-y-3 text-white/70">
              {en.aboutPage.whyChooseUsItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            {en.aboutPage.coreValuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-primary/50 transition-all"
              >
                <div className="text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
