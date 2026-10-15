// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://randyventures.com',
	// Sousbook help/legal pages are accessible by direct URL, not discovery surfaces.
	// /co/ is the short App Store privacy link: a redirect, so it is never indexable.
	integrations: [mdx(), sitemap({
		filter: (page) => {
			const path = new URL(page).pathname;
			return !path.startsWith('/sousbook/') && path !== '/co/';
		},
	})],
});
