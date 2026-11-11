import { getPosts } from '../lib/posts';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { AUTHOR_NAME } from '../lib/seo';

export async function GET(context) {
	const posts = await getPosts();
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const site = new URL(`${base}/`, context.site);
	const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return rss({
		title: `${SITE_TITLE} — Field notes from South Texas`,
		description: SITE_DESCRIPTION,
		site,
		xmlns: { atom: 'http://www.w3.org/2005/Atom', dc: 'http://purl.org/dc/elements/1.1/' },
		customData: [
			'<language>en-us</language>',
			`<atom:link href="${new URL('rss.xml', site).href}" rel="self" type="application/rss+xml" />`,
			`<lastBuildDate>${posts[0].data.pubDate.toUTCString()}</lastBuildDate>`,
		].join(''),
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: post.data.tags,
			link: `${base}/blog/${post.id}/`,
			customData: `<dc:creator>${escape(AUTHOR_NAME)}</dc:creator>`,
		})),
	});
}
