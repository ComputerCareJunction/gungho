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
      <div className="min-h-screen bg-white">
        <div className="page-content-inset py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {en.legalPages.termsOfService.title}
          </h1>
          <p className="text-slate-600 mb-6">{en.legalPages.termsOfService.intro}</p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-500 mb-10">
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
                className="rounded-xl border border-slate-200 bg-slate-50 p-6"
              >
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">{section.heading}</h2>
                <p className="text-slate-600 leading-relaxed">{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
