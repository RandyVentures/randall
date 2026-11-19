/**
 * Real App Store ratings for SoftwareApplication structured data.
 *
 * Google only treats an app as a rich result when it carries an aggregateRating
 * or review, and those must reflect real ratings. This reads the public iTunes
 * lookup at build time and returns a rating only when the U.S. storefront has
 * at least one. Apps without ratings get none; nothing is ever invented. If the
 * lookup fails, the build continues without a rating.
 */
const cache = new Map<string, Promise<AggregateRating | undefined>>();

export interface AggregateRating {
	'@type': 'AggregateRating';
	ratingValue: number;
	ratingCount: number;
	bestRating: 5;
	worstRating: 1;
}

async function lookup(appStoreId: string): Promise<AggregateRating | undefined> {
	try {
		const res = await fetch(`https://itunes.apple.com/lookup?id=${encodeURIComponent(appStoreId)}&country=us`, {
			signal: AbortSignal.timeout(10000),
		});
		if (!res.ok) return undefined;
		const app = (await res.json()).results?.[0];
		const count = Number(app?.userRatingCount);
		const value = Number(app?.averageUserRating);
		if (!Number.isFinite(count) || count < 1 || !Number.isFinite(value) || value < 1) return undefined;
		return {
			'@type': 'AggregateRating',
			ratingValue: Math.round(value * 10) / 10,
			ratingCount: count,
			bestRating: 5,
			worstRating: 1,
		};
	} catch {
		return undefined;
	}
}

export function appStoreRating(appStoreId: string): Promise<AggregateRating | undefined> {
	if (!cache.has(appStoreId)) cache.set(appStoreId, lookup(appStoreId));
	return cache.get(appStoreId)!;
}
