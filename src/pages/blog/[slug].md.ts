import type { APIRoute, GetStaticPaths } from 'astro';
import { type Post, getPosts, postUrl } from '../../lib/posts';
import { AUTHOR_NAME, absoluteUrl } from '../../lib/seo';

/**
 * /blog/<slug>.md — the entry as plain Markdown, for AI assistants and anyone
 * who wants to paste it somewhere. The HTML page links here with
 * <link rel="alternate" type="text/markdown">, and robots.txt keeps these
 * copies out of Google and Bing so they never compete with the real page.
 */
export const getStaticPaths: GetStaticPaths = async () =>
	(await getPosts()).map((post) => ({ params: { slug: post.id }, props: { post } }));

const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** MDX bodies carry imports and components; keep the words, drop the machinery. */
function plainMarkdown(body: string): string {
	return body
		.replace(/^import\s.+$/gm, '')
		.replace(/^<[A-Z][\w.]*[^>]*\/>\s*$/gm, '')
		// Images imported from src/assets have no public URL; keep their description.
		.replace(/!\[([^\]]*)\]\(\.\.?\/[^)]*\)/g, (_, alt: string) => (alt ? `*[Image: ${alt}]*` : ''))
		.replace(/\]\((\/[^)\s]*)\)/g, (_, path: string) => `](${absoluteUrl(path)})`)
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

export const GET: APIRoute = ({ props }) => {
	const post = props.post as Post;
	const { title, description, pubDate, updatedDate, tags, takeaways, faqs } = post.data;

	const parts = [
		`# ${title}`,
		`> ${description}`,
		[
			`- Author: ${AUTHOR_NAME}`,
			`- Published: ${isoDate(pubDate)}`,
			updatedDate ? `- Updated: ${isoDate(updatedDate)}` : '',
			tags.length ? `- Topics: ${tags.join(', ')}` : '',
			`- Canonical URL: ${absoluteUrl(postUrl(post.id))}`,
		]
			.filter(Boolean)
			.join('\n'),
		takeaways.length ? `## The short version\n\n${takeaways.map((point) => `- ${point}`).join('\n')}` : '',
		'---',
		plainMarkdown(post.body ?? ''),
		faqs.length ? `## Quick answers\n\n${faqs.map((faq) => `### ${faq.q}\n\n${faq.a}`).join('\n\n')}` : '',
	];

	return new Response(`${parts.filter(Boolean).join('\n\n')}\n`, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
};
