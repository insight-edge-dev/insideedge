import Script from "next/script";
import { analyticsConfig, CONSENT_STORAGE_KEY } from "@/config/analytics";
import { ConsentManager } from "./ConsentManager";
import { AnalyticsListener } from "./AnalyticsListener";

/**
 * Google tags load with Consent Mode v2 defaults set to "denied"; they only set
 * cookies once the visitor accepts. Meta Pixel and Clarity are not loaded at all
 * until consent is given (handled in ConsentManager).
 */
export function Analytics() {
  const { gtmId, gaId } = analyticsConfig;
  const hasGoogle = Boolean(gtmId || gaId);

  const consentInit = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{var c=JSON.parse(localStorage.getItem('${CONSENT_STORAGE_KEY}')||'null');if(c){var m=c.marketing?'granted':'denied';gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:m,ad_user_data:m,ad_personalization:m});}}catch(e){}
${gtmId ? `(function(w,d,s,l,i){w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');` : ""}
${!gtmId && gaId ? `gtag('js',new Date());gtag('config','${gaId}');` : ""}
`;

  return (
    <>
      {hasGoogle && (
        <Script id="google-consent-init" strategy="afterInteractive">
          {consentInit}
        </Script>
      )}
      {!gtmId && gaId && (
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      )}
      <ConsentManager />
      <AnalyticsListener />
    </>
  );
}
