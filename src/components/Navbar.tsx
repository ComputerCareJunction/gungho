import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/gungho-logo.png';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import en from '../locales/en.json';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);

  const navItems = [
    { label: en.navigation.home, path: '/' },
    { label: en.navigation.about, path: '/about' },
  ];

  const serviceItems = [
    { label: en.navigation.eventManagement, path: '/event-management' },
    { label: en.navigation.marketingServices, path: '/marketing-services' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
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
                className={`absolute left-0 top-full min-w-56 pt-2 ${
                  isServicesMenuOpen ? 'block' : 'hidden'
                }`}
              >
                <div className="rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-xl">
                {serviceItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsServicesMenuOpen(false);
                    }}
                    className={`block w-full rounded-md px-3 py-2 text-left transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary/20 text-primary'
                        : 'text-white/70 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
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
