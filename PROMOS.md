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
- The app keeps rotation/hidden-ad preferences locally. No ad impression, click, device identifier or gameplay event is sent. The static site's host still receives ordinary requests (including IP addresses). Do not add analytics or tracking query parameters without revisiting privacy disclosures and consent.
- Timer counts only foreground ad-view time and pauses under the report sheet. Skip/swipe dismissal is always available and earns no continue. The completed timer enables Continue; no App Store action is required. One continue per run, with an equivalent ad-free Pass continue. Unlimited fresh attempts remain free.
- Report uses the existing public site contact `rltorres26@gmail.com`, through user-controlled email/share UI. Hide is local and explicitly does not submit a report.

## App Review handoff

Document the catalog URL and optional rewarded flow in review notes. Disclose Advertising in age-rating answers and assess privacy labels against the final host/SDK behavior. This is a general-audience app, not a Kids Category implementation. If Kids Category is selected later, first add the required parental gates and reassess external links, purchases and ads.

Relevant Apple rules: 2.5.2 (downloaded code), 2.5.18 (ad labeling, close/skip, suitability and reporting), 3.2.2(x) (watching an ad may be rewarded, downloads/ratings/reviews cannot be required), and 3.1.1 (Pass uses IAP). Following these rules is not a guarantee of App Review approval.

Source catalog and age ratings were verified against Apple's public lookup for Randy Torres on 2026-10-25. The site's `src/data/apps.ts` supplies canonical existing portfolio identities and owned artwork. Recheck store availability and ratings before each addition.
