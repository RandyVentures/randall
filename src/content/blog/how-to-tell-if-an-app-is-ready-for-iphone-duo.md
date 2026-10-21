---
title: 'How to Tell If an App Is Ready for the iPhone Duo'
description: 'Which apps will actually use the iPhone Duo’s two displays? A simple look-at-the-screen test, what to check before you download, and what the three levels of support mean.'
pubDate: 'Oct 21 2026'
tags: ['apps', 'building', 'iphone-duo']
---

*Full disclosure: I build apps for the iPhone Duo, including [Sousbook](/blog/sousbook-live-recipe-organizer-iphone-duo/), so I have an interest here. I've kept to what Apple and the reviewers I link to say, and I've marked the places where I'm describing my own testing.*

The iPhone Duo goes on sale on October 23, according to [Apple](https://www.apple.com/iphone-duo/). If you've ordered one, you're probably wondering which of your apps will make good use of two displays, and which will just sit there.

Here's a simple way to tell.

## The short answer

Every existing iPhone app runs on the Duo, according to [9to5Mac's review](https://9to5mac.com/2026/10/21/iphone-duo-review/). How well an app uses the screens depends on which version of Apple's developer tools the developer built it with. That gives you three levels you can recognize on sight.

| What you see | What it usually means |
|---|---|
| The app sits in the middle of the inner display with **black bars** around it | Built with the iOS 26 tools or earlier. It runs, but it isn't designed for the Duo. |
| The app **fills most of the inner display** and leaves space along the right edge for the status bar | Built with the iOS 27 tools. |
| The app uses **the whole inner display, and can use the outer display too** | Built with the iOS 27.1 tools or later, which is what Apple's own apps use. |

That table comes from 9to5Mac's hands-on review. They describe unoptimized apps as having black bars on both sides in landscape and floating in the middle of the screen in portrait, and apps built with iOS 27.1 or later as able to use "the entire inner and outer displays."

## The 30-second test

Open the app, unfold the phone, and look.

1. **Black bars?** If so, the app hasn't been updated for the Duo. It will work, and you can zoom in the way iPhone apps can on an iPad.
2. **Does it fill the screen sensibly?** An app that's just a stretched phone layout is better than black bars, but it isn't using two displays on purpose.
3. **Is there a layout made for the space?** A list on one side and the detail on the other, or two pages side by side, is the sign that someone designed for the inner display.
4. **Do controls avoid the right edge?** The status bar lives in a column along the right edge, so a well-made app keeps its buttons clear of it.
5. **Fold it and unfold it.** Apple says [moving between displays is seamless](https://www.apple.com/iphone-duo/), and in my own testing in Apple's simulator, an app that's built well moves between screens in one piece without losing your place. If an app restarts or jumps back to the start, it isn't there yet.

## Don't expect the outer screen to do much

It's tempting to think every app can use the small outer display while the phone is open. It mostly can't. Apple's developer talks say that new windows can't be created on the outer display, and that it's reserved for the inner display. When the phone is unfolded, an app can add content to the outer display through a special system route. Apple's own example is a camera app showing a teleprompter to the person being photographed, and Apple notes it works only when the app is full screen on the inner display with an active camera session.

So an app that doesn't use the outer display isn't broken. Most won't.

## Apple's apps don't count as the test

Apple's own apps, like Maps, Music and Reminders, were updated with right-aligned controls for the Duo, according to the review. They're a good example of what "fully optimized" looks like, but they don't tell you how an app from a small developer will behave.

## Where to look before you download

- **Screenshots on the App Store page.** App Store Connect gives developers a slot for iPhone Duo screenshots, so a listing can show what the app looks like on it. If an app has them, that's a good sign. If it doesn't, that doesn't prove anything either way.
- **The developer's update notes or website.** Look for "iPhone Duo" in the release notes. A developer who built for it will usually say so.
- **A first-week review from someone else.** I've only tested in Apple's simulator so far, and other developers may be in the same position until their phones arrive.

## Apps built for it

I can only speak for my own apps:

- **Sousbook** is a recipe organizer that's live on the App Store. It was our first app with iPhone Duo support. Its compact layout works on a standard iPhone and on the Duo's outer display, and the inner display gets a roomier layout. You don't need a Duo to use it. I wrote up [how it looks on the Duo](/blog/sousbook-iphone-duo-recipe-book/).
- **Lampleaf** is an illustrated Bible app I'm building for the Duo. It's in testing and isn't on the App Store yet.

You can see all of my apps on the [apps page](/apps/).

## Questions

**Will my existing apps stop working?** No. Per 9to5Mac's review, every existing iPhone app runs on the Duo. Some will just show black bars.

**Do developers have to update their apps?** To fully use the Duo, yes. Apps built with older tools run, but without the designs made for two displays.

**Do I need a Duo to use apps like Sousbook?** No. Sousbook works on any iPhone, and the extra space on the Duo just gives it a roomier layout.

## Sources

I checked these in October 2026:

- [Apple: iPhone Duo](https://www.apple.com/iphone-duo/)
- [9to5Mac: iPhone Duo review](https://9to5mac.com/2026/10/21/iphone-duo-review/)
- [9to5Mac: how the iPhone Duo treats apps that aren't optimized](https://9to5mac.com/2026/09/09/heres-how-iphone-duo-treats-apps-not-optimized-for-the-foldable-display/)
- [Apple Tech Talk: Leverage multiple displays and scenes on iPhone Duo](https://developer.apple.com/videos/play/tech-talks/111464/)

*Details can change as Apple updates iOS, and the optimization levels above come from reviewers' hands-on testing, not an Apple label. iPhone is a trademark of Apple Inc. Sousbook and Lampleaf aren't affiliated with or endorsed by Apple.*
