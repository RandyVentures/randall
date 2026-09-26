---
title: 'What 47,000 App Store Impressions Taught Me About Conversion'
description: 'Seven months of daily App Store data across 12 apps shows a 46x gap between my best- and worst-converting listing — and it is not the app people assume.'
pubDate: 'Sep 08 2026'
tags: ['apps', 'building', 'business']
heroImage: '../../assets/hero-impressions-conversion.svg'
---

I have 18 apps in some stage of life on the App Store, 12 of them with enough history to actually learn from. None of them are hits. Puzzle games, a hydration reminder, a pickleball scoreboard, a coffee journal — small, useful, unglamorous.

For the last seven months I've been saving Apple's daily analytics reports instead of just glancing at them in App Store Connect. That turned out to matter more than I expected, because Apple only keeps a generated report instance available for about 35 days. Whatever you didn't capture is gone — there's an optional historical snapshot you can request once a month, but the day-by-day detail underneath it isn't something you can reconstruct later.

Here's the whole portfolio, February through early September, impressions to downloads:

| App | Impressions | Downloads | Conversion |
|---|---:|---:|---:|
| Bean Hunt | 5,667 | 659 | **11.63%** |
| Heirloom: Old Letter Reader | 800 | 17 | 2.13% |
| Pickleball Score Keeper: Rally | 11,557 | 172 | 1.49% |
| Fillin: Guess the Missing Word | 2,440 | 32 | 1.31% |
| Color Flood Conquest | 3,216 | 42 | 1.31% |
| FamilyStop: Family Restrooms | 3,632 | 39 | 1.07% |
| Vault Runner | 1,385 | 12 | 0.87% |
| Catalyst Chain Reaction | 5,147 | 38 | 0.74% |
| Gulp: Hydration App Blocker | 5,686 | 39 | 0.69% |
| Square Sweep | 983 | 5 | 0.51% |
| Rental Manager: Rent & Taxes | 2,264 | 6 | 0.27% |
| Fillbook: Trading Journal | 4,351 | 11 | 0.25% |
| **Total** | **47,128** | **1,072** | **2.27%** |

The thing that got me: Rally has the most impressions of any app in the portfolio — 11,557 — and converts at roughly an eighth of Bean Hunt's rate. Bean Hunt isn't even the most-seen app. It just closes.

For months I assumed my problem was reach. It isn't. These twelve listings were shown more than 47,000 times. The gap between the best listing and the worst is **46x**, and it has nothing to do with how many people saw the app.

That reframes the work completely. I was spending time on keyword lists and ASO reach — more impressions, more impressions, more impressions — when the actual lever was sitting in plain sight the whole time: the icon and the first two screenshots on the apps that get seen and ignored.

Bean Hunt's icon reads clearly at thumbnail size and the first screenshot shows the actual app doing the thing it does. A few of the others lead with a menu screen or a busier icon that doesn't resolve at a glance. As far as I can tell, that's most of the difference between 11% and under 1%.

## Why I even have this data

I only have seven months of this because I started saving the daily reports on purpose. The first stretch of each app's life, before I set that up, is just gone — Apple's window had already closed by the time I thought to keep it.

If you're running more than two or three apps, I'd set up daily capture before you want the comparison, not after. I ended up building [Manifest](https://usemanifest.net/) to do this for my own portfolio — it pulls the daily reports automatically and keeps them, so a missing day of history isn't a decision you have to remember to make in advance. No AI in it, no modeled estimates — every number on it is a sum or a ratio over what Apple actually reported, which is also just the report style I trust when I'm the one reading it at 11pm trying to figure out why a number moved.

## What I'm changing

Rally's icon and first screenshot are next. I'm not touching the app itself — just the two things a stranger sees before they decide whether to tap. I'll know within a few weeks whether that moves the 1.49% at all, and if it does, that's a cheap, repeatable lever across the rest of the portfolio that has nothing to do with writing more code.

I'll post the before-and-after once there's enough data to trust it.

*Correction, September 25, 2026: an earlier version of this post reported 58,208 impressions, 1,122 downloads, and a 60x gap. Part of my older history came from a script that counted some days more than once and filed Apple's weekly and monthly totals as if they were single days. Those days are now left out rather than guessed at, and every figure above is recalculated from Apple's daily reports. The biggest change was FamilyStop, whose impressions were mostly one monthly total. The conclusion holds: the gap is about conversion, not reach.*
