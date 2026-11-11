import { type Topic, topics } from '../data/topics';
import type { Post } from './posts';

export interface TopicGroup extends Topic {
	posts: Post[];
}

/** Topic hubs that have entries, in the order data/topics.ts lists them. */
export function groupByTopic(posts: Post[]): TopicGroup[] {
	return topics
		.map((topic) => ({ ...topic, posts: posts.filter((post) => post.data.tags.includes(topic.tag)) }))
		.filter((group) => group.posts.length > 0);
}

/** The hub a post most belongs to: its first tag that has one. */
export const primaryTopic = (post: Post): Topic | undefined => {
	for (const tag of post.data.tags) {
		const topic = topics.find((t) => t.tag === tag);
		if (topic) return topic;
	}
	return undefined;
};
