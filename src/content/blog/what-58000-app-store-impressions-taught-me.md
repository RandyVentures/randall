---
title: 'What 58,000 App Store Impressions Taught Me About Conversion'
description: 'Seven months of daily App Store data across 12 apps shows a 60x gap between my best- and worst-converting listing — and it is not the app people assume.'
pubDate: 'Sep 08 2026'
tags: ['apps', 'building', 'business']
heroImage: '../../assets/hero-impressions-conversion.svg'
---

I have 18 apps in some stage of life on the App Store, 12 of them with enough history to actually learn from. None of them are hits. Puzzle games, a hydration reminder, a pickleball scoreboard, a coffee journal — small, useful, unglamorous.

For the last seven months I've been saving Apple's daily analytics reports instead of just glancing at them in App Store Connect. That turned out to matter more than I expected, because Apple only keeps a generated report instance available for about 35 days. Whatever you didn't capture is gone — there's an optional historical snapshot you can request once a month, but the day-by-day detail underneath it isn't something you can reconstruct later.

Here's the whole portfolio, February through early September, impressions to downloads:

| App | Impressions | Downloads | Conversion |
|---|---:|---:|---:|
| Bean Hunt | 5,986 | 681 | **11.38%** |
| Pickleball Score Keeper: Rally | 13,625 | 200 | 1.47% |
| Color Flood Conquest | 3,338 | 42 | 1.26% |
| Fillin: Guess the Missing Word | 3,188 | 32 | 1.00% |
| Vault Runner | 1,474 | 12 | 0.81% |
| Catalyst Chain Reaction | 5,208 | 38 | 0.73% |
| Gulp: Hydration App Blocker | 6,092 | 39 | 0.64% |
| Square Sweep | 1,007 | 5 | 0.50% |
| FamilyStop: Family Restrooms | 9,986 | 39 | 0.39% |
| Fillbook: Trading Journal | 4,348 | 11 | 0.25% |
| Rental Manager: Rent & Taxes | 3,157 | 6 | 0.19% |
| **Total** | **57,409** | **1,105** | **1.92%** |

The thing that got me: Rally has the second-most impressions in the entire portfolio — 13,625, more than double most of the others — and converts at under a fifth of Bean Hunt's rate. Bean Hunt isn't even the most-seen app. It just closes.

For months I assumed my problem was reach. It isn't. Nearly 60,000 people have seen these eleven listings. The gap between the best listing and the worst is **60x**, and it has nothing to do with how many people saw the app.

That reframes the work completely. I was spending time on keyword lists and ASO reach — more impressions, more impressions, more impressions — when the actual lever was sitting in plain sight the whole time: the icon and the first two screenshots on the apps that get seen and ignored.

Bean Hunt's icon reads clearly at thumbnail size and the first screenshot shows the actual app doing the thing it does. A few of the others lead with a menu screen or a busier icon that doesn't resolve at a glance. As far as I can tell, that's most of the difference between 11% and under 1%.

## Why I even have this data

I only have seven months of this because I started saving the daily reports on purpose. The first stretch of each app's life, before I set that up, is just gone — Apple's window had already closed by the time I thought to keep it.

If you're running more than two or three apps, I'd set up daily capture before you want the comparison, not after. I ended up building [Manifest](https://usemanifest.net/) to do this for my own portfolio — it pulls the daily reports automatically and keeps them, so a missing day of history isn't a decision you have to remember to make in advance. No AI in it, no modeled estimates — every number on it is a sum or a ratio over what Apple actually reported, which is also just the report style I trust when I'm the one reading it at 11pm trying to figure out why a number moved.

## What I'm changing

Rally's icon and first screenshot are next. I'm not touching the app itself — just the two things a stranger sees before they decide whether to tap. I'll know within a few weeks whether that moves the 1.47% at all, and if it does, that's a cheap, repeatable lever across the rest of the portfolio that has nothing to do with writing more code.

I'll post the before-and-after once there's enough data to trust it.
