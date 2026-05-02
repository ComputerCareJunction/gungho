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
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 py-12 sm:py-14">
        <div className="flex w-full max-w-7xl flex-col items-stretch gap-8 px-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        {/* Left Side - Event Management Button */}
        <button
          onClick={() => navigate('/event-management')}
          className="flex-1 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90 p-8 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-primary/50"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
              {en.home.leftCardTitle}
            </h2>
            <div className="mt-6 flex items-center justify-center">
              <span className="text-white/80 transition-transform duration-300 group-hover:translate-x-2">
                {en.home.exploreServicesCta}
              </span>
            </div>
          </div>
        </button>

        {/* Center - Logo */}
        <div className="mx-auto flex-shrink-0 lg:mx-0">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <img
              src={logo}
              alt={en.navigation.logoAlt}
              className="w-64 h-auto"
            />
          </div>
        </div>

        {/* Right Side - Marketing Services Button */}
        <button
          onClick={() => navigate('/marketing-services')}
          className="flex-1 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90 p-8 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-primary/50"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
              {en.home.rightCardTitle}
            </h2>
            <div className="mt-6 flex items-center justify-center">
              <span className="text-white/80 transition-transform duration-300 group-hover:translate-x-2">
                {en.home.exploreServicesCta}
              </span>
            </div>
          </div>
        </button>
        </div>
      </div>
      <HomeClientele />
    </>
  );
}
