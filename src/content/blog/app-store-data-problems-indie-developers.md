---
title: 'The App Store Data Problems Indie Developers Learn the Hard Way'
description: 'A download is not a customer, a pending report is not a zero, and an available platform is not a verified launch. The category mistakes that make App Store data look broken when it is working fine.'
pubDate: 'Sep 20 2026'
tags: ['apps', 'building', 'business']
---

I have built enough apps to learn that App Store data rarely tells one clean story.

App Store Connect may show a download. RevenueCat may show no customer. A new app may exist in Apple's system but not appear in an analytics dashboard. A report may show zero when the real answer is that Apple has not produced the data yet.

These are not edge cases. They are normal problems when you are an indie developer trying to understand what is happening across a growing app portfolio.

## A download is not a customer

One of the clearest examples came from While We're Here.

After the app went live, I compared App Store Connect downloads with RevenueCat customers. The numbers did not line up, which initially looked like a tracking problem.

The important distinction was that the two systems were measuring different events.

App Store Connect can record that an app was downloaded. RevenueCat begins to know about a customer when the app opens and initializes its purchase-tracking code. That customer may never view a paywall, start a trial, or make a purchase.

In a controlled check, opening the public build created a new RevenueCat customer without creating a purchase or entitlement. That was useful evidence because it showed RevenueCat was receiving the app launch, while also confirming that a download did not automatically mean a paying customer.

The conclusion was simple: **a download is not a customer, and a customer is not a subscriber.**

Those distinctions matter when evaluating an app. If I compare Apple downloads directly with RevenueCat customers, I can accidentally diagnose a healthy difference as a broken integration.

## App Store Connect and RevenueCat answer different questions

App Store Connect is useful for understanding discovery and acquisition. It helps answer:

- How many people saw the product page?
- How many downloaded the app?
- Which storefront or platform generated activity?
- Did a listing update change visibility or conversion?

RevenueCat is useful for understanding subscription activity. It answers different questions:

- Did the app create a customer profile?
- Is someone trialing?
- Is someone subscribed?
- Which entitlement is active?
- Is revenue appearing in the subscription system?

Neither source replaces the other.

When I want to understand the full path from impression to revenue, I need to preserve the boundaries between the systems. Otherwise a download can look like a customer, a customer can look like a subscriber, and missing reports can look like zero demand.

## A new app does not automatically become a tracked app

Another problem appears before the analytics even begin.

A newly created app can exist in App Store Connect without being included in the hosted reporting workflow I use for my portfolio. I ran into this with newer apps, including Glora and While We're Here.

The app was real. The Apple account was real. But the app still needed to be explicitly selected and tracked before it became eligible for the scheduled sync.

That distinction is easy to miss, because "discoverable" sounds like "included." In practice there are separate steps:

1. Find the available apps from App Store Connect.
2. Select the app to track.
3. Wait for Apple's reports to become available.
4. Pull the data on the scheduled sync.
5. Review the result in the correct context.

This is one reason [Manifest](https://usemanifest.net/) treats app discovery and app tracking as separate parts of the workflow. Listing every app on the account and choosing which ones to track are deliberately different actions, so it stays obvious which apps are available, which are being tracked, and which are still waiting on Apple.

## "Waiting on Apple" is not the same as zero

One of the most dangerous analytics mistakes is turning unavailable data into a zero.

A new app may not have its first ongoing report yet. A particular report may be delayed. Subscription data may take time to appear after a launch. A dashboard that fills every empty field with `0` creates a very confident-looking wrong answer.

For an indie developer that leads to bad decisions. If downloads are really zero, distribution needs attention. If the data is still pending, the correct action is to wait and check again. Those are completely different situations, and they look identical on a dashboard that does not separate them.

The categories worth keeping apart:

- A reported zero — Apple measured it, and it was zero.
- A report Apple has not produced yet.
- A metric withheld because volume fell under a privacy threshold.
- An app that is not being tracked yet.

Manifest handles this by never substituting a zero for an absence. Where Apple has not delivered a report, the dashboard says **"waiting on Apple"** instead of filling the gap. That is a statement about data availability, not a claim to know more than the source provided.

## Platform labels can be misleading

Platform data creates another layer of confusion.

Apple-silicon Macs can run compatible iPhone and iPad apps, and App Store Connect may expose desktop-related units or availability settings. That does not always tell me whether a specific user installed and launched the app on a Mac.

A listing can indicate an app is available on Apple hardware while still showing it is designed for iPad, or not verified for macOS. A desktop unit can appear in reporting without enough context to conclude a native Mac experience has been tested.

"Available on Mac" and "verified running on Mac" are different claims. When I review platform data I want to know what Apple actually measured and what remains unverified, rather than turning an ambiguous platform label into a product conclusion.

## Why I built Manifest

These problems are part of why I built [Manifest](https://usemanifest.net/).

It is not meant to replace App Store Connect or RevenueCat. Those systems remain authoritative for the data they own, and Manifest does not connect to RevenueCat at all — it reads Apple's own analytics reports and keeps them.

What it does is give the workflow a practical home:

- Track the apps that matter, separately from discovering them.
- Pull Apple's reports on a schedule, every day, so the record survives.
- Preserve pending states instead of flattening them to zero.
- Show which dates a metric actually covers.
- Review a whole portfolio without opening a separate dashboard for every question.

Apple's Analytics API only serves a rolling window, so anything not captured is gone. That is the part a daily pull actually solves.

It is most useful when one person is managing several apps and does not have time to reconstruct the same explanation every time a number looks strange.

## The checklist I use now

When an App Store number looks wrong, I try to slow down before changing code.

First, identify the source. Is the number from App Store Connect, RevenueCat, an app-side event, or a custom backend?

Next, define what the source is measuring. A download, an app launch, a customer profile, a trial, a subscription, or revenue?

Then check timing. Is the app new? Is the report expected to be delayed? Did the scheduled sync run after Apple made the data available?

After that, verify tracking. Is the app connected to the right account and explicitly included in the portfolio?

Finally, test the interpretation. Does the evidence support a product decision, or is it only a clue that needs more time?

This is slower than glancing at a single number. It prevents much more expensive mistakes.

## Better data starts with better questions

The hardest App Store analytics problems are often not technical failures. They are category failures.

A download gets confused with a customer. A customer gets confused with a subscriber. A pending report gets confused with zero. An available platform gets confused with a verified launch.

The fix is not always more data. Sometimes it is better separation.

App Store analytics should help answer what happened, where the information came from, what remains unknown, and what decision the evidence supports. That is the measurement layer I am building with Manifest, for the messy space between shipping an app and understanding what happened after it went live.
