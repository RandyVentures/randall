import type { APIRoute, GetStaticPaths } from 'astro';
import { primaryTone, toneFor } from '../../data/tags';
import { topics } from '../../data/topics';
import { type CardOptions, renderCard } from '../../lib/og';
import { entryNumbers, getPosts, hasRasterHero } from '../../lib/posts';

/**
 * /og/<id>.png — one social card per page that has no photo of its own:
 * the site default, each topic hub, and every post without a raster hero.
 */
export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getPosts();
	const numbers = entryNumbers(posts);

	const cards: { id: string; card: CardOptions }[] = [
		{
			id: 'site',
			card: {
				label: 'Field notes · South Texas',
				title: 'Building technology, wealth, and a meaningful family life.',
				tone: 'clay',
				seed: 'site',
			},
		},
		{
			id: 'log',
			card: { label: 'The log', title: 'Every entry, newest first.', tone: 'clay', seed: 'log' },
		},
		...topics.map((topic) => {
			const tone = toneFor(topic.tag);
			return {
				id: `topic-${topic.tag}`,
				card: {
					label: 'Topic',
					title: topic.name,
					tone: tone === 'neutral' ? ('clay' as const) : tone,
					seed: topic.tag,
				},
			};
		}),
		...posts
			.filter((post) => !hasRasterHero(post))
			.map((post) => {
				const numeral = String(numbers.get(post.id)!).padStart(3, '0');
				const month = post.data.pubDate.toLocaleDateString('en-US', {
					month: 'short',
					year: 'numeric',
					timeZone: 'UTC',
				});
				return {
					id: post.id,
					card: {
						label: `No. ${numeral} · ${month}`,
						title: post.data.title,
						tone: primaryTone(post.data.tags),
						seed: post.id,
						numeral,
					},
				};
			}),
	];

	return cards.map(({ id, card }) => ({ params: { id }, props: { card } }));
};

export const GET: APIRoute = async ({ props }) => {
	const png = await renderCard(props.card as CardOptions);
	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
	});
};
