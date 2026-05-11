import Seo from "../../../components/Seo";
import en from "../../../locales/en.json";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy | Gung Ho"
        description="Read the Privacy Policy for Gung Ho and understand how we collect, use, and protect your information."
        path="/privacy-policy"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="page-content-inset py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {en.legalPages.privacyPolicy.title}
          </h1>
          <p className="text-white/70 mb-6">{en.legalPages.privacyPolicy.intro}</p>
          <div className="flex flex-wrap gap-6 text-sm text-white/60 mb-10">
            <p>
              {en.legalPages.effectiveDateLabel}: {en.legalPages.privacyPolicy.effectiveDate}
            </p>
            <p>
              {en.legalPages.lastUpdatedLabel}: {en.legalPages.privacyPolicy.lastUpdated}
            </p>
          </div>

          <div className="space-y-8">
            {en.legalPages.privacyPolicy.sections.map((section) => (
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
