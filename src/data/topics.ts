/**
 * Topics with their own page at /topics/<slug>/. A tag earns a hub once enough
 * entries share it; one-off tags stay as filters on the log so the site never
 * publishes a thin page with a single link on it.
 */
export interface Topic {
	/** The tag as written in post frontmatter; also the URL slug. */
	tag: string;
	/** Heading on the hub page. */
	name: string;
	/** One sentence for <meta description> and the topic index. */
	description: string;
	/** The paragraph a reader (or an answer engine) sees first on the hub. */
	intro: string;
}

export const topics: Topic[] = [
	{
		tag: 'apps',
		name: 'Apps',
		description:
			'Notes from building and shipping a portfolio of small iOS apps as a solo developer: launches, App Store data, pricing, and what actually moved downloads.',
		intro:
			'I build small iOS apps on nights and weekends and write down what happens: what shipped, what App Store Connect said afterward, which changes helped, and which ones were a waste of a weekend.',
	},
	{
		tag: 'building',
		name: 'Building in public',
		description:
			'The working notes behind the products: decisions, trade-offs, launches, and the unglamorous work between an idea and a release.',
		intro:
			'These entries are about the work itself. How a product goes from an idea to something people can download, the decisions made along the way, and the parts that took longer than they should have.',
	},
	{
		tag: 'ai',
		name: 'AI',
		description:
			'How a principal engineer actually uses AI: agents, assistants, automation, guardrails, and the workflows that survived contact with real work.',
		intro:
			'I use AI every day, at work and on my own products. These entries cover the setups that held up, the guardrails I put around them, and the places where the tools still fall short.',
	},
	{
		tag: 'rentals',
		name: 'Rental properties',
		description:
			'Plain-English guides for self-managing landlords: tracking expenses, leases, maintenance and contractors, plus Schedule E, deductions, 1099s and cap rate.',
		intro:
			'I manage my own rental properties in South Texas. These are the guides I wanted when I started: how to keep the records straight during the year so that tax season is mostly copying totals. They are general guides, not tax advice.',
	},
	{
		tag: 'taxes',
		name: 'Landlord taxes',
		description:
			'Schedule E line by line, which rental expenses are deductible, and when a landlord owes a contractor a 1099, written for self-managing landlords.',
		intro:
			'The tax side of owning a rental: what goes on Schedule E, what counts as a deduction, and when a contractor needs a 1099. Written for landlords with a few properties. General guidance only, so confirm your situation with a tax professional.',
	},
	{
		tag: 'iphone-duo',
		name: 'iPhone Duo',
		description:
			'Building for the iPhone Duo: measured screen sizes and safe areas, layout notes for developers, how to tell if an app is ready, and first impressions of the hardware.',
		intro:
			'I have been building apps for the iPhone Duo since before it shipped. These entries collect what I measured, what Apple documents, how I adapted my own apps, and what living with the phone is like.',
	},
	{
		tag: 'marketing',
		name: 'Marketing',
		description:
			'Marketing small apps without a big budget: short video, UGC-style ads, real costs, and the experiments that did and did not work.',
		intro:
			'Getting a small app seen is harder than building it. These entries cover the marketing experiments I have run, what they cost, and what I would repeat.',
	},
	{
		tag: 'video',
		name: 'Short video',
		description:
			'Making short promotional video for apps: tools, costs, formats, and a repeatable process for one developer.',
		intro:
			'Short video is the cheapest way I have found to show an app working. These entries cover how I make it, what it costs, and how one recording becomes several posts.',
	},
	{
		tag: 'strategy',
		name: 'Strategy',
		description:
			'How to decide what to build next: portfolio strategy for small apps, when to improve an app, and reading signals from reviews and data.',
		intro:
			'With limited hours, choosing what to work on matters more than how fast I work. These entries are about making those choices for a portfolio of small apps.',
	},
	{
		tag: 'business',
		name: 'Business',
		description:
			'The business side of side projects: revenue, pricing, small-business lessons, and building income beyond a paycheck.',
		intro:
			'Apps and rentals are both small businesses. These entries cover the numbers and the lessons from running them alongside a full-time job.',
	},
	{
		tag: 'work',
		name: 'Work',
		description:
			'Notes from a principal engineer in Architecture supporting AI and Payments teams: long days, lessons, and growing in the role.',
		intro:
			'My day job is principal engineer in Architecture, supporting the AI and Payments teams. These entries are about that work: what I am learning, what went wrong, and how I am trying to get better at it.',
	},
	{
		tag: 'family',
		name: 'Family',
		description:
			'The reason for all of it: weekends, birthdays, trips, and trying to stay present with a wife and four kids while building on the side.',
		intro:
			'Ambition only matters if it helps me show up better at home. These entries are the family side of the log: the trips, the birthdays, and the ordinary weeks.',
	},
	{
		tag: 'faith',
		name: 'Faith',
		description:
			'Gratitude, perspective, and the faith that sits underneath the work and the family life.',
		intro:
			'Faith runs underneath the rest of this log. These entries are where it comes to the surface.',
	},
	{
		tag: 'life',
		name: 'Life',
		description: 'Everything that is not work or code: seasons, routines, and check-ins along the way.',
		intro: 'Check-ins on the rest of life, written as it happens.',
	},
];

const byTag = new Map(topics.map((topic) => [topic.tag, topic]));

export const topicFor = (tag: string) => byTag.get(tag);
export const topicUrl = (tag: string) => `/topics/${tag}/`;

/** Where a tag chip should go: its hub when it has one, else the filtered log. */
export const tagUrl = (tag: string) =>
	byTag.has(tag) ? topicUrl(tag) : `/blog/?tag=${encodeURIComponent(tag)}`;
