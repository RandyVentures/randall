import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import { apps } from '../data/apps';
import { primaryTone } from '../data/tags';
import { entryNumbers, getPosts, postUrl, withBase } from '../lib/posts';

/** The search palette fetches this once, on first open, so pages stay light. */
export const GET: APIRoute = async () => {
	const posts = await getPosts();
	const numbers = entryNumbers(posts);

	const appIndex = await Promise.all(
		apps.map(async (app) => ({
			t: app.name,
			d: app.tagline,
			u: app.url ?? withBase('/#apps'),
			icon: (await getImage({ src: app.icon, width: 72, height: 72, format: 'webp' })).src,
			k: app.category,
		})),
	);

	return new Response(
		JSON.stringify({
			posts: posts.map((post) => ({
				t: post.data.title,
				d: post.data.description,
				u: postUrl(post.id),
				n: numbers.get(post.id),
				date: post.data.pubDate.toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				}),
				tags: post.data.tags,
				tone: primaryTone(post.data.tags),
			})),
			apps: appIndex,
			pages: [
				{ t: 'The log', d: 'Every entry, newest first', u: withBase('/blog/') },
				{ t: 'About Randall', d: 'Who is writing this and why', u: withBase('/about/') },
				{ t: 'Playbooks', d: 'Guides for shipping an app', u: withBase('/#playbooks') },
				{ t: 'RSS feed', d: 'Follow along in your reader', u: withBase('/rss.xml') },
			],
		}),
		{ headers: { 'Content-Type': 'application/json' } },
	);
};
