/**
 * @fileoverview Google Analytics component for Next.js applications.
 * @see https://github.com/vercel/next.js/blob/canary/packages/third-parties/src/google/ga.tsx
 * @see https://nextjs.org/docs/app/api-reference/components/script
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Script from 'next/script';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Props used by `GoogleAnalytics` to initialize Google Analytics tracking on a Next.js application.
 */
export interface GoogleAnalyticsProps {
  /**
   * Google Analytics Measurement ID. (e.g., `'G-XXXXXXXXXX'`)
   */
  gaId: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Google Analytics component for Next.js applications.
 */
export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        id="_next-ga-init"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
`.trim(),
        }}
      />
      <Script id="_next-ga" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
    </>
  );
}
