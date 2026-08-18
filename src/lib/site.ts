export const SITE_URL = "https://keyboardtoolkit.site";
export const SITE_NAME = "Keyboard Toolkit";
export const SITE_TAGLINE = "Typing speed tests and keyboard diagnostics that run in your browser";
export const AUTHOR = "Faraz Ali Khan";
export const CONTACT_EMAIL = "REPLACE_WITH_MY_EMAIL";
export const ADSENSE_CLIENT = "ca-pub-REPLACE_WITH_MY_ID";
export const GOOGLE_SITE_VERIFICATION = "REPLACE_WITH_GSC_TOKEN";

export const ADSENSE_ENABLED =
  process.env.NODE_ENV === "production" && !ADSENSE_CLIENT.includes("REPLACE_WITH");
