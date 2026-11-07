# Sousbook article: editorial and SEO review

Prepared October 11, 2026. Randall approved the final edits, commit, push and live publication in this conversation. Deployment and public readback are verified separately from preparation.

Article: `src/content/blog/sousbook-iphone-duo-recipe-book.mdx`
Intended URL after approved publication: `https://randyventures.com/blog/sousbook-iphone-duo-recipe-book/`

## Search intent and positioning

Primary query hypothesis: “iPhone Duo recipe app” / “iPhone Duo recipe book.”
Supporting phrases: “recipe organizer for iPhone,” “personal cookbook,” “scan printed recipes,” “offline recipe book,” and “iPhone Duo simulator Xcode 27.1.”

These are editorial targets inferred from competitor language and the actual product. No search-volume estimates, competitor ranking positions, backlink measurements or Search Console query data were obtained. Rankings and extra traffic are not established by this preparation.

Lead with the cooking benefit, then give the simulator setup its own section. The technical section answers a secondary intent without making the whole post a developer tutorial. The distinguishing evidence is real expanded/cover simulator screenshots and the documented fix for an unsaved scan draft lost on unfolding.

## Competitor evidence

The benchmark is successful App Store recipe apps and their verified developer websites. Reviewed official pages, not unverified comparison tables. No unsupported claims that competitors lack Duo, OCR, social import, privacy, offline access or cooking timers.

| Official source | Observed presentation | Application to our article |
| --- | --- | --- |
| [Paprika homepage](https://www.paprikaapp.com/) | Recipe manager language; web importing, meal planning, smart groceries and cooking tools; platform download routes and user guides. | Cover the underlying cooking tasks with concrete screenshots rather than a broad claim to be the best app. |
| [Paprika 4 open beta](https://paprikaapp.com/news/2026/09/28/paprika-4-is-now-in-open-beta/) | September 28 announcement includes scanning and social import. | Avoid stale claims that these are unique to Sousbook. |
| [Mela](https://mela.recipes/) | Live HTML title “Mela”; descriptive feature headings for imports, sync, cook mode, calendar and groceries. No description meta tag or JSON-LD block detected in fetched HTML. | Use a descriptive title, specific summary and existing BlogPosting metadata. Its missing tags do not establish a ranking weakness by themselves. |
| [Recipe Keeper](https://recipekeeperonline.com/) | Live title names the app and five platforms; description emphasizes collecting/organizing/sharing; headings address website imports, scanning, finding recipes and shopping. No JSON-LD block detected in fetched HTML. | Answer the same practical tasks in natural language, with a tighter focus on Duo. |

Mela and Recipe Keeper HTML fetched directly with curl. Paprika direct fetch returned HTTP 503; homepage content was available through web retrieval/search. That response is not evidence of a persistent availability or SEO problem. This is an on-page/content review, not a full technical or traffic audit.

## App Store traction and verified website identity

Apple's U.S. iTunes Lookup API read on October 11, 2026 supplied the following rating counts, averages and developer website (`sellerUrl`) matches. Rounded figures were also checked against the linked App Store listings; these remain research notes and are not displayed in the final article. This is an observable adoption/reputation signal, not proof of revenue, active users, downloads or website SEO success.

| App | U.S. ratings | Average, rounded | Verified developer website |
| --- | ---: | ---: | --- |
| [ReciMe](https://apps.apple.com/us/app/recime-recipes-meal-planner/id1593779280) | 309,909 | 4.8 | [recime.app](https://www.recime.app/) |
| [Paprika 3](https://apps.apple.com/us/app/paprika-recipe-manager-3/id1303222868) | 54,004 | 4.9 | [paprikaapp.com](https://www.paprikaapp.com/) |
| [Recipe Keeper](https://apps.apple.com/us/app/recipe-keeper/id974683711) | 30,809 | 4.8 | [recipekeeperonline.com](https://recipekeeperonline.com/) |
| [Crouton](https://apps.apple.com/us/app/crouton-recipe-manager/id1461650987) | 2,869 | 4.8 | [crouton.app](https://crouton.app/) |
| [Pestle](https://apps.apple.com/us/app/pestle-recipe-manager/id1574776971) | 1,816 | 4.7 | [pestlechef.app](https://pestlechef.app/) |

Primary benchmarks by rating volume: ReciMe, Paprika and Recipe Keeper. Additional close Apple-platform competitors: Crouton and Pestle. Mela remains a useful design/content reference; it was not selected as a primary traction benchmark. A lookup initially returned the Mac Mela listing, so its zero rating count was excluded rather than treated as iPhone performance.

Pestle's verified developer site is pestlechef.app. pestleapp.com and pestleai.com were not used as the website for Will Bishop's App Store app; similarly named sites are not enough to establish identity.

### Added website review

Direct HTML fetched with curl, alongside readable web retrieval:

- **ReciMe:** title “ReciMe | The Ultimate Cooking App”; description emphasizes collecting, organizing and cooking. Its page uses recipe-organizer language, grocery/meal-plan benefits, FAQs and a help-center link. The site claims 15m+ cooks; that is a developer claim and is not adopted as an independently verified user count. No JSON-LD block detected in fetched HTML.
- **Pestle:** title emphasizes saving recipes including Instagram; description connects saving, meal plans, shopping and guided cooking. Separate feature headings and a blog provide content routes. No JSON-LD block detected in fetched HTML.
- **Crouton:** title “Crouton”; heading identifies recipe organization and meal planning; features cover scanning, URL importing, iCloud and cooking timers. No description meta tag or JSON-LD block detected in fetched HTML. This observation does not imply poor ranking.

### SEO implication

Use the vocabulary of proven category demand: recipe organizer, save recipes, personal cookbook, scan recipes and cooking mode. Keep this article focused on the Duo use case and real screenshots. Randall clarified that competitor research should inform category search terms, not appear as competitor mentions or outbound links in the blog. Removed the entire public comparison, including rating snapshots and competitor links. The final article uses recipe organizer, recipe manager, personal cookbook, save recipes, scan printed recipes, recipe cards, grocery list and offline recipes naturally in its metadata, headings and copy. The article does not claim ranking superiority.

Potential follow-up articles, only after separate authorization and product verification: “How to scan recipe cards into an iPhone cookbook” and “What to look for in a recipe app for iPhone Duo.” Dedicated competitor-alternative pages would need meaningful comparisons and verified feature differences. No such pages were created in this task.

## Accuracy and source checks

- Local command readback: default Xcode 27.0 / 27A266a; separate `/Applications/Xcode copy.app` is Xcode 27.1 / 27A9275. A booted iPhone Duo exists on iOS 27.1.
- [Apple Duo developer page](https://developer.apple.com/iphone-duo/) currently highlights Xcode 27.1 Release Candidate.
- [Apple system requirements](https://developer.apple.com/xcode/system-requirements) list macOS Tahoe 26.6+ for 27.1 RC, and also list 27.2 beta 2. The article does not call 27.1 the latest Xcode overall.
- [Apple component installation documentation](https://developer.apple.com/documentation/xcode/downloading-and-installing-additional-xcode-components) supports the Settings → Components instructions. Installation history was not reconstructed; the article records the verified setup and documents the setup path.
- Current app README, cooking/adaptive-layout source, store description and `docs/qa/duo-latest/README.md` support the product and draft-preservation claims.
- Current release documentation describes final acceptance checks and no App Review submission. The article says nearly complete, gives no unverified download link, and promises no launch date.
- Optional Apple Intelligence cleanup is availability-dependent. No claim of video transcription, guaranteed iCloud delivery, physical Duo verification or entirely offline importing.
- Pro requirement, simulator origin and sample-data nature are disclosed.

## Images

Real source captures from Sousbook `marketing/store/2026-10/raw/`, documented as October 10 captures. No generated UI or fabricated physical-device photograph.

| Source | Article asset |
| --- | --- |
| `duo-inner/library.png` | `src/assets/sousbook/sousbook-iphone-duo-cookbook.webp` |
| `duo-inner/cooking.png` | `src/assets/sousbook/sousbook-iphone-duo-cooking-mode.webp` |
| `duo-inner/grocery.png` | `src/assets/sousbook/sousbook-iphone-duo-grocery-list.webp` |
| `duo-outer/library.png` | `src/assets/sousbook/sousbook-iphone-duo-cover-display.webp` |

WebP derivatives preserve the full display and aspect ratio. MDX uses Astro Image with responsive widths, intrinsic dimensions, descriptive alt text and lazy loading. Existing cover component loads the hero eagerly. One attempted newer QA image was black on inspection and was excluded.

## Publication and measurement

Local validation: `npm run build` passed. Generated HTML contains the canonical URL, article social metadata and BlogPosting schema. All four body images have alt text, dimensions, responsive sources and existing generated files. Internal links resolve; the article is present in local RSS, sitemap and search output. Browser inspection confirmed desktop rendering and no horizontal overflow at 390px. Local browser screenshots are review artifacts and are not part of the published site.

The approved source enters normal blog/RSS/sitemap generation when committed and deployed. Publish to master through the existing GitHub Pages workflow and verify the public URL after deployment.

Once approved and public, verify canonical URL, social image, image response codes, RSS and sitemap. Check Search Console indexing and compare impressions, clicks, click-through rate and actual queries after 14 and 28 days. Check product/contact engagement separately from page views. Traffic or ranking superiority has not been verified.

This article follows [Google's guidance on helpful original content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): answer a useful question with firsthand work and accurate sourcing. It uses BlogPosting schema already supplied by the site; no misleading Recipe, rating or award schema is added.
