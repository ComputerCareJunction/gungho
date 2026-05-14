import { Award, Target, Users, TrendingUp } from 'lucide-react';
import en from '../../locales/en.json';
import Seo from '../../components/Seo';
import treeOurStoryImg from '../../assets/images/tree-our-story.png';

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

  return (
    <>
      <Seo
        title={en.seo.aboutTitle}
        description={en.seo.aboutDescription}
        path="/about"
      />
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/90 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="page-content-inset relative text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {en.aboutPage.title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {en.aboutPage.subtitle}
          </p>
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
        <div className="page-content-inset relative">
          <p className="sr-only">{en.aboutPage.ourStoryTreeImageAlt}</p>
          <article className="relative w-full overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-black/25 ring-1 ring-primary/15">
            <img
              src={treeOurStoryImg}
              alt=""
              width={1200}
              height={1500}
              loading="lazy"
              decoding="async"
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full scale-[1.08] object-cover object-center brightness-[1.08] contrast-[1.05] saturate-[1.08]"
            />
            {/* Light scrim so the tree stays visible; darker at edges for contrast */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950/58 via-slate-950/28 to-slate-950/62"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/40"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-10 top-1/3 h-48 w-48 rounded-full bg-primary/12 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              aria-hidden
            />
            <div className="relative z-10">
              <div className="p-8 sm:p-10 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">
                  {en.aboutPage.ourStoryEyebrow}
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.85),0_1px_2px_rgba(0,0,0,0.9)] sm:text-5xl">
                  {en.aboutPage.ourStoryTitle}
                </h2>
                <div className="mt-10 space-y-8">
                  <p className="text-lg leading-relaxed text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.82)] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:leading-none first-letter:[text-shadow:0_2px_16px_rgba(0,0,0,0.75)] sm:first-letter:text-6xl">
                    {en.aboutPage.ourStoryParagraph1}
                  </p>
                  <div className="relative pl-5 sm:pl-6">
                    <span
                      className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-gradient-to-b from-primary via-primary/60 to-primary/20"
                      aria-hidden
                    />
                    <p className="text-base leading-relaxed text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.8)] sm:text-lg">
                      {en.aboutPage.ourStoryParagraph2}
                    </p>
                  </div>
                  <ul className="mt-10 list-none space-y-3.5 sm:space-y-4">
                    {en.aboutPage.ourStoryPoints.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-sm leading-snug text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.75)] sm:text-base sm:leading-relaxed"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_rgba(249,115,22,0.45)]"
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className="bg-gradient-to-b from-slate-950/35 to-slate-950/50 px-8 py-10 sm:px-10 sm:py-11 lg:px-12 lg:py-12"
                aria-labelledby="about-why-choose-heading"
              >
                <h3
                  id="about-why-choose-heading"
                  className="text-2xl font-bold text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.85)]"
                >
                  {en.aboutPage.whyChooseUs}
                </h3>
                <ul className="mt-6 space-y-4 text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.78)]">
                  {en.aboutPage.whyChooseUsItems.map((item) => (
                    <li key={item} className="flex gap-3 text-sm sm:text-base leading-snug">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/25 text-xs font-bold text-primary"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Values Section */}
      <div className="bg-slate-50 py-20">
        <div className="page-content-inset">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-12">
            {en.aboutPage.coreValuesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:border-primary/40 hover:bg-slate-100 transition-all shadow-sm"
              >
                <div className="text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600">
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
