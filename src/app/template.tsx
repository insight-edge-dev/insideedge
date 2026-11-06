"use client";

import { m } from "framer-motion";
import { useEffect, useState } from "react";

let hasNavigated = false;

/**
 * Page transition. The first load renders instantly (no delay to LCP); client-side
 * navigations get a short fade-up plus a yellow edge sweeping across the top.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);

  if (!animate) return <>{children}</>;

  return (
    <>
      <m.span
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-(--z-overlay) h-[3px] origin-left bg-edge"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ scaleX: { duration: 0.5, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.3, delay: 0.45 } }}
      />
      <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </m.div>
    </>
  );
}
