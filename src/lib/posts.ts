import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string) => `${base}${path}`;
export const postUrl = (id: string) => withBase(`/blog/${id}/`);

/** Every post, newest first. The rest of the site assumes this order. */
export async function getPosts(): Promise<Post[]> {
	return (await getCollection('blog')).sort(
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

export const formatEntry = (n: number) => `No. ${String(n).padStart(3, '0')}`;

export function readingTime(post: Post): number {
	const words = post.body?.split(/\s+/).filter(Boolean).length ?? 0;
	return Math.max(1, Math.round(words / 220));
}

/** Titles morph between list and article through a shared view-transition name. */
export const titleTransition = (id: string) => `view-transition-name: t-${id}`;
