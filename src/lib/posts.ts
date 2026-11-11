import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const withBase = (path: string) => path.startsWith('/') ? path : `/${path}`;
export const postUrl = (id: string) => withBase(`/blog/${id}/`);

// A fixed build time also lets local checks exercise scheduled release boundaries.
const buildTime = new Date(import.meta.env.BLOG_BUILD_TIME || Date.now());
if (Number.isNaN(buildTime.valueOf())) throw new Error('Invalid BLOG_BUILD_TIME');

/** Released posts, newest first. All public surfaces use this list. */
export async function getPosts(): Promise<Post[]> {
	return (await getCollection('blog', (post) =>
		!post.data.publishAt || post.data.publishAt.valueOf() <= buildTime.valueOf(),
	)).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

/**
 * Entries are numbered in the order they were written, so the first post is
 * No. 001 and the number never changes when newer posts land on top.
 */
export function entryNumbers(posts: Post[]): Map<string, number> {
	return new Map(posts.map((post, index) => [post.id, posts.length - index]));
}

const RASTER = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif']);

/** Social platforms will not render an SVG preview, so SVG heroes get a generated card instead. */
export const hasRasterHero = (post: Post) =>
	Boolean(post.data.heroImage && RASTER.has(post.data.heroImage.format));

/** Site-relative path of the generated social card for a post without a photo. */
export const ogCardPath = (id: string) => withBase(`/og/${id}.png`);

export const wordCount = (post: Post) => post.body?.split(/\s+/).filter(Boolean).length ?? 0;

export const formatEntry = (n: number) => `No. ${String(n).padStart(3, '0')}`;

export function readingTime(post: Post): number {
	return Math.max(1, Math.round(wordCount(post) / 220));
}

/** Titles morph between list and article through a shared view-transition name. */
export const titleTransition = (id: string) => `view-transition-name: t-${id}`;
