import { getPosts } from '../lib/posts';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getPosts();
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const site = new URL(`${base}/`, context.site);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site,
		items: posts.map((post) => ({
			...post.data,
			link: `${base}/blog/${post.id}/`,
		})),
	});
}
