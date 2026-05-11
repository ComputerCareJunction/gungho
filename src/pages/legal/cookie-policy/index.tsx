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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="page-content-inset py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {en.legalPages.cookiePolicy.title}
          </h1>
          <p className="text-white/70 mb-6">{en.legalPages.cookiePolicy.intro}</p>
          <div className="flex flex-wrap gap-6 text-sm text-white/60 mb-10">
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
