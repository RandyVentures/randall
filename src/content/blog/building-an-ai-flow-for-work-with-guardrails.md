---
title: 'Building an AI Flow for Work: Ship Faster, With Guardrails'
description: 'Notes on designing an AI-assisted workflow for my day job, inspired by X rebuilding for low bandwidth: start with the constraint, keep humans accountable, and write down what counts as slop.'
pubDate: 'Nov 7 2026'
tags: ['ai', 'work', 'building']
---

I am building an AI-assisted workflow for work. The question behind it is simple: can it help a team build and ship faster without making the work worse?

I do not have results yet. This is a design note about what I am building and why, written before the data comes in, so I can check later whether the reasoning held up.

## The inspiration: start from the constraint

The spark was an engineering post from X, [Rebuilding the Global Town Square From Scratch](https://blog.x.com/en/engineering/rebuilding-the-global-town-square-from-scratch). As I understand it, the team rebuilt the app so the website is faster for people on low bandwidth.

I am borrowing the idea, not their implementation. The part that stuck with me is that a real constraint can shape a whole product. If you design for the slow connection first, the fast connection tends to benefit too.

I am applying that to an AI workflow. The constraint is not bandwidth. It is **trust**: anything the AI produces has to be cheap to verify, easy to review, and impossible to ship without a person who owns it. If a flow only works when everyone trusts the model, it is a bad flow.

## The shape of the flow

I want it to be boring and legible:

1. **Spec.** A person writes what is being changed, what done looks like, and what must not be touched.
2. **Plan.** The AI proposes an approach. A person approves or edits it before any code is written.
3. **Build.** Small changes, one concern at a time, on a branch.
4. **Verify.** Tests, linting, and type checks run automatically. A failing check goes back to the build step, not forward to review.
5. **Review.** A human reads the diff. The AI can summarize it, but cannot approve it.
6. **Ship.** A human decides, using the same release process as everything else.

Nothing in that list is new. The point is that the AI sits inside the existing process instead of around it.

## The guardrails

These are the rules the flow will not bend on:

- **A named human owns every change.** The tool is never the author of record.
- **Scope is declared up front.** If the diff touches files outside the spec, it stops for review.
- **Checks gate review, not the other way around.** Reviewers should not spend time on code that does not pass.
- **No secrets, customer data, or production access** in prompts or tooling.
- **One change per batch.** If the prompt, the model, and the process all change at once, I cannot learn from the outcome.
- **A log of what ran.** What was asked, what was produced, what a human changed, and what shipped.

## The anti-slop rules

"AI slop" is vague until you write it down. These are the rules I am starting with, and they will change:

- **No claim without a source.** Numbers, benchmarks, and "this is faster" need evidence in the diff or the pull request.
- **No filler.** Descriptions say what changed and why. They do not say "robust," "seamless," or "comprehensive."
- **Match the code around it.** Same naming, same comment density, same patterns. No new abstraction unless the change needs it.
- **Delete before you add.** If the best change removes code, that is the answer.
- **No comments that restate the code,** and no dead code left "just in case."
- **Say what you did not verify.** A pull request that says "not tested on X" beats one that implies it was.
- **Review the work, not the tone.** A confident-sounding explanation is not evidence.

Most of these came from rules I already use for my own content work: keep claims inside what you can support, and do not count output as a win.

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

I will write a follow-up once there is something measured to report, including what did not work.
