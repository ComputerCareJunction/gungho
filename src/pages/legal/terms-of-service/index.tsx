import Seo from "../../../components/Seo";
import en from "../../../locales/en.json";

export default function TermsOfServicePage() {
  return (
    <>
      <Seo
        title="Terms of Service | Gung Ho"
        description="Read the Terms of Service governing the use of the Gung Ho website and services."
        path="/terms-of-service"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {en.legalPages.termsOfService.title}
          </h1>
          <p className="text-white/70 mb-6">{en.legalPages.termsOfService.intro}</p>
          <div className="flex flex-wrap gap-6 text-sm text-white/60 mb-10">
            <p>
              {en.legalPages.effectiveDateLabel}: {en.legalPages.termsOfService.effectiveDate}
            </p>
            <p>
              {en.legalPages.lastUpdatedLabel}: {en.legalPages.termsOfService.lastUpdated}
            </p>
          </div>

          <div className="space-y-8">
            {en.legalPages.termsOfService.sections.map((section) => (
              <section
                key={section.heading}
                className="rounded-xl border border-slate-700 bg-slate-800/40 p-6"
              >
                <h2 className="text-2xl font-semibold text-white mb-3">{section.heading}</h2>
                <p className="text-white/70 leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
