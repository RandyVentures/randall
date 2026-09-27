/**
 * Each core topic gets one tone from the palette in global.css. Secondary tags
 * (building, strategy, …) stay neutral so the colored ones keep meaning.
 */
export type Tone = 'agave' | 'dusk' | 'sky' | 'rose' | 'gold' | 'clay' | 'neutral';

const TAG_TONES: Record<string, Tone> = {
	apps: 'agave',
	ai: 'dusk',
	work: 'sky',
	family: 'rose',
	faith: 'gold',
	rentals: 'clay',
};

export const toneFor = (tag: string): Tone => TAG_TONES[tag] ?? 'neutral';

/** The tone a post's generated cover uses: its first colored tag, else clay. */
export function primaryTone(tags: string[]): Exclude<Tone, 'neutral'> {
	for (const tag of tags) {
		const tone = toneFor(tag);
		if (tone !== 'neutral') return tone;
	}
	return 'clay';
}
