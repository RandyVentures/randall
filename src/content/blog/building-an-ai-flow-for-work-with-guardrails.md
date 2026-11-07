---
title: 'Building an AI Flow for My Day Job: Ship Faster, With Guardrails'
description: 'Notes on designing an AI-assisted workflow for my day job, inspired by how a small X team rebuilt its web app with coding agents: shared instructions, skills in the repo, and guardrails on every commit.'
pubDate: 'Nov 7 2026'
tags: ['ai', 'work', 'building']
---

I am building an AI-assisted workflow for my day job. The question behind it is simple: can it help a team build and ship faster without making the work worse?

I do not have results yet. This is a design note about what I am building and why, written before the data comes in, so I can check later whether the reasoning held up.

## The inspiration: how a small team built it

The spark was an engineering post from X, [Rebuilding the Global Town Square From Scratch](https://blog.x.com/en/engineering/rebuilding-the-global-town-square-from-scratch), about rebuilding their web app so it is faster on low bandwidth. The speed is interesting, but the section that caught my attention was how a small team built it.

By their account, fewer than five engineers built the first version in under six months, with AI coding agents doing much of the implementation: porting behavior from the old servers, converting pages, writing tests, and fixing what CI and reviewers flagged. The engineers set the architecture, decided what to build, and reviewed every change.

What I took from it is that the agents were not the interesting part. The interesting part was what made their output trustworthy. They described three things:

- **Shared instructions.** One file at the root of the repository tells every agent how the team writes code, and every new engineer starts from the same rules. Nothing gets committed until lint, typecheck, and the relevant tests pass.
- **Skills in the repository.** Recurring workflows, such as writing commits, opening pull requests, reviewing code, and shepherding a change through CI, live next to the code as step-by-step skills. When a workflow changes, they update the skill once.
- **Guardrails on every commit.** Conventions became lint rules, including custom ones. They even describe an "anti-slop" lint plugin that rejects patterns agents tend to produce, such as chained type assertions. A pre-commit hook formats, lints, and type-checks every change before it lands.

They also noted that the migration suited agents because the old servers were a working specification: an agent could read how the old system handled something, port it, and write a test that pins it down, and a reviewer could check the result against the original. And for the engineers, the job shifted toward deciding what the system should do, then checking in a real browser that it does.

I am borrowing the ideas, not their implementation. I do not know their setup beyond what that post says.

## What I am taking from it

The common thread is **trust**. Anything the AI produces has to be cheap to verify, easy to review, and impossible to ship without a person who owns it. If a flow only works when everyone trusts the model, it is a bad flow.

So the design starts there, and it has three layers:

1. **Write the rules down once, where every agent and every person will read them.** A single instructions file in the repository, covering how we write code, what we test, and what must pass before a commit.
2. **Turn repeated workflows into reusable steps.** Commits, pull requests, reviews, and CI follow-ups are written as skills that live with the code, so improving one improves the whole team's flow.
3. **Make the rules enforceable.** A rule in a document is a suggestion. A rule in a linter or a hook is a guardrail.

## The shape of the flow

I want it to be boring and legible:

1. **Spec.** A person writes what is being changed, what done looks like, and what must not be touched.
2. **Plan.** The AI proposes an approach. A person approves or edits it before any code is written.
3. **Build.** Small changes, one concern at a time, on a branch.
4. **Verify.** Format, lint, type checks, and tests run automatically. A failing check goes back to the build step, not forward to review.
5. **Review.** A human reads the diff and checks the behavior for real, not just the summary. The AI can summarize, but cannot approve.
6. **Ship.** A human decides, using the same release process as everything else.

Nothing in that list is new. The point is that the AI sits inside the existing process instead of around it.

## The guardrails

These are the rules I do not want to bend:

- **A named human owns every change.** The tool is never the author of record.
- **Scope is declared up front.** If the diff touches files outside the spec, it stops for review.
- **Checks gate review, not the other way around.** Reviewers should not spend time on code that does not pass.
- **No secrets, customer data, or production access** in prompts or tooling.
- **One change per batch.** If the prompt, the model, and the process all change at once, I cannot learn from the outcome.
- **A log of what ran.** What was asked, what was produced, what a human changed, and what shipped.

## The anti-slop rules

"AI slop" is vague until you write it down. These are the rules I am starting with, and they will change. Wherever I can, I want them as lint rules or review checks and not just a list:

- **No claim without a source.** Numbers, benchmarks, and "this is faster" need evidence in the diff or the pull request.
- **No filler.** Descriptions say what changed and why. They do not say "robust," "seamless," or "comprehensive."
- **Match the code around it.** Same naming, same comment density, same patterns. No new abstraction unless the change needs it.
- **Delete before you add.** If the best change removes code, that is the answer.
- **No comments that restate the code,** and no dead code left "just in case."
- **No type escape hatches** such as chained assertions or loosely typed parameters, unless there is a stated reason.
- **Say what you did not verify.** A pull request that says "not tested on X" beats one that implies it was.
- **Review the work, not the tone.** A confident-sounding explanation is not evidence.

Some of these come from rules I already use for my own content work: keep claims inside what you can support, and do not count output as a win.

## How I will know if it worked

The easy mistake is to measure volume. More pull requests and more lines of code are not success. A fast flow that ships rework is just a faster way to make a mess.

So the pilot will track things closer to outcomes:

- **Cycle time** from spec to shipped.
- **Review time and rework,** meaning how often a change comes back for fixes.
- **Defects** that reach production.
- **Reviewer trust,** asked directly: would you rather review these changes or not?

I plan to start small, with one team, one repository, and a few weeks, and compare it against the same team's normal work. If it does not move those numbers, I will say so and change the flow or drop it.

## What I am least sure about

Whether the guardrails are too heavy. A flow that is safe but slow loses to a shortcut. I am also unsure where the human review step becomes a rubber stamp, because reviewers get tired and AI output tends to look plausible. Part of the design work is keeping that step real.

Their situation also had an advantage mine may not: a working system to port from, which acts as a specification. Not every project has one.

I will write a follow-up once there is something measured to report, including what did not work.
