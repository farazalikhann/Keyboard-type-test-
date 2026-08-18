# Manual To-Do List

Everything in this repo that only you can finish — a credential, an account, a DNS setting, or a decision that isn't mine to make. Grep the codebase for `REPLACE_WITH` at any time to find every placeholder still outstanding; this list explains what each one is and where it lives.

## 1. DNS records (domain migration)

Add these at your domain registrar for `keyboardtoolkit.site`:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
AAAA    @       2606:50c0:8000::153
AAAA    @       2606:50c0:8001::153
AAAA    @       2606:50c0:8002::153
AAAA    @       2606:50c0:8003::153
CNAME   www     farazalikhann.github.io
```

After DNS propagates and GitHub issues the TLS certificate (can take a few hours to a couple of days): go to the repo's **Settings → Pages** and enable **Enforce HTTPS**.

## 2. Your contact email

File: `src/lib/site.ts`
Constant: `CONTACT_EMAIL = "REPLACE_WITH_MY_EMAIL"`

Used on `/contact`, in the `mailto:` link, and referenced in the privacy policy and terms pages. Replace it with a real address you actually check — AdSense reviewers do click through to the contact page.

## 3. AdSense publisher ID

Two files need the same ID, in two different formats:

- `src/lib/site.ts` → `ADSENSE_CLIENT = "ca-pub-REPLACE_WITH_MY_ID"` (keep the `ca-` prefix)
- `public/ads.txt` → `pub-REPLACE_WITH_MY_ID` (no `ca-` prefix)

Get this ID by applying at [google.com/adsense](https://www.google.com/adsense) — see `ADSENSE-SUBMISSION.md` for the full walkthrough. Until this is a real ID, the site intentionally shows placeholder ad boxes and never loads the AdSense script (see `ADSENSE_ENABLED` in `lib/site.ts`), so there's no rush to fake this for local testing.

## 4. Google Search Console

1. Add `keyboardtoolkit.site` as a property in [Search Console](https://search.google.com/search-console).
2. Use the "HTML tag" verification method, copy the token out of the meta tag Google gives you (it looks like `content="abcdef123..."`), and paste just that token value into `src/lib/site.ts`:
   ```ts
   export const GOOGLE_SITE_VERIFICATION = "abcdef123...";
   ```
3. Once deployed, submit `https://keyboardtoolkit.site/sitemap.xml` under Sitemaps in Search Console.
4. Use the URL Inspection tool to request indexing for `/`, `/typing-test`, and `/keyboard-test` specifically — those three are worth prioritizing since they're the pages most likely to actually rank and drive traffic.

## 5. Bing Webmaster Tools

Bing (and Yahoo, which uses Bing's index) is worth the five minutes it takes:

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters) and add `keyboardtoolkit.site`.
2. Bing offers a one-click **import from Google Search Console** option once step 4 above is done — use that instead of verifying separately, it's faster.
3. Submit the same sitemap URL: `https://keyboardtoolkit.site/sitemap.xml`.

## 6. A certified Consent Management Platform (CMP)

The `ConsentBanner` component in this repo is a functional cookie banner, not a certified CMP. Before this site gets meaningful traffic from the EEA or UK:

1. In your AdSense account, go to **Privacy & messaging**.
2. Set up **Funding Choices** (Google's own certified CMP, free to use with AdSense) and follow its setup wizard — it'll give you a script snippet to add.
3. This is a decision only you can make the call on (whether/when to add a third-party script), which is why it wasn't wired in automatically — see the caveat in `ADSENSE-SUBMISSION.md` for why it matters.

## 7. Contact form endpoint (optional)

File: `src/app/contact/page.tsx`
Constant: `FORM_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_FORM_ID"`

The contact page works today via the `mailto:` link regardless of this. If you also want an in-page form:

1. Sign up at [formspree.io](https://formspree.io) (or any similar form-backend service) and create a form.
2. Replace `FORM_ENDPOINT` with the real endpoint URL it gives you.
3. The form is currently hidden (falls back to a note pointing at email) whenever the endpoint is still the placeholder, so nothing is broken by leaving this until later.

## 8. Decide on the per-page OG image follow-up

`public/og-image.png` is currently one shared graphic-only image for the whole site (see `SEO-CHECKLIST.md` for why `next/og` couldn't be used in this environment). If distinct per-page social preview images matter to you, the options are:

- Rebuild the project in a path with no spaces (the actual root cause), then re-add `app/opengraph-image.tsx` per route using `next/og`'s `ImageResponse`, or
- Add an image library (`sharp` or `@napi-rs/canvas`) as a dev dependency and extend `scripts/generate-icons.js` to rasterize per-page titles into PNGs at build time.

Neither is urgent — the current single OG image is a reasonable placeholder, just not differentiated per page.

## 9. Review the placeholder legal dates and jurisdiction

`src/app/terms/page.tsx` has a deliberately generic governing-law section ("the jurisdiction in which the site's operator resides") since that's a legal fact only you can supply. If you want a specific jurisdiction named, edit that section directly. The "last updated" dates across the legal pages (currently "March 2026") should be bumped whenever you actually change that page's content.
