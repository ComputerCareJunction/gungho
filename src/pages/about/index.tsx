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
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
        >
          <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-primary/25 blur-[100px]" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-sky-500/10 blur-[90px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:p-12 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
                  {en.aboutPage.ourStoryEyebrow}
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {en.aboutPage.ourStoryTitle}
                </h2>
                <div className="mt-10 space-y-8">
                  <p className="text-lg leading-relaxed text-white/80 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:leading-none sm:first-letter:text-6xl">
                    {en.aboutPage.ourStoryParagraph1}
                  </p>
                  <div className="relative pl-5 sm:pl-6">
                    <span
                      className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-gradient-to-b from-primary via-primary/60 to-primary/20"
                      aria-hidden
                    />
                    <p className="text-base sm:text-lg leading-relaxed text-white/75">
                      {en.aboutPage.ourStoryParagraph2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <aside className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 via-slate-900/60 to-slate-900/90 p-8 sm:p-9">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/20 blur-2xl"
                  aria-hidden
                />
                <h3 className="relative text-2xl font-bold text-white">
                  {en.aboutPage.whyChooseUs}
                </h3>
                <ul className="relative mt-6 space-y-4 text-white/75">
                  {en.aboutPage.whyChooseUsItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm sm:text-base leading-snug">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

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
