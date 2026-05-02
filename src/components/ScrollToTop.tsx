import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls the window to the top whenever the route pathname changes (cards, nav links, buttons). */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
