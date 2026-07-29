import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * This is a single-page app — navigating between routes doesn't trigger a
 * real browser page load, so the window just keeps whatever scroll position
 * it was already at. Without this, clicking a link near the bottom of one
 * page (e.g. "View All Articles" on the Home page) lands you at the same
 * scroll offset on the next page instead of at the top.
 *
 * Mounted once near the top of the app (see App.jsx). On every route change
 * it scrolls the window back to the top, matching normal multi-page site
 * behavior.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}