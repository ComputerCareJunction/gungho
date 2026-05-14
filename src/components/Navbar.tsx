import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/gungho-logo.png';
import servicesMegaFeaturedImg from '../assets/images/enery-week-goa/energy-1.png';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes, type MouseEvent } from 'react';
import en from '../locales/en.json';

const SCROLL_THRESHOLD_PX = 24;

type NavUnderlineState = { x: number; w: number; opacity: number };

type NavbarProps = {
  /** When true, nav pill is more translucent so a full-bleed home hero shows through. */
  isHome?: boolean;
};

export default function Navbar({ isHome = false }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > SCROLL_THRESHOLD_PX
  );
  const navTabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([null, null, null]);
  const [navLine, setNavLine] = useState<NavUnderlineState>({ x: 0, w: 0, opacity: 0 });

  const navItems = [
    { label: en.navigation.home, path: '/' },
    { label: en.navigation.about, path: '/about' },
  ];

  const serviceItems = [
    {
      label: en.navigation.eventManagement,
      path: '/event-management',
      summary: en.eventManagementPage.subtitle,
    },
    {
      label: en.navigation.marketingServices,
      path: '/marketing-services',
      summary: en.marketingServicesPage.subtitle,
    },
  ] as const;

  const featured = {
    path: '/event-management/exhibition-portfolio' as const,
    title: en.eventManagementPage.exhibitionPortfolio.cardTitle,
    imageAlt: en.navigation.servicesMegaFeaturedImageAlt,
  };

  const isActive = (path: string) => location.pathname === path;

  const isServicesNavActive = serviceItems.some(
    (item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
  );

  const getRestingTabEl = useCallback((): HTMLElement | null => {
    if (isServicesNavActive) return tabRefs.current[2];
    if (isActive('/about')) return tabRefs.current[1];
    if (isActive('/')) return tabRefs.current[0];
    return null;
  }, [location.pathname, isServicesNavActive]);

  const measureNavLine = useCallback((el: HTMLElement | null) => {
    const root = navTabsRef.current;
    if (!root || !el) {
      setNavLine((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const rr = root.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setNavLine({
      x: er.left - rr.left + root.scrollLeft,
      w: er.width,
      opacity: 1,
    });
  }, []);

  useLayoutEffect(() => {
    const el = getRestingTabEl();
    if (el) measureNavLine(el);
    else setNavLine((s) => ({ ...s, opacity: 0 }));
  }, [location.pathname, isScrolled, getRestingTabEl, measureNavLine]);

  useEffect(() => {
    const root = navTabsRef.current;
    if (!root || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      const el = getRestingTabEl();
      if (el) measureNavLine(el);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [getRestingTabEl, measureNavLine]);

  useEffect(() => {
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pillClass = [
    'relative z-50 flex flex-col overflow-visible rounded-[999px] border transition-[background-color,box-shadow,border-color,backdrop-filter,padding] duration-300 ease-out motion-reduce:transition-none',
    isHome
      ? isScrolled
        ? 'border-white/40 bg-white/45 py-2 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.14)] backdrop-blur-2xl backdrop-saturate-150 md:py-2.5'
        : 'border-white/35 bg-white/[0.22] py-2.5 shadow-[0_8px_32px_-10px_rgba(15,23,42,0.1)] backdrop-blur-2xl backdrop-saturate-[1.35] md:py-3'
      : isScrolled
        ? 'border-slate-200/90 bg-white py-2 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.18)] md:py-2.5'
        : 'border-white/60 bg-white/65 py-2.5 shadow-[0_8px_30px_-8px_rgba(15,23,42,0.12)] backdrop-blur-xl backdrop-saturate-150 md:py-3',
  ].join(' ');

  const linkBase =
    'relative z-[1] rounded-full px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:text-slate-950 md:px-4';

  const handleNavTabsMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (navTabsRef.current && next && navTabsRef.current.contains(next)) return;
    const rest = getRestingTabEl();
    if (rest) measureNavLine(rest);
    else setNavLine((s) => ({ ...s, opacity: 0 }));
  };

  return (
    <nav
      className="z-50 w-full max-md:fixed max-md:inset-x-0 max-md:top-0 max-md:pt-[env(safe-area-inset-top,0px)] md:sticky md:top-0 bg-transparent"
    >
      <div className="page-content-inset py-3 md:py-4">
        <div className="mx-auto max-w-6xl">
          <div className={pillClass}>
            <div className="flex min-h-[52px] items-center justify-between gap-3 px-3 sm:px-4 md:min-h-[56px] md:px-6">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex shrink-0 items-center gap-2 rounded-full outline-offset-4 hover:opacity-90 motion-reduce:transition-none transition-[opacity,transform] duration-300 ease-out"
              >
                <img
                  src={logo}
                  alt={en.navigation.logoAlt}
                  className={[
                    'w-auto motion-reduce:transition-none transition-[height] duration-300 ease-out',
                    isScrolled ? 'h-10 md:h-11' : 'h-11 md:h-14',
                  ].join(' ')}
                />
              </button>

              <div className="hidden min-w-0 flex-1 items-center justify-end gap-2 md:flex md:gap-1 lg:gap-2">
                <div
                  ref={navTabsRef}
                  className="relative flex flex-1 items-center justify-center gap-0.5 pb-1.5 lg:gap-1"
                  onMouseLeave={handleNavTabsMouseLeave}
                >
                  <span
                    className="pointer-events-none absolute bottom-0 left-0 z-0 h-[3px] rounded-full bg-gradient-to-r from-primary via-amber-400 to-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.42),0_0_8px_rgba(251,191,36,0.35)] transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity motion-reduce:duration-150"
                    style={{
                      width: Math.max(0, navLine.w),
                      transform: `translate3d(${navLine.x}px,0,0)`,
                      opacity: navLine.opacity,
                    }}
                    aria-hidden
                  />
                  {navItems.map((item, index) => (
                    <button
                      key={item.path}
                      ref={(el) => {
                        tabRefs.current[index] = el;
                      }}
                      type="button"
                      onClick={() => navigate(item.path)}
                      onMouseEnter={(ev) => measureNavLine(ev.currentTarget)}
                      className={`${linkBase} ${isActive(item.path) ? 'text-slate-950' : ''}`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div
                    className="relative z-[1]"
                    onMouseEnter={() => setIsServicesMenuOpen(true)}
                    onMouseLeave={() => setIsServicesMenuOpen(false)}
                  >
                    <button
                      ref={(el) => {
                        tabRefs.current[2] = el;
                      }}
                      type="button"
                      aria-expanded={isServicesMenuOpen}
                      aria-haspopup="true"
                      onClick={() => setIsServicesMenuOpen((prev) => !prev)}
                      onMouseEnter={(ev) => measureNavLine(ev.currentTarget)}
                      className={`${linkBase} inline-flex items-center gap-1.5 ${
                        isServicesNavActive ? 'text-slate-950' : ''
                      }`}
                    >
                      <span>{en.navigation.ourServices}</span>
                      <ChevronDown
                        className={[
                          'h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                          isServicesMenuOpen ? 'rotate-180' : '',
                        ].join(' ')}
                        aria-hidden
                      />
                    </button>
                    <div
                      {...(!isServicesMenuOpen ? ({ inert: true } as HTMLAttributes<HTMLDivElement>) : {})}
                      className={[
                        'absolute left-1/2 top-full z-[100] w-[min(56rem,calc(100vw-1.5rem))] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 pt-2',
                        isServicesMenuOpen ? 'pointer-events-auto' : 'pointer-events-none',
                      ].join(' ')}
                      aria-hidden={!isServicesMenuOpen}
                    >
                      <div
                        className={[
                          'overflow-hidden rounded-2xl transition-[clip-path] duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                          isServicesMenuOpen
                            ? '[clip-path:inset(0_0_0_0_round_1rem)]'
                            : '[clip-path:inset(0_0_100%_0_round_1rem)]',
                        ].join(' ')}
                      >
                        <div
                          className={[
                            'transition-[transform,opacity] duration-[480ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                            isServicesMenuOpen
                              ? 'translate-y-0 opacity-100'
                              : '-translate-y-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-0',
                          ].join(' ')}
                        >
                          <div className="flex justify-center drop-shadow-[0_1px_2px_rgba(249,115,22,0.12)]" aria-hidden>
                            <div className="h-0 w-0 border-x-[11px] border-x-transparent border-b-[11px] border-b-orange-50" />
                          </div>
                          <div className="-mt-px overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-b from-orange-50 via-orange-50 to-amber-50/90 shadow-[0_16px_48px_-12px_rgba(249,115,22,0.22),0_10px_30px_-10px_rgba(180,83,9,0.1)] ring-1 ring-primary/12">
                            <div className="flex flex-col lg:flex-row lg:items-stretch">
                              <div className="min-w-0 flex-1 bg-transparent p-6 sm:p-8 lg:max-w-none lg:pr-6">
                                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
                                  {en.navigation.servicesMegaEyebrow}
                                </p>
                                <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
                                  {serviceItems.map((item) => (
                                    <button
                                      key={item.path}
                                      type="button"
                                      onClick={() => {
                                        navigate(item.path);
                                        setIsServicesMenuOpen(false);
                                      }}
                                      className={`group relative w-full overflow-hidden rounded-2xl bg-primary/[0.06] px-1 py-2 text-left transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/[0.14] before:to-primary/[0.03] before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-0.5 hover:bg-primary/[0.1] hover:shadow-md hover:shadow-primary/20 hover:before:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-orange-50 active:translate-y-0 motion-reduce:transition-colors motion-reduce:hover:translate-y-0 ${
                                        isActive(item.path)
                                          ? 'bg-primary/[0.14] shadow-md shadow-primary/25 before:opacity-100'
                                          : ''
                                      }`}
                                    >
                                      <span className="relative block px-2 py-2">
                                        <span className="block text-base font-semibold text-stone-900 transition-colors duration-200 group-hover:text-primary">
                                          {item.label}
                                        </span>
                                        <span className="mt-2 block text-pretty text-sm leading-relaxed text-stone-600 transition-colors duration-200 group-hover:text-stone-700">
                                          {item.summary}
                                        </span>
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div
                                className="h-px w-full shrink-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent lg:hidden"
                                aria-hidden
                              />

                              <div className="flex shrink-0 flex-col bg-gradient-to-b from-primary/[0.12] via-orange-50 to-amber-50/80 p-6 sm:p-8 lg:w-[34%] lg:border-l lg:border-primary/15 lg:pl-8">
                                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
                                  {en.navigation.servicesMegaFeaturedEyebrow}
                                </p>
                                <div className="mt-6 flex min-h-0 flex-1 flex-col">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigate(featured.path);
                                      setIsServicesMenuOpen(false);
                                    }}
                                    className="group w-full rounded-xl text-left transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:opacity-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-orange-50 motion-reduce:hover:translate-y-0"
                                  >
                                    <div className="overflow-hidden rounded-xl border border-primary/15 bg-primary/[0.06] shadow-sm shadow-primary/15 transition-shadow duration-300 group-hover:border-primary/25 group-hover:bg-primary/[0.08] group-hover:shadow-md group-hover:shadow-primary/20">
                                      <img
                                        src={servicesMegaFeaturedImg}
                                        alt={featured.imageAlt}
                                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                      />
                                    </div>
                                    <span className="mt-4 block text-base font-semibold text-stone-900">
                                      {featured.title}
                                    </span>
                                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                                      {en.navigation.servicesMegaFeaturedCta}
                                      <span
                                        aria-hidden
                                        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                                      >
                                        →
                                      </span>
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 pl-1">
                  <button
                    type="button"
                    onClick={() => navigate('/contact')}
                    className="rounded-none bg-primary/15 px-6 py-2 font-semibold text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,transform] duration-300 ease-out hover:bg-primary/25 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)] motion-reduce:transition-none"
                  >
                    {en.navigation.contactUs}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-full p-2 text-slate-800 transition-colors hover:bg-slate-100/80 md:hidden"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {isMobileMenuOpen && (
              <div className="border-t border-slate-200/80 px-3 pb-3 pt-2 md:hidden">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {en.navigation.ourServices}
                </p>
                {serviceItems.map((item) => (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    navigate('/contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="mt-4 w-full rounded-none bg-primary/15 px-6 py-3 font-semibold text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)] backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-300 ease-out hover:bg-primary/25 motion-reduce:transition-none"
                >
                  {en.navigation.contactUs}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
