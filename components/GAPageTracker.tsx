"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Sends a GA4 pageview on every client-side route change. The base gtag
// config in the root layout only fires for the first page a visitor lands
// on; without this tracker, moving between pages inside the app would be
// invisible in Google Analytics.
export default function GAPageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag === "function") {
      w.gtag("config", "G-SLYHWKH165", { page_path: pathname });
    }
  }, [pathname]);

  return null;
}
