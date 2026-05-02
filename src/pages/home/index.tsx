import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/gungho-logo.png';
import en from '../../locales/en.json';
import Seo from '../../components/Seo';
import HomeClientele from '../../components/HomeClientele';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Seo
        title={en.seo.homeTitle}
        description={en.seo.homeDescription}
        path="/"
      />
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/10 blur-3xl home-anim-delay-1s" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-700/20 blur-3xl" />

          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]"
            aria-hidden
          />

          <div
            className="animate-float absolute left-10 top-20 h-20 w-20 rotate-12 rounded-lg border border-primary/20"
            aria-hidden
          />
          <div
            className="animate-float-delayed absolute bottom-40 right-20 h-16 w-16 rounded-full border border-primary/20"
            aria-hidden
          />
          <div
            className="animate-float absolute right-1/4 top-1/3 h-12 w-12 rotate-45 rounded-lg border border-white/10"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex flex-col gap-24 sm:gap-32 md:gap-40">
          <div className="flex items-center justify-center pb-16 sm:pb-20 md:pb-24">
            <div className="flex w-full max-w-7xl flex-col items-stretch gap-6 px-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
              <button
                type="button"
                onClick={() => navigate('/event-management')}
                className="group relative flex-1 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:bg-white/15 hover:shadow-primary/30 sm:p-10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/50 to-primary/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

                <div className="relative z-10 text-left">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/20">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="mb-3 text-xl font-bold leading-tight text-white md:text-2xl">
                    {en.home.leftCardTitle}
                  </h2>
                  <div className="mt-8 flex items-center gap-2 font-semibold text-primary">
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      {en.home.exploreServices}
                    </span>
                    <svg
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-gradient-to-br from-primary/20 to-transparent opacity-50" aria-hidden />
              </button>

              <div className="mx-auto flex shrink-0 lg:mx-0">
                <div className="group relative">
                  <div className="relative rounded-[2rem] border border-white/30 bg-white/15 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-primary/20 sm:p-10">
                    <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-primary/30 to-white/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
                    <div className="relative rounded-3xl bg-white p-8 shadow-xl">
                      <img src={logo} alt={en.navigation.logoAlt} className="h-auto w-64 max-w-full" />
                    </div>
                    <div className="absolute -left-2 -top-2 h-8 w-8 rounded-full border-2 border-primary/50" aria-hidden />
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-2 border-primary/50" aria-hidden />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/marketing-services')}
                className="group relative flex-1 overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:bg-white/15 hover:shadow-primary/30 sm:p-10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/50 to-slate-500/50 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

                <div className="relative z-10 text-left">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/20">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h2 className="mb-3 text-xl font-bold leading-tight text-white md:text-2xl">
                    {en.home.rightCardTitle}
                  </h2>
                  <div className="mt-8 flex items-center gap-2 font-semibold text-primary">
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      {en.home.exploreServices}
                    </span>
                    <svg
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-full bg-gradient-to-tl from-primary/20 to-transparent opacity-50" aria-hidden />
              </button>
            </div>
          </div>

          <HomeClientele />
        </div>
      </div>
    </>
  );
}
