# Capy Plop house ads

`public/promos/capyplop-v1.json` is the native game's data-only catalog. `public/promos/index.html` previews every creative in a browser. The game does not load the preview HTML or run its JavaScript.

## Update an ad or add a published app

1. Confirm the App Store ID belongs to Randy Torres (developer ID 1871953838), is live in the intended storefront, and check its current age rating.
2. Copy the owned app icon to `public/promos/icons/<App Store ID>.png` (or `.jpg`). Keep it under 2 MB and preferably 512 × 512.
3. Add/edit the catalog entry: numeric `id`, `name` (up to 80 characters), `headline` (120), exactly three `beats` (160 each), `category` (40), `minimumAge` (4, 9, 12, 16 or 18), and an HTTPS artwork URL under `https://randyventures.com/promos/icons/`. Use truthful copy, without unverified pricing, health, income or performance claims.
4. `watchSeconds` may be 5–15; initial value is 8. Set `enabled` to false to stop new rewarded-ad offers after a successful refresh. Use `apps: []` to empty the catalog. Hiding/removing an ad must not remove earned game progress or a purchased Pass.
5. Build the site, review `/promos/` and the generated JSON/icons, then deploy through the normal site workflow. No iOS build is needed for compatible catalog edits. Do not change schemaVersion until a compatible app build is released.

The game's current rotation permits 4+ creatives only. HypeLap (12+) and Vault Runner (9+) have prepared creatives but are excluded. Treat a listing's age rating as a minimum check, and manually review creative suitability. Never use this feed to add third-party advertising, executable code, purchase gates or new game mechanics.

## Runtime and privacy

- Refresh at launch/foreground, at most once per hour per app process; use the last validated cached catalog or the bundled catalog offline. Apple/CDN caching can delay rollout. Already displayed ads retain their original creative and timer.
- Schema, size, count, ID, string length, timer and artwork-host checks run before a catalog is accepted. Invalid feeds leave the previous copy in place. App Store links are constructed from numeric IDs. No arbitrary click URL, HTML or JavaScript is accepted.
- The app keeps rotation/hidden-ad preferences locally. No ad impression, click, device identifier or gameplay event is sent to our servers. Optional App Store links now include an Apple provider token and campaign tag for aggregate attributed-download reports; they contain no player/device/run identifiers. The static site's host still receives ordinary requests (including IP addresses). The in-app privacy copy discloses these campaign links. Reassess privacy disclosures before adding any other analytics.
- Timer counts only foreground ad-view time and pauses under the report sheet. Skip/swipe dismissal is always available and earns no continue. The completed timer enables Continue; no App Store action is required. One continue per run, with an equivalent ad-free Pass continue. Unlimited fresh attempts remain free.
- Report uses the existing public site contact `rltorres26@gmail.com`, through user-controlled email/share UI. Hide is local and explicitly does not submit a report.

## App Review handoff

Document the catalog URL and optional rewarded flow in review notes. Disclose Advertising in age-rating answers and assess privacy labels against the final host/SDK behavior. This is a general-audience app, not a Kids Category implementation. If Kids Category is selected later, first add the required parental gates and reassess external links, purchases and ads.

Relevant Apple rules: 2.5.2 (downloaded code), 2.5.18 (ad labeling, close/skip, suitability and reporting), 3.2.2(x) (watching an ad may be rewarded, downloads/ratings/reviews cannot be required), and 3.1.1 (Pass uses IAP). Following these rules is not a guarantee of App Review approval.

Source catalog and age ratings were verified against Apple's public lookup for Randy Torres on 2026-10-25. The site's `src/data/apps.ts` supplies canonical existing portfolio identities and owned artwork. Recheck store availability and ratings before each addition.

## Apple campaign attribution

The top-level `campaignProviderToken` is **128485870**, verified in Randy Torres's App Store Connect campaign-link generator on 2026-10-25. This public token identifies the developer's campaign account; it is not an API secret or the developer-page ID. Reuse it for the portfolio's own apps.

Each app optionally sets `campaignToken` (1–25 ASCII letters, digits, underscores or hyphens), defaulting to `capyplop_<App Store ID>`. Native rewarded ads append `_ad`, Settings recommendations append `_more`, and this website preview appends `_web`. Final campaign names stay within Apple's 30-character limit. The product ID remains the catalog's verified numeric `id`; no arbitrary destination URL is accepted.

A new published app needs only a catalog entry and owned artwork. It inherits the shared provider token and a campaign base derived from its product ID, without a new iOS build. The initial native integration must first be installed; older clients ignore these optional fields. Keep schemaVersion 1 for compatible edits.

Reports are in the advertised app's App Store Connect → Analytics → Acquisition → Campaigns, or Metrics filtered by Campaign. Apple attributes first-time downloads within 24 hours after the link is used. Reporting has delays and minimum thresholds; blank metrics do not mean zero. Watches without a click are not attributed. No download, click, review or rating is required for the game reward.

Reference: https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links

## Bean Hunt catalog

`public/promos/beanhunt-v1.json` is Bean Hunt's separate data-only catalog. Keep the Capy Plop catalog and behavior unchanged. Bean Hunt ignores watchSeconds, accepts no remote executable code, and only displays eligible 4+ owned apps. Its small inline discovery card has immediate dismissal, local hiding and user-sent email reporting. Lifetime Premium and active legacy subscribers are ad-free.

Set enabled to false to disable Bean Hunt promotions. Foreground eligible clients refresh every minute and on foreground/reconnection. Offline, invalid or unavailable feeds suppress ads; there is no stale-feed fallback. Catalog updates cannot alter frequency limits, first-session exclusion, purchase gates, writing/directions behavior or app code. Maintain numeric Apple IDs and existing trusted artwork paths. Campaign bases use beanhunt_ and must leave room for the _discovery suffix within Apple's 30-character campaign limit (base maximum 20 characters). Verify each new entry is owned by Randy Torres and its current rating; only 4+ entries are shown by the current client.

The catalog and artwork are delivered over GitHub Pages. No per-person ad-view or click events are collected by Bean Hunt. The host receives ordinary connection information; the Bean Hunt privacy policy discloses that processing and optional shared App Store campaign tags.
