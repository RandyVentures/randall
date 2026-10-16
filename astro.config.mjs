// @ts-check

import { readdirSync, readFileSync } from 'node:fs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// Bing and Google use <lastmod> to decide what to re-crawl, so give each blog post its real date
// (updatedDate if set, otherwise pubDate) and leave every other page without one.
const blogDates = new Map();
for (const file of readdirSync('./src/content/blog')) {
	if (!/\.mdx?$/.test(file)) continue;
	const text = readFileSync(`./src/content/blog/${file}`, 'utf8');
	const pick = (key) => text.match(new RegExp(`^${key}:\\s*['"]?([^'"\\n]+?)['"]?\\s*$`, 'm'))?.[1];
	const date = new Date(pick('updatedDate') ?? pick('pubDate') ?? '');
	if (!Number.isNaN(date.valueOf())) blogDates.set(file.replace(/\.mdx?$/, ''), date.toISOString());
}

// https://astro.build/config
export default defineConfig({
	site: 'https://randyventures.com',
	// Sousbook help/legal pages are accessible by direct URL, not discovery surfaces.
	// /co/ is the short App Store privacy link: a redirect, so it is never indexable.
	integrations: [mdx(), sitemap({
		serialize(item) {
			const slug = new URL(item.url).pathname.match(/^\/blog\/([^/]+)\/$/)?.[1];
			const lastmod = slug && blogDates.get(slug);
			return lastmod ? { ...item, lastmod } : item;
		},
		filter: (page) => {
			const path = new URL(page).pathname;
			return !path.startsWith('/sousbook/') && path !== '/co/';
		},
	})],
});
