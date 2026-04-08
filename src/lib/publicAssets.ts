/** Local paths under /public; set NEXT_PUBLIC_* in deploy when large GIFs are not in the repo. */
export const NEXA_DEMO_GIF =
  process.env.NEXT_PUBLIC_NEXA_DEMO_GIF_URL ?? "/assets/nexa-demo.gif";
export const NEXA_LANDING_GIF =
  process.env.NEXT_PUBLIC_NEXA_LANDING_GIF_URL ?? "/assets/landing-pg-nexa.gif";
