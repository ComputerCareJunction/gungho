import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/gungho-logo.png';
import { Menu, X, PartyPopper, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import en from '../locales/en.json';

const SCROLL_GLASS_THRESHOLD_PX = 16;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > SCROLL_GLASS_THRESHOLD_PX
  );

  const navItems = [
    { label: en.navigation.home, path: '/' },
    { label: en.navigation.about, path: '/about' },
  ];

  const serviceItems = [
    {
      label: en.navigation.eventManagement,
      path: '/event-management',
      icon: PartyPopper,
      summary: en.eventManagementPage.subtitle,
    },
    {
      label: en.navigation.marketingServices,
      path: '/marketing-services',
      icon: Sparkles,
      summary: en.marketingServicesPage.subtitle,
    },
  ] as const;

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_GLASS_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={[
        'sticky top-0 z-50 border-b transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none',
        isScrolled
          ? 'border-white/10 bg-slate-950/50 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150'
          : 'border-slate-800 bg-slate-900',
      ].join(' ')}
    >
      <div className="page-content-inset py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt={en.navigation.logoAlt} className="h-16 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative px-4 py-2 transition-colors ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
            <div
              className="relative group"
              onMouseEnter={() => setIsServicesMenuOpen(true)}
              onMouseLeave={() => setIsServicesMenuOpen(false)}
            >
              <button
                onClick={() => setIsServicesMenuOpen((prev) => !prev)}
                className={`relative px-4 py-2 transition-colors ${
                  serviceItems.some((item) => isActive(item.path))
                    ? 'text-primary'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {en.navigation.ourServices}
                {serviceItems.some((item) => isActive(item.path)) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <div
                className={`absolute left-0 top-full pt-3 ${
                  isServicesMenuOpen ? 'block' : 'hidden'
                }`}
              >
                <div className="w-[420px] rounded-2xl border border-slate-700 bg-slate-900/95 p-3 shadow-2xl ring-1 ring-black/60 backdrop-blur-md">
                  <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                    Our services at a glance
                  </div>
                  <div className="space-y-1.5">
                    {serviceItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => {
                            navigate(item.path);
                            setIsServicesMenuOpen(false);
                          }}
                          className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                            isActive(item.path)
                              ? 'bg-primary/15 text-primary'
                              : 'text-white/80 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          <span className="flex-1">
                            <span className="block text-sm font-semibold">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-white/60 line-clamp-2">
                              {item.summary}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/contact')}
            className="hidden md:block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            {en.navigation.contactUs}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-white/70 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-2">
              <p className="px-4 py-2 text-xs uppercase tracking-wide text-white/40">
                {en.navigation.ourServices}
              </p>
              {serviceItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-white/70 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                navigate('/contact');
                setIsMobileMenuOpen(false);
              }}
              className="w-full mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
            >
              {en.navigation.contactUs}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
