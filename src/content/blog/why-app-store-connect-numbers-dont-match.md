---
title: "Why App Store Connect Numbers Don't Match (and Which to Trust)"
description: 'Sales and Trends and Analytics show different numbers for the same day. Why that happens, what each report is for, and how to avoid fake trends in your data.'
pubDate: 'Oct 23 2026'
tags: ['apps', 'manifest', 'building']
---

You open App Store Connect on a day you know someone bought your app. Sales and Trends shows a unit. Analytics shows no download. One of them has to be wrong.

Neither is. They measure different things, at different times, with different privacy rules. Once you know that, the numbers stop looking like a bug, and you can pick the right report for the question you're asking.

## They measure different events

**Sales and Trends** is a financial report. It counts units and proceeds, and it settles quickly because money has to add up. The figures are exact.

**Analytics** is a product report. It covers impressions, taps, downloads, sessions and deletions. It lags by roughly two days, and it hides figures that fall below Apple's privacy thresholds.

So a day can legitimately show one unit in Sales and Trends and no reported download in Analytics. The unit was sold, and the download simply wasn't published yet.

## Why Analytics is empty for a new app

If you launched recently and Analytics shows nothing, don't conclude the launch failed.

For analytics reports to exist, a report request has to be set up, and then Apple has to generate the first report against it. On a new app, that gap can run to about two weeks. During that time the API answers every request successfully and returns nothing, which looks exactly like zero downloads.

Check whether Apple has published a report yet before you start changing your listing. Sales and Trends will already be telling you the truth.

## Which report answers which question

- **Did anyone buy it?** Sales and Trends. Exact units, no privacy threshold, and close to real time. This is the right report for a new or low-volume app.
- **Is my listing earning taps?** Analytics. Impressions and taps don't exist anywhere else.
- **Are people keeping the app?** Analytics, but carefully. Sessions and deletions are the most heavily hidden numbers in the set.
- **What do I owe tax on?** Neither one on its own. Use the financial reports and your payout statements.

## The mistake that creates fake trends

It's tempting to divide a number from one report by a number from the other, such as downloads from Analytics into proceeds from Sales and Trends, to get revenue per download. Don't. The two reports cover different days to different depths, so the ratio is measuring coverage as much as it's measuring your app.

The same goes for week-over-week changes. If this week is missing two days of reporting and last week is complete, the "decline" you see is just the missing days. Compare equal, complete windows, or don't compare.

## A simple weekly check

1. **Pick the question first.** Sales, listing, or retention? That decides the report.
2. **Check the dates are complete.** If the last two days aren't in yet, leave them out.
3. **Compare like with like.** The same number of days, from the same report.

If you want the longer version, I put together a [guide to why Sales and Trends and Analytics disagree](https://usemanifest.net/sales-and-trends-vs-analytics), and a [checklist for when App Store Connect shows zero downloads](https://usemanifest.net/app-store-connect-zero-downloads). Apple's own documentation on [analytics reports and their completeness](https://developer.apple.com/help/app-store-connect-analytics/overview/analytics-reports-api) explains why missing data doesn't prove zero activity.

## Where Manifest comes in

I built [Manifest](https://usemanifest.net/) because I kept running into exactly this. It reads Apple's Analytics reports, shows any day Apple hasn't reported as a gap instead of a zero, and holds back a week-over-week change until both weeks have complete data.

You don't need it to avoid the traps above. Knowing which report to use, and not mixing them, gets you most of the way. But if you're checking several apps every week, a record that tells you the difference between "zero" and "not reported yet" saves a lot of second-guessing.
