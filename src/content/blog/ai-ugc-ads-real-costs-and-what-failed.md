---
title: 'How I Make AI UGC Ads: Real Costs and What Failed'
description: 'What AI presenter ads cost me with ElevenLabs and fal.ai, how I cut the cost, what broke along the way, and the results so far, including the parts that did not work.'
pubDate: 'Oct 21 2026'
tags: ['ai', 'marketing', 'video', 'apps']
---

I've written before about [how I create AI UGC ads with ElevenLabs and fal.ai](/blog/how-to-create-ai-ugc-ads-elevenlabs-fal-ai/). That post covers the workflow. This one covers what people usually leave out: what it costs, what went wrong, and what it did for my apps.

Everything below comes from the log I keep as I make these videos. The prices are estimates from the time I made each batch, so check the dashboards for current numbers.

## What the pieces cost

My setup is simple:

- **ElevenLabs** for the voice.
- **fal.ai** for the presenter. I generate a portrait with an image model, then use a lip-sync model (Creatify Aurora) to make the portrait speak the voiceover.
- **FFmpeg** to put the video together with captions, the app screen and an end card.

The numbers from my logs:

- **A presenter portrait:** about $0.24 for four candidates, so you can pick the one you like.
- **Lip-sync:** about $0.07 per second at 480p and about $0.14 per second at 720p. My first 22-second pilot at 720p cost roughly $3.10.
- **A batch of four Glora clips:** about $2.55 all in, at 480p.
- **A batch of six Heirloom videos:** about $8.40 of fal credit.
- **A four-minute video with ten lip-synced segments:** roughly $6.90.

Voice costs are small. A short video uses a few hundred to a couple of thousand characters of ElevenLabs credit, and my slide-based videos used no fal credit at all.

## The trick that cut my costs by about 70%

The big saving came from not paying to lip-sync the whole video every time.

A UGC ad has two parts. The hook is the first few seconds, and it's what decides whether anyone keeps watching. The body is everything after it. When I test hooks, the body should be identical, so I lip-sync the body once and reuse it, then lip-sync only a new four-second hook for each variant.

That means six videos cost six short lip-syncs plus one shared body, not six full videos. It also makes the test fair, since the only difference between versions is the hook.

## What went wrong

A lot, and it's worth listing because none of it is obvious from the tool documentation.

- **Captions covered the presenter's face.** I tuned the caption position on one portrait, and it didn't fit the next one. The fix was a per-presenter caption setting.
- **The hook box covered the presenter's head.** I moved it to sit below the chin.
- **The end card collided with the captions** in the last three seconds on every variant, and one of them was already posted. I only caught it in a quality check afterward.
- **A caption file failed to upload** to YouTube because 128 of 146 cues overlapped the next one by a fraction of a second. I had to clamp the end times.
Most of these were caught in a quality check, not by me watching casually. I now render one video at a time and check each one before it's staged for posting: the hook below the chin, the same presenter, the end card, and that every claim stays inside what the App Store listing already says.

## What it did for my apps

This is the part I'd like to be able to skip, but it's the most useful.

- On TikTok, the best Heirloom video got 87 views and one like. Across my whole TikTok account for one week in October, there were 1,683 views, 8 likes and no shares.
- On YouTube Shorts, none of my videos passed 14 views.
- For Heirloom in the week of Oct 6 to 12, I had 16 downloads. Of 21 App Store page views, 18 came from App Store search, and all 16 downloads did too. The AI videos didn't send me measurable downloads.

So the videos are cheap to make, a clip costs a few dollars at most, but I can't say they work. By my own rule, if a test doesn't move downloads, I stop spending time on it.

## What I'd do differently

1. **Measure downloads, not views.** Views feel like progress. They told me nothing about whether anyone installed the app.
2. **Change one thing at a time.** Hook only, with the body identical.
3. **Put effort into where people already look.** For Heirloom, that was App Store search. Better videos won't fix a listing nobody sees.
4. **Treat the cost as the small part.** Making the video is cheap. Getting it in front of people is the expensive part.

I'm still making these, because they're cheap and I learn from each batch. But I'd tell anyone starting out to expect a lot more work on distribution than on production, and to decide in advance what result would make you stop.

*AI presenters in these videos are labeled as AI on the platform. The figures above are estimates from my own project logs and not current prices or promised results.*
