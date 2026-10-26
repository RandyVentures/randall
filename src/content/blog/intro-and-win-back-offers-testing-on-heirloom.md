---
title: 'Intro Offers vs Win-Back Offers: What I''m Testing on Heirloom'
description: 'How introductory and win-back offers differ in App Store Connect, the rules Apple sets for each, and the two offers I''m testing on my subscription app Heirloom.'
pubDate: 'Oct 27 2026'
heroImage: '../../assets/offers-hero.svg'
tags: ['apps', 'building', 'strategy']
---

*Full disclosure: Heirloom is my app, so I have an interest in how these tests go. Everything about how the offers work comes from Apple's documentation, linked below. Everything about Heirloom is my own setup, and I haven't got results yet.*

I'm running two different subscription offers on [Heirloom](https://readheirloom.com), my app for reading old handwritten letters. People mix the two up, so here's how they differ, then what I'm testing.

## Intro offer vs win-back offer in one minute

| | Introductory offer | Win-back offer |
|---|---|---|
| Who it's for | New subscribers | People whose subscription lapsed |
| Limit per person | One per subscription group | Based on their most recent lapsed product |
| Set up per | Subscription | Subscription product |

The rules that matter, according to Apple's own help pages:

- **Intro offers are limited to one redemption per person per subscription group**, so they only work once on someone new ([Apple: introductory offers](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-introductory-offers-for-auto-renewable-subscriptions/)).
- **Win-back offers are for lapsed subscribers.** You choose who qualifies by how long they paid and how long ago they left, and customers are only eligible for their most recently lapsed product in a group. Your subscription has to be approved by App Review before you can create one ([Apple: win-back offers](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-win-back-offers/)).
- **You can run up to five win-back offers per storefront at a time on a subscription.** Eligible customers can see them in Manage Subscriptions on iOS 14.3 and later, and in an in-app sheet on iOS 18 and later (same page).

Apple's help pages change over time, so check them for the current limits before you rely on any number here.

## What I'm testing on Heirloom

**The intro offer.** Starting October 26, new subscribers get the first week of the weekly plan for $4.99 in the US, then it renews at $8.99 a week. The offer is set up across all 175 App Store regions, with Apple's regional pricing (for example £4.99 in the UK and €5.99 in Germany and France). It runs through December 15.

**The win-back offer.** Win-back offers start October 28 and also run through December 15. [CONFIRM: the win-back price and duration, and who qualifies, such as months lapsed and minimum time subscribed.]

## Why I'm testing these

[CONFIRM: your reason for each offer in your own words, such as lowering the barrier to a first purchase, and what you expect to happen.]

## How I'll judge them

[CONFIRM: the number you'll use for each. For example, intro trials started and how many are still subscribed after the first renewal, and how many lapsed subscribers come back from the win-back offer.]

I'll write a follow-up with the real numbers after the offers end on December 15, including the ones that didn't work.

## If you want to set these up yourself

1. Open your subscription in App Store Connect and add the introductory offer first. It's the simpler of the two.
2. Wait until the subscription is approved by App Review, then create a win-back offer on the subscription product.
3. Choose eligibility conservatively. A window that's too wide gives discounts to people who would have come back anyway.
4. Check the offer on a real device as a sandbox tester before you rely on it.

*I build and test these in public as part of getting my apps to a point where they pay for themselves. If you want to follow along, the [apps page](/apps/) and the [log](/blog/) are where I post updates.*
