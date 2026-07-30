import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const MEASUREMENT_ID = "G-5BZ3NSFXXM";

/**
 * Sends a GA4 page_view on initial load and on every client-side route change.
 * The gtag.js snippet lives in index.html with send_page_view disabled so that
 * SPA navigations are tracked exactly once here.
 */
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    const page_path = `${location.pathname}${location.search}${location.hash}`;

    window.gtag("event", "page_view", {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
      send_to: MEASUREMENT_ID,
    });
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default GoogleAnalytics;
