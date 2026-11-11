import sharp from 'sharp';
import type { Tone } from '../data/tags';

/**
 * Social cards (1200 × 630) drawn at build time, so every page has its own
 * preview image when a link is shared. The art is the same hashed South Texas
 * sunset the post covers use; the title is laid out by Pango, which wraps and
 * shrinks it to fit whatever serif the build machine has.
 */
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const PAPER = '#f4efe6';
const SURFACE = '#fffcf6';
const INK = '#1c1915';
const MUTED = '#6e665a';
const ACCENT = '#b8431c';

const TONES: Record<Exclude<Tone, 'neutral'>, string> = {
	agave: '#2b6a4d',
	dusk: '#5845ad',
	sky: '#1e5d95',
	rose: '#ae355f',
	gold: '#8a6210',
	clay: '#b0441d',
};

const SERIF = 'Georgia, Iowan Old Style, DejaVu Serif, Liberation Serif, serif';
const MONO = 'Menlo, DejaVu Sans Mono, Liberation Mono, monospace';

const escapeXml = (text: string) =>
	text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export interface CardOptions {
	/** Small uppercase line above the title, e.g. "No. 069 · Nov 2026". */
	label: string;
	title: string;
	tone: Exclude<Tone, 'neutral'>;
	/** Anything stable (a slug); it decides where the sun sits. */
	seed: string;
	/** Large italic numeral inside the art, e.g. "069". */
	numeral?: string;
}

function backdrop({ label, tone, seed, numeral }: CardOptions): string {
	let hash = 2166136261;
	for (const ch of seed) hash = Math.imul(hash ^ ch.charCodeAt(0), 16777619) >>> 0;
	const pick = (shift: number, min: number, span: number) => min + ((hash >>> shift) % span);

	const color = TONES[tone];
	// The art panel: x 760–1140, y 60–570.
	const panel = { x: 760, y: 60, w: 380, h: 510 };
	const horizon = panel.y + pick(0, 300, 50);
	const sun = { cx: panel.x + pick(5, 150, 150), r: pick(11, 78, 40) };
	const sunCy = horizon - pick(17, 0, 50);
	const bands = [6, 10, 16, 24, 36];

	let bandY = horizon + 14;
	const bandRects = bands
		.map((h, i) => {
			const rect = `<rect x="${panel.x}" y="${bandY}" width="${panel.w}" height="${h}" fill="${color}" opacity="${0.14 + i * 0.1}"/>`;
			bandY += h + 12;
			return rect;
		})
		.join('');
	const slits = [0.34, 0.55, 0.76]
		.map((t, i) => `<rect x="${panel.x}" y="${sunCy + sun.r * t - (6 - i * 2)}" width="${panel.w}" height="${6 - i * 1.5}" fill="url(#wash)"/>`)
		.join('');

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
	<defs>
		<linearGradient id="wash" x1="0" x2="0" y1="0" y2="1">
			<stop offset="0" stop-color="#f3e7da"/><stop offset="1" stop-color="#f3e7da"/>
		</linearGradient>
		<clipPath id="panel"><rect x="${panel.x}" y="${panel.y}" width="${panel.w}" height="${panel.h}" rx="28"/></clipPath>
	</defs>
	<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${PAPER}"/>
	<rect x="0" y="0" width="${OG_WIDTH}" height="10" fill="${ACCENT}"/>
	<g clip-path="url(#panel)">
		<rect x="${panel.x}" y="${panel.y}" width="${panel.w}" height="${panel.h}" fill="${SURFACE}"/>
		<rect x="${panel.x}" y="${panel.y}" width="${panel.w}" height="${panel.h}" fill="${color}" opacity="0.14"/>
		<circle cx="${sun.cx}" cy="${sunCy}" r="${sun.r}" fill="${color}" opacity="0.92"/>
		${slits}
		<rect x="${panel.x}" y="${horizon}" width="${panel.w}" height="${panel.y + panel.h - horizon}" fill="#f3e7da"/>
		<rect x="${panel.x}" y="${horizon}" width="${panel.w}" height="${panel.y + panel.h - horizon}" fill="${color}" opacity="0.06"/>
		${bandRects}
		${numeral ? `<text x="${panel.x + 34}" y="${panel.y + 118}" font-family="${SERIF}" font-style="italic" font-size="92" fill="${color}">${escapeXml(numeral)}</text>` : ''}
	</g>
	<rect x="${panel.x}" y="${panel.y}" width="${panel.w}" height="${panel.h}" rx="28" fill="none" stroke="${INK}" stroke-opacity="0.1"/>
	<text x="72" y="118" font-family="${MONO}" font-size="24" letter-spacing="3" fill="${ACCENT}">${escapeXml(label.toUpperCase())}</text>
	<rect x="72" y="514" width="56" height="56" rx="14" fill="${INK}"/>
	<text x="100" y="555" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="38" fill="${PAPER}">R</text>
	<text x="148" y="537" font-family="${SERIF}" font-size="28" fill="${INK}">Randall Torres</text>
	<text x="148" y="566" font-family="${MONO}" font-size="19" letter-spacing="1" fill="${MUTED}">randyventures.com</text>
</svg>`;
}

export async function renderCard(options: CardOptions): Promise<Buffer> {
	// Pango fits the title into this box, so long headlines shrink instead of overflowing.
	// Short ones ("AI") would balloon to fill it, so the fitted size is capped.
	const MAX_DPI = 860;
	const text = {
		text: `<span foreground="${INK}">${escapeXml(options.title)}</span>`,
		font: SERIF,
		width: 620,
		rgba: true,
		spacing: 4,
		wrap: 'word' as const,
	};
	let title = await sharp({ text: { ...text, height: 320 } }).png().toBuffer({ resolveWithObject: true });
	if ((title.info.textAutofitDpi ?? 0) > MAX_DPI) {
		title = await sharp({ text: { ...text, dpi: MAX_DPI } }).png().toBuffer({ resolveWithObject: true });
	}

	// Vertically centre the title in the space between the label and the byline.
	const top = Math.round(150 + (340 - title.info.height) / 2);

	return sharp(Buffer.from(backdrop(options)))
		.composite([{ input: title.data, left: 72, top }])
		.png({ compressionLevel: 9, palette: true, quality: 90 })
		.toBuffer();
}
