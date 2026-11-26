---
title: 'iPhone Duo App Store Screenshot Sizes, From Six Live Apps'
seoTitle: 'iPhone Duo App Store Screenshot Sizes (1398 × 2034, 2853 × 2007)'
description: 'iPhone Duo App Store screenshot sizes that App Store Connect accepted for six of my live apps: 1398 × 2034 outer, 2853 × 2007 or 2007 × 2853 inner, all in one set.'
pubDate: 'Nov 30 2026'
publishAt: '2026-11-30T08:00:00-06:00'
tags: ['apps', 'building', 'iphone-duo']
takeaways:
  - "The iPhone Duo has one screenshot set in App Store Connect (APP_IPHONE_DUO in the API). Outer and inner display screenshots go in the same set."
  - "Accepted sizes in my apps: 1398 × 2034 for the outer display, and 2853 × 2007 (landscape) or 2007 × 2853 (portrait) for the inner display."
  - "Those are the simulator's native screen sizes, so a full-resolution simulator screenshot uploads as is."
  - "A set with a single outer-display screenshot was accepted too, but showing the inner display is the point of having the set."
faqs:
  - q: "What size are iPhone Duo App Store screenshots?"
    a: "In my six live apps, App Store Connect accepted 1398 × 2034 pixels for the outer display and 2853 × 2007 pixels for the inner display in landscape. One app also used 2007 × 2853, the inner display in portrait. These match the screen sizes of Apple's iPhone Duo simulator."
  - q: "Are iPhone Duo outer and inner screenshots separate sets?"
    a: "No. There is one iPhone Duo screenshot set, called APP_IPHONE_DUO in the App Store Connect API. My apps mix outer-display and inner-display screenshots in that one set."
  - q: "How many iPhone Duo screenshots can I upload?"
    a: "App Store Connect allows up to 10 screenshots per set, and the iPhone Duo set holds both displays, so outer and inner shots share those 10 slots. My apps use between 1 and 6."
  - q: "How do I take iPhone Duo screenshots at the right size?"
    a: "Take them in the iPhone Duo simulator in Xcode 27.1 or later. Inner display screenshots come out at 2853 × 2007 in landscape. For the outer display, simctl screenshots came out black for me, so I capture the outer display with another tool. It comes out at 1398 × 2034."
---

**Quick answer:** the iPhone Duo gets **one** App Store screenshot set, and it holds both displays. App Store Connect accepted these sizes for my apps:

| Display | Size in pixels | Orientation |
|---|---|---|
| Outer display | **1398 × 2034** | Portrait |
| Inner display | **2853 × 2007** | Landscape |
| Inner display | **2007 × 2853** | Portrait |

These are the native sizes of the iPhone Duo's screens in Apple's simulator, so a full-resolution simulator screenshot uploads without resizing.

I've shipped iPhone Duo support in several of my apps, and each has an iPhone Duo screenshot set in App Store Connect. Instead of going from memory, I pulled every one of those sets from the App Store Connect API on November 26, 2026. Here's what Apple accepted.

## What six live apps use

All six apps below are live on the App Store, and every screenshot in these sets finished processing.

| App | Screenshots in the Duo set | Sizes used |
|---|---|---|
| [Lampleaf](/lampleaf/) (Bible) | 6 | 1398 × 2034 and 2853 × 2007 |
| [Beige Box](/blog/beige-box-tiny-retro-computers-iphone-duo/) (retro computers) | 5 | 1398 × 2034 and 2853 × 2007 |
| [Sousbook](/sousbook/) (recipes) | 4 | 2853 × 2007 and 1398 × 2034 |
| [Rise & Capy](/rise-and-capy/) (alarm clock) | 4 | 1398 × 2034 and 2853 × 2007 |
| [Capy Plop](/capy-plop/) (game) | 6 | 1398 × 2034 and 2007 × 2853 |
| [FamilyStop](https://apps.apple.com/app/id6782247307) (restroom finder) | 1 | 1398 × 2034 |

What that tells you:

- **Outer and inner shots share one set.** Five of the six apps mix both displays in the same set.
- **The inner display works in either orientation.** Capy Plop uses 2007 × 2853, the inner display held in portrait. The others use 2853 × 2007 in landscape, which is how the phone opens.
- **Outer-only is allowed.** FamilyStop's set has a single outer-display screenshot, and the version went live. Most people will see a Duo app's screenshots to decide whether it uses the big screen, though, so I'd always include the inner display.

## How many to upload

App Store Connect allows up to 10 screenshots per set. Because the Duo set holds both displays, outer and inner shots share those 10 slots. My apps use between 1 and 6.

My usual mix is one or two outer-display shots first, then three or four inner-display shots that show what the extra space does. For Lampleaf, that's the closed Bible cover on the outer display, then open spreads with Scripture on one page and a painting, notes or narration on the other.

## How to take them

The simplest route is the iPhone Duo simulator in Xcode 27.1 or later, because its screens are already the right size. My [guide to testing in the iPhone Duo simulator](/blog/how-to-test-your-app-in-the-iphone-duo-simulator/) covers setup and folding. For screenshots specifically:

- **Inner display:** a full-resolution screenshot is 2853 × 2007 in landscape. Rotate the simulator for the 2007 × 2853 portrait version.
- **Outer display:** `xcrun simctl io screenshot` came out black for me on the outer display. I capture it with a different screenshot tool instead, and it comes out at 1398 × 2034.
- **Check the status bar.** On both displays the time and status sit in an 84-point column down the right edge, not across the top. It's in your screenshots too, so leave room for it.

If you add captions or frames around your screenshots, keep the final file at exactly these pixel sizes. My [iPhone Duo screen sizes post](/blog/iphone-duo-screen-sizes-and-layout-notes-for-developers/) has the point sizes and safe areas if you're laying out a template.

## Uploading with the API

I upload with the App Store Connect API instead of dragging files in. The display type for the iPhone Duo set is `APP_IPHONE_DUO`. You create an `appScreenshotSets` entry with that display type, then upload each file to it, outer and inner shots alike. The rest of the flow (reserve, upload the parts, commit with a checksum) is the same as for any other screenshot set.

## What I haven't tested

- **Other sizes.** I've only used the three sizes above, so I can't tell you whether App Store Connect accepts anything else for the Duo set.
- **Whether the set is required.** These apps also have regular iPhone and iPad sets. I don't know what App Store Connect does if you support the Duo and skip its set.

*Sizes and counts were read from the App Store Connect API on November 26, 2026. Apple can change its screenshot requirements, so check App Store Connect's own screenshot specifications before you rely on them. iPhone is a trademark of Apple Inc.*
