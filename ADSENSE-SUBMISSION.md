# AdSense Submission Runbook

A step-by-step guide for actually applying, written against the state of this repo after the SEO/AdSense build.

## Before you apply

Don't apply until these are true:

1. **The domain is live and serving HTTPS.** Add the DNS records from the domain migration commit (four `A` records, optional `AAAA` records, one `CNAME` for `www`), wait for propagation (can take up to 24-48 hours), then enable "Enforce HTTPS" in the repo's Settings → Pages once GitHub issues the certificate.
2. **The site has been deployed with the real content**, not a half-finished state — push to `main`, let the GitHub Actions workflow run, and confirm `https://keyboardtoolkit.site` actually loads.
3. **You've replaced every placeholder** listed in `TODO-MANUAL.md` — most importantly the AdSense publisher ID and your contact email. AdSense reviewers do look at the privacy policy and contact page; a placeholder email or a broken `mailto:` link is an easy rejection reason.
4. **`ads.txt` is reachable** at `https://keyboardtoolkit.site/ads.txt` and contains your real `pub-` ID, not the placeholder.

## Step 1: Apply

1. Go to [google.com/adsense](https://www.google.com/adsense) and sign in with the Google account you want tied to the site.
2. Enter `keyboardtoolkit.site` as the site URL.
3. Select your country/territory and payment currency — this cannot be changed later without creating a new account, so get it right the first time.
4. Google will ask you to add either an HTML snippet to your `<head>` or verify via `ads.txt`. Since `ads.txt` is already wired up (`public/ads.txt`), once you've replaced the placeholder publisher ID and the site is live, the `ads.txt` method should verify automatically within a day or so of Google re-crawling.

## Step 2: Paste your publisher ID into the repo

Once AdSense gives you a publisher ID (format: `pub-XXXXXXXXXXXXXXXX`), update two places:

1. `src/lib/site.ts` — change `ADSENSE_CLIENT` from `"ca-pub-REPLACE_WITH_MY_ID"` to `"ca-pub-XXXXXXXXXXXXXXXX"` (keep the `ca-` prefix here; this constant is what the AdSense script tag uses).
2. `public/ads.txt` — change `pub-REPLACE_WITH_MY_ID` to `pub-XXXXXXXXXXXXXXXX` (no `ca-` prefix in this file — that's the correct, different format `ads.txt` expects).

Commit both changes together, push, and let the deploy workflow run.

## Step 3: Verify ads.txt after the ID is live

```bash
curl https://keyboardtoolkit.site/ads.txt
```

Confirm it returns exactly:

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Then check AdSense's own crawler status for `ads.txt` in the AdSense dashboard under Sites — it can take a few days for Google to re-crawl and clear any "ads.txt issue" warning, so don't panic if it's not instant.

## Step 4: Wait for review

Google's review can take anywhere from a few hours to a few weeks. During this time:

- Ad slots on the site will render as empty placeholder boxes (`AdSlot` shows the labeled dashed-border placeholder whenever `ADSENSE_CLIENT` is still a placeholder or the build isn't production) — this is expected and won't affect the review.
- Don't add a second ad network or any other monetization on top while under initial AdSense review; keep the site exactly as submitted.

## Common rejection reasons, and how this build already addresses them

| Reason | How this build addresses it |
|---|---|
| **Insufficient content / site is just a tool with no context** | Ten original 900–1500 word guides at `/blog`, plus 300+ words of genuine explanatory content on every one of the 12 tool pages. |
| **Missing or generic privacy policy** | `/privacy-policy` explicitly names AdSense, the DoubleClick DART cookie, the Google Ads Settings and aboutads.info opt-out links, localStorage usage, and GDPR/CCPA rights — written to match what the site actually does, not a boilerplate template. |
| **No way to contact the site owner** | `/contact` has a real `mailto:` link (once you fill in `CONTACT_EMAIL` in `lib/site.ts`) as the guaranteed-working method, plus an optional form if you wire up a Formspree-style endpoint. |
| **Navigation issues / pages that can't be found** | Every route is reachable within two clicks of the home page via the header Tools menu, the Guides link, or the footer. Sitemap and robots.txt are both live. |
| **Under construction / broken pages** | Full production build (`npm run build`), `tsc --noEmit`, and `next lint` all pass with zero errors; every new interactive tool was exercised in a real browser (Playwright) and verified to work, not just to render. |
| **Ads overlapping content, or placement that looks deceptive** | Ad slots are capped at 2–3 per page, always below the interactive tool, never adjacent to a typing input, keyboard grid, or test control, and completely absent from legal pages. |
| **Consent/cookie issues for EU traffic** | A functional consent banner blocks the AdSense script until accepted. This is **not** a certified CMP — see the note below and in `TODO-MANUAL.md` before relying on this for EEA/UK traffic at any real volume. |

## If you're rejected anyway

1. Read the specific reason in the rejection email carefully — Google usually names a category (content, navigation, ads.txt, etc.), not just "policy violation."
2. Check the AdSense Policy Center in your dashboard for the specific pages or issues flagged.
3. Fix the specific issue, wait at least a few days (don't resubmit within hours — it can look automated), and reapply from the same AdSense account rather than creating a new one.
4. If the reason cited is "low value content" despite the blog and tool content described above, it sometimes means Google hasn't fully crawled the new content yet — request indexing for the key pages in Google Search Console and wait a week before reapplying.

## The CMP caveat, stated plainly

Google requires a **Google-certified Consent Management Platform** (such as Funding Choices, which is Google's own free option) to serve ads compliantly to EEA and UK visitors under its EU User Consent Policy. The `ConsentBanner` built here is a genuine, functional gate — it really does block the ad script until the visitor accepts — but it is not a certified CMP and does not implement the IAB TCF consent string that ad exchanges expect from EU traffic. Before this site gets meaningful EEA/UK traffic, register a certified CMP (Funding Choices is free and integrates directly with AdSense) in your AdSense account under Privacy & messaging. Until then, traffic from those regions is a compliance risk, not just a missed-revenue one.
