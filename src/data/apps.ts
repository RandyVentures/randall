import type { ImageMetadata } from 'astro';
import beanHunt from '../assets/apps/bean-hunt.jpg';
import catalyst from '../assets/apps/catalyst.png';
import colorFlood from '../assets/apps/color-flood.jpg';
import familyStop from '../assets/apps/familystop.png';
import fillbook from '../assets/apps/fillbook.png';
import fillin from '../assets/apps/fillin.png';
import glora from '../assets/apps/glora.png';
import gulp from '../assets/apps/gulp.png';
import heirloom from '../assets/apps/heirloom.png';
import hypeLap from '../assets/apps/hypelap.png';
import rally from '../assets/apps/rally.jpg';
import realEstateManager from '../assets/apps/real-estate-manager.png';
import riseAndCapy from '../assets/apps/rise-and-capy.png';
import sousbook from '../assets/apps/sousbook.png';
import squareSweep from '../assets/apps/square-sweep.jpg';
import vaultRunner from '../assets/apps/vault-runner.jpg';
import whileWereHere from '../assets/apps/while-were-here.png';

export interface AppEntry {
	name: string;
	tagline: string;
	category: string;
	/** `live` is available; `review` awaits Apple; `coming-soon` is announced. */
	status: 'live' | 'review' | 'coming-soon';
	/** Omitted when an app has no public listing. */
	url?: string;
	/** Landing page on this site; the shelf links here so the page earns the search traffic. */
	page?: string;
	icon: ImageMetadata;
}

export const apps: AppEntry[] = [
	{
		name: 'Sousbook',
		tagline: 'Recipe organizer and personal cookbook for iPhone and iPhone Duo',
		category: 'Food & Drink',
		status: 'live',
		url: 'https://apps.apple.com/us/app/sousbook/id6821456373',
		page: '/sousbook/',
		icon: sousbook,
	},
	{
		name: 'HypeLap',
		tagline: 'Live race tracking and cheers for runners',
		category: 'Sports',
		status: 'live',
		url: 'https://apps.apple.com/us/app/hypelap-race-tracker-cheers/id6818382550',
		icon: hypeLap,
	},
	{
		name: 'Glora: My Upkeep',
		tagline: 'Track beauty and self-care routines',
		category: 'Lifestyle',
		status: 'live',
		url: 'https://apps.apple.com/us/app/glora-my-upkeep/id6808841943',
		icon: glora,
	},
	{
		name: 'Rise & Capy',
		tagline: 'Capybara alarm clock with wake-up missions',
		category: 'Lifestyle',
		status: 'live',
		url: 'https://apps.apple.com/us/app/rise-capy/id6804264261',
		icon: riseAndCapy,
	},
	{
		name: "While We're Here",
		tagline: 'Conversation cards for real tables',
		category: 'Lifestyle',
		status: 'live',
		url: 'https://apps.apple.com/us/app/while-were-here/id6810424599',
		page: '/while-were-here/',
		icon: whileWereHere,
	},
	{
		name: 'Heirloom',
		tagline: 'Read and preserve old letters',
		category: 'Photo & Video',
		status: 'live',
		url: 'https://apps.apple.com/us/app/heirloom-old-letter-reader/id6792422170',
		page: '/heirloom/',
		icon: heirloom,
	},
	{
		name: 'Fillbook',
		tagline: 'Trading journal and review',
		category: 'Finance',
		status: 'live',
		url: 'https://apps.apple.com/us/app/fillbook-trading-journal/id6795599230',
		page: '/fillbook/',
		icon: fillbook,
	},
	{
		name: 'FamilyStop',
		tagline: 'Family restrooms and stops',
		category: 'Lifestyle',
		status: 'live',
		url: 'https://apps.apple.com/us/app/familystop-family-restrooms/id6782247307',
		icon: familyStop,
	},
	{
		name: 'Gulp',
		tagline: 'Drink water, stop scrolling',
		category: 'Health & Fitness',
		status: 'live',
		url: 'https://apps.apple.com/us/app/gulp-hydration-app-blocker/id6777773350',
		icon: gulp,
	},
	{
		name: 'Rally',
		tagline: 'Pickleball live scoreboard & match stats',
		category: 'Sports',
		status: 'live',
		url: 'https://apps.apple.com/us/app/pickleball-score-keeper-rally/id6760594178',
		icon: rally,
	},
	{
		name: 'Bean Hunt',
		tagline: 'Coffee journal & cafe finder',
		category: 'Food & Drink',
		status: 'live',
		url: 'https://apps.apple.com/us/app/bean-hunt/id6760348691',
		page: '/bean-hunt/',
		icon: beanHunt,
	},
	{
		name: 'Vault Runner',
		tagline: 'Treasure escape roguelite',
		category: 'Games',
		status: 'live',
		url: 'https://apps.apple.com/us/app/vault-runner/id6781543334',
		icon: vaultRunner,
	},
	{
		name: 'Square Sweep',
		tagline: 'Minesweeper-style puzzle',
		category: 'Games',
		status: 'live',
		url: 'https://apps.apple.com/us/app/square-sweep/id6774044499',
		icon: squareSweep,
	},
	{
		name: 'Color Flood Conquest',
		tagline: 'Color fill brain puzzle',
		category: 'Games',
		status: 'live',
		url: 'https://apps.apple.com/us/app/color-flood-conquest/id6758901998',
		icon: colorFlood,
	},
	{
		name: 'Catalyst Chain Reaction',
		tagline: 'Fast chain reaction puzzle',
		category: 'Games',
		status: 'live',
		url: 'https://apps.apple.com/us/app/catalyst-chain-reaction/id6758815658',
		icon: catalyst,
	},
	{
		name: 'Fillin',
		tagline: 'Daily fill-in-the-blank word game',
		category: 'Games',
		status: 'live',
		url: 'https://apps.apple.com/us/app/fillin-guess-the-missing-word/id6758643692',
		icon: fillin,
	},
	{
		name: 'Real Estate Manager',
		tagline: 'Property management for small landlords',
		category: 'Business',
		status: 'live',
		url: 'https://apps.apple.com/us/app/rental-manager-rent-taxes/id6758280423',
		icon: realEstateManager,
	},
];

export const liveApps = apps.filter((app) => app.status === 'live');

/** The grid reads better split by kind than as one large wall of cards. */
export const appGroups = [
	{ label: 'Apps & tools', entries: apps.filter((app) => app.category !== 'Games') },
	{ label: 'Games', entries: apps.filter((app) => app.category === 'Games') },
].filter((group) => group.entries.length > 0);

export const RECENTLY_SHIPPED = {
	name: 'Sousbook',
	note: 'Sousbook is live on the App Store — our first app with iPhone Duo support.',
};

export interface ProductSite {
	name: string;
	/** Matches an `apps` entry when the product also has an App Store listing and icon. */
	appName?: string;
	description: string;
	status: 'live' | 'coming-soon';
	/** The product's own website. */
	site: string;
	/** Text for the link to the product's own website. */
	siteLabel: string;
}

/** Product destinations linked from /apps, including dedicated pages on this site. */
export const productSites: ProductSite[] = [
	{
		name: 'Sousbook',
		appName: 'Sousbook',
		description: 'A recipe organizer and personal cookbook for iPhone and iPhone Duo. Save website recipes, scan printed pages, build grocery lists, and follow cooking steps with ingredients beside them on the wider display.',
		status: 'live',
		site: 'https://randyventures.com/sousbook/',
		siteLabel: 'Sousbook recipe organizer for iPhone and iPhone Duo',
	},
	{
		name: 'Mandalo',
		description: 'Payment links for local service businesses. Send by text or email, get paid by card or Apple Pay, and track paid and pending jobs in one dashboard.',
		status: 'live',
		site: 'https://getmandalo.net',
		siteLabel: 'Mandalo payment links for local service businesses',
	},
	{
		name: 'Manifest',
		description: 'App Store analytics for solo developers: downloads, proceeds, subscriptions, release health, and every review from every storefront.',
		status: 'live',
		site: 'https://usemanifest.net',
		siteLabel: 'Manifest App Store analytics for solo developers',
	},
	{
		name: 'Heirloom',
		appName: 'Heirloom',
		description: 'Read old handwritten letters and cursive with AI transcription, a modernized version, English translation, and Read Aloud.',
		status: 'live',
		site: 'https://readheirloom.com',
		siteLabel: 'Heirloom old letter reader for iPhone',
	},
	{
		name: 'Glora',
		appName: 'Glora: My Upkeep',
		description: 'Track beauty and self-care routines and share your wishlist so someone can make your day.',
		status: 'live',
		site: 'https://myglora.app',
		siteLabel: 'Glora beauty and self-care upkeep tracker',
	},
	{
		name: 'Bean Hunt',
		appName: 'Bean Hunt',
		description: 'A coffee journal and cafe finder for logging every cup you try.',
		status: 'live',
		site: 'https://www.beanhunt.app/',
		siteLabel: 'Bean Hunt coffee journal and cafe finder',
	},
	{
		name: 'HypeLap',
		appName: 'HypeLap',
		description: 'Live race tracking where friends cheer you on with air horns and voice notes in your earbuds. iPhone and Apple Watch, Houston first.',
		status: 'live',
		site: 'https://hypelap.com',
		siteLabel: 'HypeLap live race tracking with cheers',
	},
];

export interface WebApp {
	name: string;
	/** Short headline shown beside the name. */
	tagline: string;
	/** What it is, in one plain sentence. */
	summary: string;
	/** Who it is for, shown as a label and used as schema.org audience. */
	audience: string;
	/** schema.org applicationCategory. */
	category: string;
	/** Matches an `apps` entry so the card can reuse its icon. */
	appName?: string;
	/** Global data-tone hook for the card accent. */
	tone: 'agave' | 'dusk' | 'sky' | 'rose' | 'gold' | 'clay';
	highlights: string[];
	site: string;
	/** Deep links worth sending readers (and crawlers) to, with descriptive anchor text. */
	links: { label: string; href: string }[];
}

/** Products that run in a browser. Listed on /webapps with descriptive links into each site. */
export const webApps: WebApp[] = [
	{
		name: 'Mandalo',
		tagline: 'Get paid by text',
		audience: 'Local service businesses',
		category: 'FinanceApplication',
		tone: 'agave',
		highlights: ['Card and Apple Pay checkout', 'Send by text or email', 'Paid and pending jobs in one dashboard'],
		summary:
			'Payment links for local service businesses. Create a link, text or email it, and get paid by card or Apple Pay, with paid and pending jobs in one dashboard.',
		site: 'https://getmandalo.net',
		links: [
			{ label: 'Lawn care invoice template', href: 'https://getmandalo.net/templates/lawn-care-invoice-template' },
			{ label: 'Snow removal invoice template', href: 'https://getmandalo.net/templates/snow-removal-invoice-template' },
			{ label: 'Payment reminder text messages', href: 'https://getmandalo.net/templates/payment-reminder-text-messages' },
			{ label: 'Zelle vs Cash App vs Venmo for small business', href: 'https://getmandalo.net/compare/cash-app-vs-venmo-vs-zelle-for-small-business' },
			{ label: 'Credit card fee calculator', href: 'https://getmandalo.net/tools/credit-card-fee-calculator' },
		],
	},
	{
		name: 'Manifest',
		tagline: 'App Store analytics, all of it',
		audience: 'Solo iOS developers',
		category: 'BusinessApplication',
		tone: 'dusk',
		highlights: ['Downloads, proceeds and subscriptions', 'Every review from every storefront', 'History past the 14-day limit'],
		summary:
			'App Store analytics for solo developers: downloads, proceeds, subscriptions and every review from every storefront, without the 14-day limit.',
		site: 'https://usemanifest.net',
		links: [
			{ label: 'An App Annie alternative for solo developers', href: 'https://usemanifest.net/appannie-alternative' },
			{ label: 'Why App Store Connect only shows 14 days', href: 'https://usemanifest.net/app-store-connect-only-shows-14-days' },
			{ label: 'App Store Connect zero downloads, explained', href: 'https://usemanifest.net/app-store-connect-zero-downloads' },
		],
	},
	{
		name: 'Heirloom on the web',
		tagline: 'Read old letters and cursive',
		audience: 'Family historians and genealogists',
		category: 'UtilitiesApplication',
		appName: 'Heirloom',
		tone: 'gold',
		highlights: ['Cursive to text from a photo', 'Modernized version and English translation', 'Kurrent and Sütterlin support'],
		summary:
			'Read old handwritten letters and cursive online. Heirloom turns scans and photos into text you can check, with a modern version and English translation.',
		site: 'https://readheirloom.com',
		links: [
			{ label: 'Cursive transcription online', href: 'https://readheirloom.com/cursive-to-text' },
			{ label: 'How to read old handwritten letters', href: 'https://readheirloom.com/guides/how-to-read-old-handwritten-letters' },
			{ label: 'How to date an old letter', href: 'https://readheirloom.com/guides/how-to-date-an-old-letter' },
			{ label: 'Kurrent and Sütterlin reading guide', href: 'https://readheirloom.com/guides/reading-german-kurrent-and-suetterlin' },
		],
	},
	{
		name: 'HypeLap',
		tagline: 'Live race tracking with cheers',
		audience: 'Runners, run clubs and race spectators',
		category: 'SportsApplication',
		appName: 'HypeLap',
		tone: 'rose',
		highlights: ['Follow a runner live in any browser', 'No app or account for spectators', 'Cheers delivered to the runner’s earbuds'],
		summary:
			'Live race tracking where friends watch your rank in any browser and cheer you on. Spectators need no app and no account.',
		site: 'https://hypelap.com',
		links: [
			{ label: 'Live race tracking', href: 'https://hypelap.com/live-race-tracking' },
			{ label: 'Houston running races calendar', href: 'https://hypelap.com/houston-running-races' },
			{ label: 'How to follow a runner live', href: 'https://hypelap.com/how-to-follow-a-runner-live' },
			{ label: 'Run club group races', href: 'https://hypelap.com/run-club-group-races' },
		],
	},
];
