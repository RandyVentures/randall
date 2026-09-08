export interface PlaybookEntry {
	name: string;
	tagline: string;
	/** What the reader should already have before this one is useful. */
	forWhom: string;
	price: string;
	url: string;
}

/** The Gumroad playbooks, in the order someone would actually work through them. */
export const playbooks: PlaybookEntry[] = [
	{
		name: 'Solo iOS App Launch System',
		tagline: 'Turn one clear problem into a smaller v1, a verified release, and a sensible next decision.',
		forWhom: 'Start here if you are still deciding what to build.',
		price: '$39',
		url: 'https://randyverse768.gumroad.com/l/solo-app-launch-system',
	},
	{
		name: 'Ship the Backend',
		tagline: 'One real iOS feature taken across the boundary to a tested, deployed .NET API.',
		forWhom: 'For a working local app that now needs an API and a database.',
		price: '$79',
		url: 'https://randyverse768.gumroad.com/l/ship-the-backend',
	},
	{
		name: 'The Short Video Factory',
		tagline: 'Turn real app footage into short video you can actually publish on a schedule.',
		forWhom: 'For an app that works but needs a repeatable way to show it.',
		price: '$59',
		url: 'https://randyverse768.gumroad.com/l/short-video-factory',
	},
];
