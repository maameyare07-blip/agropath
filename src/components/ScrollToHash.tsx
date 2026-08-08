import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles scrolling when navigating to a route with a hash (e.g. "/#about")
 * and resets scroll position on plain route changes.
 */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // Wait a frame so the target section is mounted before scrolling.
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
