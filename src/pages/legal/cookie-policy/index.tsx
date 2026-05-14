import Seo from "../../../components/Seo";
import en from "../../../locales/en.json";

export default function CookiePolicyPage() {
  return (
    <>
      <Seo
        title="Cookie Policy | Gung Ho"
        description="Read the Cookie Policy for Gung Ho to understand how cookies and tracking technologies are used on this site."
        path="/cookie-policy"
      />
      <div className="min-h-screen bg-white">
        <div className="page-content-inset py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {en.legalPages.cookiePolicy.title}
          </h1>
          <p className="text-slate-600 mb-6">{en.legalPages.cookiePolicy.intro}</p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-500 mb-10">
            <p>
              {en.legalPages.effectiveDateLabel}: {en.legalPages.cookiePolicy.effectiveDate}
            </p>
            <p>
              {en.legalPages.lastUpdatedLabel}: {en.legalPages.cookiePolicy.lastUpdated}
            </p>
          </div>

          <div className="space-y-8">
            {en.legalPages.cookiePolicy.sections.map((section) => (
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
