---
title: 'Adding Telegram Support to Clawdbot'
description: 'Building real group chat and topics support for my AI assistant - because WhatsApp web client limitations were getting old'
pubDate: 'Jan 07 2026'
heroImage: '../../assets/telegram-clawdbot-hero.jpg'
---

One of the first things I did after setting up Will was connect him to WhatsApp. Worked great for personal chats, but WhatsApp's web client API is... limited. No proper group support, no topics/threads, constant session issues.

So I added Telegram. Properly.

## Why Telegram?

WhatsApp is fine for quick back-and-forth, but when you're building a personal AI assistant that needs to:
- Participate in group discussions
- Track different topics in a conversation
- Stay connected reliably without random logouts
- Have proper bot APIs that don't break every update

...you need something built for it. Telegram has a real Bot API. Topics are first-class citizens. Groups actually work.

## The Build

Clawdbot already had the infrastructure - it's built on a modular gateway system where you can plug in different messaging providers. I just needed to add Telegram support.

### What I added:

**1. Full message context**
- Group ID tracking
- Topic/thread support
- Reply chains
- Message IDs for threading

**2. Rich message handling**
- Markdown formatting that actually works
- File uploads and media
- Inline replies
- React to messages

**3. Proper group behavior**
- Knows when it's in a group vs DM
- Can participate in topic threads
- Respects permissions
- Doesn't spam when it shouldn't

### The tricky part

The hardest part wasn't the Telegram API - that's actually well-documented. It was making Clawdbot understand *context*.

When Will gets a message in a Telegram group with topics enabled, he needs to:
1. Know which group it came from
2. Know which topic thread it's in
3. Track the conversation history within that thread
4. Reply in the right place
5. Not mix up conversations from different threads

That required threading the message metadata all the way through the system - from Telegram's webhook, through the message processor, into the AI context, and back out to the reply handler.

## What it looks like now

I can:
- DM Will on Telegram for quick questions
- Have him participate in group chats
- Keep different conversations in separate topics
- Get file uploads and responses with proper formatting
- Have threaded discussions that don't get mixed up

All while keeping the same personality and memory system that works in WhatsApp and the web interface.

## Why this matters

My AI assistant isn't just a chatbot - it's integrated into my actual workflow. I need it where I communicate, not just in a special app I have to remember to open.

Now I can:
- Discuss projects in a Telegram group with Will tracking context
- Keep business stuff in one topic, personal in another
- Have Will monitor channels and alert me to important stuff
- Share files and get analysis without switching apps

The goal was never to build a demo. It was to build something I'd actually use every day.

## The code

It's all in the [clawdbot repo](https://github.com/RandyVentures/clawdbot). The Telegram provider is in `src/providers/telegram/` if you want to see how it works.

Building in public means the good, the messy, and the "I can't believe that edge case exists" are all visible. That's the point.

## What's next

Now that messaging is solid, I'm working on:
- Better calendar integration (iCloud works, Google OAuth is being annoying)
- Automated expense tracking beyond just mileage
- Smart home stuff (because why not)

The system is there. Now it's just about adding the pieces that actually save me time.

---

*Written with Will's help. He reminds me to actually publish these instead of leaving them in drafts.*
