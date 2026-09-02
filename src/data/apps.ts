import type { ImageMetadata } from 'astro';
import beanHunt from '../assets/apps/bean-hunt.jpg';
import catalyst from '../assets/apps/catalyst.png';
import colorFlood from '../assets/apps/color-flood.jpg';
import familyStop from '../assets/apps/familystop.png';
import fillbook from '../assets/apps/fillbook.png';
import fillin from '../assets/apps/fillin.png';
import gulp from '../assets/apps/gulp.png';
import heirloom from '../assets/apps/heirloom.png';
import rally from '../assets/apps/rally.jpg';
import realEstateManager from '../assets/apps/real-estate-manager.png';
import riseAndCapy from '../assets/apps/rise-and-capy.png';
import squareSweep from '../assets/apps/square-sweep.jpg';
import vaultRunner from '../assets/apps/vault-runner.jpg';

export interface AppEntry {
	name: string;
	tagline: string;
	category: string;
	/** `live` is on sale today; `review` is submitted and waiting on Apple. */
	status: 'live' | 'review';
	/** Omitted while an app is still in review and has no public listing. */
	url?: string;
	icon: ImageMetadata;
}

export const apps: AppEntry[] = [
	{
		name: 'Rise & Capy',
		tagline: 'Capybara alarm clock with wake-up missions',
		category: 'Lifestyle',
		status: 'review',
		icon: riseAndCapy,
	},
	{
		name: 'Heirloom',
		tagline: 'Read and preserve old letters',
		category: 'Photo & Video',
		status: 'live',
		url: 'https://apps.apple.com/us/app/heirloom-old-letter-reader/id6792422170',
		icon: heirloom,
	},
	{
		name: 'Fillbook',
		tagline: 'Trading journal and review',
		category: 'Finance',
		status: 'live',
		url: 'https://apps.apple.com/us/app/fillbook-trading-journal/id6795599230',
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

export const NOW_BUILDING = {
	name: 'FamilyStop',
	note: 'Growing FamilyStop — helping parents find family restrooms and stops on the go.',
	url: 'https://apps.apple.com/us/app/familystop-family-restrooms/id6782247307',
};
