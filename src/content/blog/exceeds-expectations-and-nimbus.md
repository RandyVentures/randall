---
title: 'Exceeds Expectations and Building Nimbus'
description: '2025 performance review landed well, and now building an enterprise AI assistant inspired by Clawdbot'
pubDate: 'Jan 14 2026'
heroImage: '../../assets/nimbus-cloud.svg'
---

Two things happened this week: my 2025 performance review came back better than expected, and I started building an enterprise version of the AI workflow I've been using at home.

## Performance Review: Exceeds Expectations

I went into my annual review with realistic expectations. Rated myself "meets expectations" across the board - I did my job, shipped the work, kept things moving. Standard year.

My manager disagreed. Came back with "exceeds expectations" based on what I actually accomplished in 2025.

That felt good. Not because of the rating itself, but because it confirmed that the work landed. My focus in 2025 was payments architect work - which I crushed and will keep building on. But I also jumped into AI hackathons, did well, and brought new AI ideas and solutions to work. The combination showed I wasn't just tinkering - I was delivering real impact.

Looking forward to 2026.

## The Clawdbot Problem

I've been running Clawdbot at home for a while now. Will (my AI assistant) handles calendar sync, expense tracking, daily reflections, blog posts, and general personal automation. The workflow is solid. I trust it.

But I don't get to use it during the workday.

That's the problem: I built this great AI workflow for personal stuff, but when I'm actually working - building enterprise systems, writing .NET code, managing infrastructure - I'm back to manual everything.

I could try to reuse Clawdbot internally, but that doesn't make sense. Work is private, enterprise-locked, and has different security requirements. Bringing in an external tool isn't an option.

So I'm building **Nimbus** instead.

## What is Nimbus?

Nimbus is an enterprise AI assistant inspired by Clawdbot's architecture but designed for locked-down work environments. Same philosophy, different constraints.

Key differences from Clawdbot:
- **CLI-first** - No Slack integration (yet), no external services. Just a local process I can run on my work machine.
- **Approval/reject workflow** - Every command gets reviewed before execution. No auto-runs.
- **Enterprise-safe** - Built with the assumption that everything stays internal. No cloud calls, no external APIs (for now).
- **Dev-focused** - Git operations, dotnet commands, test runners, build pipelines. The stuff I actually do at work.

Eventually I want it in Slack as a bot, but that requires admin rights I don't have yet. For now, CLI is enough to validate the workflow.

## Building with ChatGPT

I used Clawdbot as a reference and worked with ChatGPT to map out the implementation plan. Went back and forth a few times, refined the approach, and created an execution checklist broken into phases.

Phase 1 is about halfway done:
- ✅ CLI command handling (dotnet info, tests, build)
- ✅ Approval/reject flow for every action
- ✅ Soul and memory system (same philosophy as Clawdbot)
- ✅ Claude integration (mocked for now to save tokens)
- 🔄 Git operations (in progress)
- 🔄 Extended dev commands

The goal isn't to ship a polished product. It's to build the minimal workflow that makes my workday better, then iterate from there.

## Why CLI First?

Two reasons:

**1. No dependencies.** I don't need Slack admin approval, IT review, or permission to run a local process. I can build, test, and refine without asking anyone.

**2. Simpler surface area.** A CLI tool does one thing: respond to commands. No webhooks, no real-time messaging, no multi-user coordination. Just input → approval → output.

Once the core workflow is solid, adding Slack integration is straightforward. But if I start with Slack, I'm blocked until I get access. CLI unblocks me now.

## The Approval Flow

This is the key difference from Clawdbot. At home, I trust Will to run commands autonomously. At work, everything gets reviewed first.

Here's how it works:
1. I ask Nimbus to do something ("run tests for OrderService")
2. Nimbus generates the command (`dotnet test src/OrderService.Tests`)
3. I see the command and choose: **approve** or **reject**
4. If approved, Nimbus runs it and shows the output
5. If rejected, Nimbus asks for clarification

Simple, explicit, safe. Perfect for enterprise paranoia.

## What's Next

I'll finish Phase 1 over the next week, but I'm also focusing on documentation for other projects. Nimbus is a side build - useful, but not blocking anything critical.

Once it's stable enough to use daily, I'll start Phase 2:
- Full git integration (branch management, commit history, PR reviews)
- Smarter memory (tracking decisions, noting patterns across days)
- Real Claude integration (not mocked)
- Slack bot prototype (if I get admin access)

The goal isn't to replace Clawdbot. It's to bring the same workflow philosophy into my workday without compromising security or relying on external infrastructure.

## Why This Matters

Here's the real point: **good workflows shouldn't be environment-specific.**

I shouldn't have one AI assistant for personal stuff and zero automation at work just because the security boundaries are different. The problems are the same - too much manual overhead, too much context switching, too little time to focus on what actually matters.

Nimbus is my answer to that. Same philosophy, different constraints. Build it once, use it everywhere.

---

*2025 ended well. 2026 is starting even better. Time to keep building.*
