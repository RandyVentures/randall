---
title: 'Adding Telegram Topics Support to Clawdbot'
description: 'Contributing forum/topics support to Clawdbot so my AI assistant can actually track different conversations in group chats'
pubDate: 'Jan 07 2026'
heroImage: '../../assets/telegram-clawdbot-hero.jpg'
---

Clawdbot already had solid Telegram support - I could chat with Will via DM, he could participate in group chats, the basics all worked. But there was one missing piece: Telegram topics/forums.

If you haven't used Telegram topics, think of them like Discord channels within a single chat. You can have one group with multiple topic threads - "General", "Tech Talk", "Random", whatever. Each topic is its own conversation.

The problem? Will couldn't tell them apart. A message in "General" and a message in "Tech Talk" looked the same to him. Context got mixed up, replies went to the wrong threads.

So I fixed it.

## The PR

[Commit: 71b87d0a](https://github.com/RandyVentures/clawdbot/commit/71b87d0a8c99e5c021087ea2fc529532520e6eed)

The changes were pretty straightforward:

**1. Extract the thread ID**
```typescript
const threadId = msg.message_thread_id ? String(msg.message_thread_id) : undefined;
```

Telegram sends `message_thread_id` with every message in a forum. Just needed to grab it.

**2. Pass it through the message envelope**
Added thread context to the envelope that gets sent to the AI:
```typescript
thread: threadId,
```

Now Will knows which topic a message came from.

**3. Include it in replies**
Every outgoing message type (text, photos, videos, documents) needed the thread ID:
```typescript
message_thread_id: messageThreadId,
```

This ensures replies go to the correct topic thread.

**4. Make it available to templates**
Added `ThreadId` and `ThreadName` to the template context so auto-replies and custom handlers can access thread info.

## Why It Matters

Now I can:
- Have different conversations with Will in separate topics
- Keep work stuff in one thread, personal in another
- Context doesn't bleed between topics
- Replies always go to the right place

It's a small feature, but it makes group chats actually usable. Before this, using Will in a Telegram group with topics was basically broken. Now it just works.

## The Testing

Added proper tests to make sure:
- Thread IDs are extracted correctly
- Replies target the right thread
- Template context includes thread info
- It doesn't break non-topic chats

Pull request included formatting fixes (biome linter) and merged cleanly with upstream.

## Contributing to Open Source

This is exactly the kind of PR I like making - scratched my own itch, added value to the project, clean implementation, tested. 

Clawdbot's architecture made it easy. The message handling was already well-structured, just needed to thread (pun intended) the topic ID through the pipeline.

## What's Next

With topics working properly, I can:
- Organize different aspects of life in separate Telegram topics
- Have Will participate naturally in each one
- Keep everything in one group instead of multiple chats

Small change, big impact on daily usability.

---

*Built this because I needed it. Shared it because someone else probably does too.*
