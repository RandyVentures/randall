/**
 * Structured data shared by every page. Search engines and answer engines both
 * resolve "who wrote this, and on what site" through these two nodes, so they
 * carry stable @ids that every other schema on the site points back to.
 */
export const SITE_URL = 'https://randyventures.com';
export const AUTHOR_NAME = 'Randall Torres';

export const PERSON_ID = `${SITE_URL}/about/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;

export const personSchema = {
	'@type': 'Person',
	'@id': PERSON_ID,
	name: AUTHOR_NAME,
	alternateName: 'Randy Torres',
	url: absoluteUrl('/about/'),
	jobTitle: 'Principal Engineer',
	description:
		'Principal engineer in Architecture supporting AI and Payments teams, indie iOS app builder, and rental property investor in McAllen, Texas.',
	homeLocation: {
		'@type': 'Place',
		name: 'McAllen, Texas',
	},
	knowsAbout: [
		'iOS app development',
		'App Store optimization',
		'AI agents and automation',
		'Software architecture',
		'Rental property management',
	],
	sameAs: [
		'https://github.com/RandyVentures',
		'https://www.linkedin.com/in/randy-torres-987a3761',
		'https://apps.apple.com/us/developer/randy-torres/id1871953838',
		'https://randyverse768.gumroad.com',
	],
};

export const websiteSchema = (name: string, description: string) => ({
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	url: `${SITE_URL}/`,
	name,
	description,
	inLanguage: 'en-US',
	publisher: { '@id': PERSON_ID },
});

export interface Crumb {
	name: string;
	/** Site-relative path. */
	path: string;
}

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
	'@type': 'BreadcrumbList',
	itemListElement: crumbs.map((crumb, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: crumb.name,
		item: absoluteUrl(crumb.path),
	})),
});

/** An ordered list of posts, for hub pages (the log, a topic). */
export const postListSchema = (posts: { title: string; path: string }[]) => ({
	'@type': 'ItemList',
	numberOfItems: posts.length,
	itemListElement: posts.map((post, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: post.title,
		url: absoluteUrl(post.path),
	})),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
	'@type': 'FAQPage',
	mainEntity: faqs.map((faq) => ({
		'@type': 'Question',
		name: faq.q,
		acceptedAnswer: { '@type': 'Answer', text: faq.a },
	})),
});
