import type { ImageMetadata } from 'astro';
import beanHunt from '../assets/apps/bean-hunt.jpg';
import catalyst from '../assets/apps/catalyst.jpg';
import colorFlood from '../assets/apps/color-flood.jpg';
import familyStop from '../assets/apps/familystop.jpg';
import fillin from '../assets/apps/fillin.jpg';
import gulp from '../assets/apps/gulp.jpg';
import rally from '../assets/apps/rally.jpg';
import realEstateManager from '../assets/apps/real-estate-manager.jpg';
import squareSweep from '../assets/apps/square-sweep.jpg';
import vaultRunner from '../assets/apps/vault-runner.jpg';

export interface AppEntry {
	name: string;
	tagline: string;
	category: string;
	url: string;
	icon: ImageMetadata;
}

export const apps: AppEntry[] = [
	{
		name: 'FamilyStop',
		tagline: 'Family restrooms and stops',
		category: 'Lifestyle',
		url: 'https://apps.apple.com/us/app/familystop/id6782247307',
		icon: familyStop,
	},
	{
		name: 'Gulp',
		tagline: 'Drink water, stop scrolling',
		category: 'Health & Fitness',
		url: 'https://apps.apple.com/us/app/gulp-hydration-app-blocker/id6777773350',
		icon: gulp,
	},
	{
		name: 'Rally',
		tagline: 'Pickleball live scoreboard & match stats',
		category: 'Sports',
		url: 'https://apps.apple.com/us/app/pickleball-score-keeper-rally/id6760594178',
		icon: rally,
	},
	{
		name: 'Bean Hunt',
		tagline: 'Coffee journal & cafe finder',
		category: 'Food & Drink',
		url: 'https://apps.apple.com/us/app/bean-hunt/id6760348691',
		icon: beanHunt,
	},
	{
		name: 'Vault Runner',
		tagline: 'Treasure escape roguelite',
		category: 'Games',
		url: 'https://apps.apple.com/us/app/vault-runner/id6781543334',
		icon: vaultRunner,
	},
	{
		name: 'Square Sweep',
		tagline: 'Minesweeper-style puzzle',
		category: 'Games',
		url: 'https://apps.apple.com/us/app/square-sweep/id6774044499',
		icon: squareSweep,
	},
	{
		name: 'Color Flood Conquest',
		tagline: 'Color fill brain puzzle',
		category: 'Games',
		url: 'https://apps.apple.com/us/app/color-flood-conquest/id6758901998',
		icon: colorFlood,
	},
	{
		name: 'Catalyst Chain Reaction',
		tagline: 'Fast chain reaction puzzle',
		category: 'Games',
		url: 'https://apps.apple.com/us/app/catalyst-chain-reaction/id6758815658',
		icon: catalyst,
	},
	{
		name: 'Fillin',
		tagline: 'Daily fill-in-the-blank word game',
		category: 'Games',
		url: 'https://apps.apple.com/us/app/fillin-word-brain-puzzle-game/id6758643692',
		icon: fillin,
	},
	{
		name: 'Real Estate Manager',
		tagline: 'Property management for small landlords',
		category: 'Finance',
		url: 'https://apps.apple.com/us/app/real-estate-manager-home/id6758280423',
		icon: realEstateManager,
	},
];

export const NOW_BUILDING = {
	name: 'FamilyStop',
	note: 'Growing FamilyStop — helping parents find family restrooms and stops on the go.',
	url: 'https://apps.apple.com/us/app/familystop/id6782247307',
};
