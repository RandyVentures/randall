import type { APIRoute } from 'astro';
import { SITE_DESCRIPTION } from '../consts';
import { liveApps } from '../data/apps';
import { topicUrl } from '../data/topics';
import { getPosts } from '../lib/posts';
import { AUTHOR_NAME, absoluteUrl } from '../lib/seo';
import { groupByTopic } from '../lib/topics';

/**
 * /llms.txt — a plain-Markdown map of the site for AI assistants and answer
 * engines (https://llmstxt.org). Every entry links to its Markdown copy, so an
 * agent can read a post without parsing the page around it.
 */
export const GET: APIRoute = async () => {
	const posts = await getPosts();
	const groups = groupByTopic(posts);
	const line = (post: (typeof posts)[number]) =>
		`- [${post.data.title}](${absoluteUrl(`/blog/${post.id}.md`)}): ${post.data.description}`;

	// Each post is listed once, under the first topic that claims it.
	const listed = new Set<string>();
	const sections = groups
		.map((group) => {
			const fresh = group.posts.filter((post) => !listed.has(post.id));
			fresh.forEach((post) => listed.add(post.id));
			return fresh.length ? `## ${group.name}\n\n${group.intro}\n\n${fresh.map(line).join('\n')}` : '';
		})
		.filter(Boolean);
	const rest = posts.filter((post) => !listed.has(post.id));

	const body = [
		`# ${AUTHOR_NAME} — Field notes from South Texas`,
		`> ${SITE_DESCRIPTION}`,
		[
			`${AUTHOR_NAME} (Randy) is a principal engineer in Architecture supporting AI and Payments teams, an indie iOS app developer, and a self-managing rental property owner in McAllen, Texas. This site is his public log: ${posts.length} dated, first-person entries, newest first.`,
			'Entries are written from direct experience. The rental and tax guides are general information, not tax advice. Dates matter: check each entry’s publication date before relying on a number.',
		].join('\n\n'),
		[
			'## Start here',
			'',
			`- [About ${AUTHOR_NAME}](${absoluteUrl('/about/')}): who writes this and why`,
			`- [The log](${absoluteUrl('/blog/')}): every entry, newest first`,
			`- [Topics](${absoluteUrl('/topics/')}): the log by subject`,
			`- [Apps](${absoluteUrl('/apps/')}): the iOS apps, with links to each one`,
			`- [RSS feed](${absoluteUrl('/rss.xml')}): new entries as they are published`,
		].join('\n'),
		[
			'## Topic pages',
			'',
			...groups.map(
				(group) => `- [${group.name}](${absoluteUrl(topicUrl(group.tag))}): ${group.description}`,
			),
		].join('\n'),
		...sections,
		rest.length ? `## Other entries\n\n${rest.map(line).join('\n')}` : '',
		[
			'## Apps',
			'',
			...liveApps.map((app) =>
				`- [${app.name}](${app.page ? absoluteUrl(app.page) : (app.url ?? absoluteUrl('/apps/'))}): ${app.tagline}`,
			),
		].join('\n'),
	]
		.filter(Boolean)
		.join('\n\n');

	return new Response(`${body}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
