---
title: 'iPhone Duo Screen Sizes and Layout Notes for Developers'
description: 'Display sizes in points, safe areas, size classes and fold behavior measured in Apple’s iPhone Duo simulator, plus Apple’s guidance on the fold region and hinge API.'
pubDate: 'Oct 22 2026'
publishAt: '2026-10-22T08:00:00-05:00'
tags: ['apps', 'building', 'iphone-duo']
---

I'm building an illustrated Bible app, Lampleaf, for the iPhone Duo. Before the phone ships, I wrote a small probe app that logs everything about the screens: window size, safe areas, size classes, scene state and the hinge. This post collects what I measured, and what Apple's own documentation says, so you can see which is which.

**A caution up front:** everything marked "measured" comes from Apple's Xcode 27.1 simulator (build 27A9275), on October 18, 2026. The phone goes on sale on October 23, and mine hasn't arrived yet. I'll re-measure on hardware and update this post. Simulator numbers can differ from a real device.

Apple calls the two displays the **outer display** (5.4 inches) and the **inner folding display** (7.6 inches), according to [Apple's iPhone Duo page](https://www.apple.com/iphone-duo/). In my notes I call the outer display the cover screen, so you'll see both words.

## Display sizes (measured)

| | Outer (cover) display | Inner display |
|---|---|---|
| Orientation | Portrait | Landscape |
| Size in points | **466 × 678** | **951 × 669** |
| Size in pixels | 1398 × 2034 | 2853 × 2007 |
| Scale | @3x | @3x |
| Corner radius | 59 pt | 59 pt |

- The inner panel is natively portrait (2007 × 2853 pixels) and runs in landscape.
- The outer display's mask has square corners on the left edge, the hinge side, and rounded corners on the right.
- The leaked mockups I started from had the inner screen at about 904 × 640 and the outer at 474 × 696. The real simulator sizes are about 5% bigger for the inner screen and about 2% smaller for the outer one.

## Safe areas: a column on the right (measured)

The biggest surprise was the status bar. The mockups showed it across the top. In the simulator, the time and status cluster sit in the top-right corner, and **84 points are reserved down the whole right edge on both screens.**

| | Top | Leading | Bottom | Trailing | Content area |
|---|---|---|---|---|---|
| Outer, portrait | 0 | 0 | 34 | **84** | 382 × 644 |
| Inner, landscape | 0 | 0 | 34 | **84** | 867 × 635 |

What that means in practice:

- Nothing has to clear a top status bar, so a toolbar can sit close to the top edge.
- Anything on the right edge, such as tabs or page controls, belongs inside that 84-point column or clear of it.
- Full-bleed art can ignore the safe area. The time floats over it in the top-right.

During an unfold, the window passes through two **transient sizes** for about 130 milliseconds: 466 × 562 with a top safe area of 82, then 951 × 553, before settling at 951 × 669. If your layout reacts to every size, it can flash a wrong layout. I debounce layout decisions by about 150 ms.

## Size classes and scenes (measured)

| | Horizontal | Vertical | `windowScene.screen == UIScreen.main` |
|---|---|---|---|
| Outer display | compact | regular | true |
| Inner display | **regular** | regular | **false** |

Apple's Tech Talk says each display has its own size class, which matches what I saw. A few other things I observed:

- **It's one scene.** The same scene moves between the displays. There's no disconnect and no background/foreground change, `scenePhase` stays `.active`, and your state survives. Only `windowScene.screen` changes.
- **Never use `UIScreen.main` for layout.** It keeps pointing at the outer display even when your app is on the inner one. Read the window or geometry instead.
- **The outer display goes dark while the phone is unfolded.**
- `isFullScreen` reported `false` on both screens, so I don't rely on it.

## Where the fold is: Apple's division region

My first assumption was that the hinge sits at the physical center of the inner display, which would be x = 475.5 pt in landscape, and I split my layout there. That was a placeholder. I had noted that I couldn't find an API for the crease rectangle.

Apple's Tech Talk ["Strike a pose with adaptive layouts on iPhone Duo"](https://developer.apple.com/videos/play/tech-talks/111463/) describes one. Hardware features that shape your space, including the hinge and the cameras, are called **reserved regions**. The fold is a **division region**, and you can query it:

```swift
GeometryReader { proxy in
  let regions = proxy.reservedRegions(kind: .division)
}
```

In UIKit the equivalent is `view.reservedRegions(kind: .division)`, and each region has a `frame`. Apple notes that the division region is only active when the device is folded. When it's flat, it's inactive and has a width of zero. Check the official documentation for the exact method names, because Apple's narration and its code samples spell them slightly differently.

I haven't yet verified this on a real device, so for now, treat my fixed-center number as a fallback, not an answer.

## The hinge API is for effects, not layout

The hinge API is separate from the reserved regions. In SwiftUI it's the `onHingeChange` modifier, and in UIKit it's `UIHingeInteraction`. It reports a status of closed, partially open or fully open, plus a continuous angle. The hinge is `nil` on devices without one. In my probe, the compiler marks them `@available(iOS 27.1, *)`.

Apple's guidance is that hinge data is "ideal for driving interactions or effects," and that for layout you should use the arrangement and region APIs. I use it only to prepare an animation.

Here's what the simulator's log showed when opening the phone (the simulator's hinge slider jumps quickly, so a real device will stream denser, slower angles):

```
t+0.00  hinge closed 5°
t+0.25  hinge partiallyOpen 146°
t+1.68  size → 466 × 562 (transient)
t+1.72  horizontalSizeClass → regular
t+1.81  size → 951 × 669, safe area R84 (final)
t+1.93  hinge fullyOpen 180°
```

The hinge event came **about 1 to 2 seconds before the window resized.** That gives you a moment to get ready, such as rendering the cover or loading the spread. Closing was slower: about 3.8 seconds from the first hinge change until the layout switched to compact. I wouldn't depend on those timings on hardware.

## The outer display

Two things from Apple's ["Leverage multiple displays and scenes"](https://developer.apple.com/videos/play/tech-talks/111464/) talk:

- **New windows can't be created on the outer display.** That's reserved for the inner display.
- To show content there while the phone is unfolded, you use **scene accessories**. For camera apps that's `CameraCaptureAccessory`, available when your app is full screen on the inner display and has an active camera session. Apple's demo is a teleprompter on the outer display while the camera view stays on the inner one.

In my simulator, the outer display was dark whenever the phone was unfolded and nothing was using that route.

## Layout rules I'm using

- **Decide from the window, not the device.** I use a two-page spread when the window is at least 700 pt wide and wider than it is tall (951 × 669 here, and an iPad in landscape), and a single page otherwise.
- **Don't use `UIScreen.main` or `isFullScreen` for layout.**
- **Give the extra room to margins and line length.** Type sizes are in points, so they don't need to grow.
- **Test Split View.** Apple says you can use two apps side by side, so your layout needs to hold up at around half the inner display's width.

## Still to check on hardware

- The exact position and width of the crease, and how the division region behaves in the half-open "book" pose.
- The real hinge update rate.
- Whether the status column on the inner screen moves if the phone is rotated 180°.
- How the layout behaves in Split View on the inner screen.

I'll update this post once I have a phone in my hands.

## Apple's own resources

- [Preparing your app for iPhone Duo](https://developer.apple.com/documentation/technologyoverviews/preparing-your-app-for-iphone-duo)
- Tech Talks: [Prepare your app for iPhone Duo](https://developer.apple.com/videos/play/tech-talks/111461/), [Strike a pose with adaptive layouts](https://developer.apple.com/videos/play/tech-talks/111463/), [Leverage multiple displays and scenes](https://developer.apple.com/videos/play/tech-talks/111464/) and [Design for iPhone Duo](https://developer.apple.com/videos/play/tech-talks/111466/)

If you want to see this applied, my [apps page](/apps/) has the apps I'm building for it, and I wrote about [how Sousbook looks on the Duo](/blog/sousbook-iphone-duo-recipe-book/). For the non-developer version, see [how to tell if an app is ready for the iPhone Duo](/blog/how-to-tell-if-an-app-is-ready-for-iphone-duo/).

*Measurements are from Apple's simulator and may change with software updates or differ on hardware. iPhone is a trademark of Apple Inc. Lampleaf and Sousbook aren't affiliated with or endorsed by Apple.*
