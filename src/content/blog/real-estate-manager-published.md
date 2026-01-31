---
title: 'I Finally Published Real Estate Manager'
description: 'After building it over the holidays, my property management app for small landlords is officially out. Here is what it does and why I built it.'
pubDate: 'Jan 30 2026'
---

It's live. Real Estate Manager - the property management app I built over the holidays - is officially published.

This one's been in my head for a while. Managing my Alton 4-plex and Chula Vista house with spreadsheets and notes apps was getting old. Every tool I found was either way too complex, required a subscription, or wanted me to sync my financial data to some random cloud. I just wanted something simple, private, and offline that actually fit how I manage properties.

So I built it.

## What It Does

Real Estate Manager is an iOS app built specifically for small landlords like me. It handles the full cycle - properties, units, tenants, leases, rent collection, expenses, and mortgage payments. All stored locally on your device. No account, no cloud sync, no subscription.

Here's the breakdown:

**Portfolio Management** - You can create multiple portfolios and switch between them. Useful if you manage properties for different entities or just want to keep things separated.

**Properties & Units** - Add your properties with full address details, then break them into units. My 4-plex has four units, each tracked individually. Single-family works too.

**Tenant & Lease Tracking** - Maintain a tenant database with contact info, create leases linking tenants to specific units, track start/end dates, monthly rent, deposits. The app flags leases expiring within 90 days so nothing sneaks up on you.

**Rent Ledger** - This is the piece I'm most proud of. Create rent charges with flexible due dates, record payments by method (cash, Zelle, Venmo, check), and the app handles payment allocation automatically. It tracks what's unpaid, partially paid, overdue, and calculates remaining balances. No more mental math.

**Expense Tracking** - Log expenses by category (utilities, repairs, maintenance, taxes, insurance, HOA, you name it). Filter by month, see category totals. Everything I need at tax time without digging through bank statements.

**Mortgage Payments** - Track individual mortgage payments separate from rent collection. Set expected monthly amounts and due dates per property.

**Dashboard** - Monthly cashflow summary showing collected income, expenses by category, mortgage payments, and net cashflow. Property-by-property breakdown. This is the view I check most.

## The Tech

Built it with Swift and SwiftUI, using SwiftData for persistence. No backend, no API calls, no dependencies on someone else's server. Your data lives on your device.

A few decisions I'm happy with:

- **Decimal for money** - Not Float, not Double. Decimal. Because $1,200.00 should actually be $1,200.00, not $1,199.9999999.
- **Portfolio-scoped repository** - Every data operation is scoped to the active portfolio. Clean separation, no data leaking between portfolios.
- **Automatic daily backups** - The app creates daily backups automatically, keeps up to 20, and lets you restore from any of them. After the rocks-in-the-pipe incident, I don't trust anything without backups.
- **Document attachments** - Attach files to leases and expenses. Lease agreements, receipts, inspection photos - all stored locally with the relevant record.

## Why Offline-Only

Every property management app I looked at wanted my financial data in their cloud. Rent amounts, tenant info, mortgage details - that's sensitive stuff. I don't need it synced. I don't need it accessible from a browser. I need it on my phone when I'm standing at the property.

Offline-first means my data stays mine. No monthly fees for storage. No wondering what happens if the company shuts down. The app works the same whether I have signal or not.

## Why I Built It

Honestly? I built it because nothing else fit. The enterprise tools are designed for property managers with 50+ units and charge accordingly. The simple ones are too simple - they track rent but not expenses, or expenses but not leases.

I wanted one app that handles my specific workflow: check the dashboard, see what's due, record payments when tenants pay, log expenses when they happen, and have everything ready when tax season hits.

Now I have it. And if you're a small landlord dealing with the same spreadsheet mess I was, maybe it'll work for you too.

## What's Next

Already using it to manage both properties. The vacant unit at the 4-plex is the current priority - that empty row on the dashboard is motivation enough to get it rented.

There are features I might add later, but right now it does exactly what I need. Shipping something complete beats shipping something ambitious and half-finished.

---

*Built this over the holidays while the meetings were quiet. Turns out that's when the best work happens.*
