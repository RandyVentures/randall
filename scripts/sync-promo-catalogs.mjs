import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const developerId = 1871953838;
const catalogs = [
  { name: 'beanhunt', ownId: '6760348691' },
  { name: 'capyplop', ownId: '6826951884' },
];
// Add an App Store ID here to opt a title out of automatic inclusion.
const excludedIds = new Set([]);
const site = 'https://randyventures.com';
const lookup = 'https://itunes.apple.com/lookup?id=1871953838&entity=software&country=us&limit=200';

async function download(url, limit) {
  const response = await fetch(url, {
    redirect: 'error',
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok || !response.body) throw new Error(`HTTP ${response.status} from ${url}`);

  const chunks = [];
  let size = 0;
  for await (const chunk of response.body) {
    size += chunk.byteLength;
    if (size > limit) throw new Error(`Response exceeded ${limit} bytes from ${url}`);
    chunks.push(chunk);
  }
  return Buffer.concat(chunks, size);
}

function storeURL(value, id) {
  const url = new URL(value);
  if (url.origin !== 'https://apps.apple.com' ||
      !new RegExp(`^/us/app/(?:[^/]+/)?id${id}$`).test(url.pathname)) {
    throw new Error('Unexpected App Store product URL');
  }
  return new URL(url.pathname, url.origin);
}

function artworkURL(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || !/^is\d+-ssl\.mzstatic\.com$/.test(url.hostname) ||
      url.port || url.username || url.password) {
    throw new Error('Unexpected App Store artwork URL');
  }
  return url;
}

function hasCurrentFourPlusRating(html) {
  const matches = [...html.matchAll(/"type":"contentRating","key":"contentRating","content":\{"contentRating":"([^"]+)"\}/g)];
  return matches.length === 1 && matches[0][1] === '4+';
}

function catalogEntry(app, name, id, prefix) {
  return {
    id,
    name,
    headline: `Discover ${name} on the App Store.`,
    beats: [`Meet ${name}.`, 'From Randy Ventures.', 'Take a look on the App Store.'],
    category: (app.primaryGenreName || 'Apps').slice(0, 40),
    minimumAge: 4,
    artwork: `${site}/promos/icons/${id}.png`,
    campaignToken: `${prefix}_${id}`,
  };
}

export async function syncPromoCatalogs(dist, fetchBytes = download) {
  const promoDir = join(dist, 'promos');
  const sources = await Promise.all(catalogs.map(async (config) => {
    const path = join(promoDir, `${config.name}-v1.json`);
    return { ...config, path, data: JSON.parse(await readFile(path, 'utf8')), changed: false };
  }));
  const inventory = JSON.parse(await fetchBytes(lookup, 4_000_000));
  const rows = inventory.results;
  if (!Array.isArray(rows) || rows.length !== inventory.resultCount ||
      !rows.some(row => row.artistId === developerId && row.trackId === 6760348691)) {
    throw new Error('Incomplete or unexpected developer inventory');
  }

  const icons = new Map();
  let appsAdded = 0;
  for (const app of rows) {
    if (app.wrapperType !== 'software' || app.artistId !== developerId ||
        app.trackContentRating !== '4+' ||
        !Number.isFinite(Date.parse(app.releaseDate)) || Date.parse(app.releaseDate) > Date.now()) continue;
    const id = String(app.trackId);
    const name = app.trackName?.trim();
    if (!/^\d{9,12}$/.test(id) || excludedIds.has(id) || !name ||
        name.length > 80 || /[<>\p{Cc}]/u.test(name)) continue;

    const targets = sources.filter(source => source.ownId !== id && !source.data.apps.some(entry => entry.id === id));
    if (!targets.length) continue;
    const page = await fetchBytes(storeURL(app.trackViewUrl, id), 12_000_000);
    if (!hasCurrentFourPlusRating(page.toString('utf8'))) {
      console.log(`Skipped ${id}: the product page did not verify a current 4+ rating`);
      continue;
    }

    const additions = targets.map(source => {
      const entry = catalogEntry(app, name, id, source.name);
      const data = { ...source.data, apps: [...source.data.apps, entry] };
      if (data.apps.length > 60 || Buffer.byteLength(JSON.stringify(data, null, 2)) >= 95_000) {
        throw new Error(`${source.name} reached its installed clients' catalog limit`);
      }
      return { source, data };
    });
    const iconPath = join(promoDir, 'icons', `${id}.png`);
    const existingIcon = await stat(iconPath).catch(error => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (!existingIcon) {
      const original = await fetchBytes(artworkURL(app.artworkUrl512), 2_000_000);
      const image = await sharp(original, { limitInputPixels: 2_000_000 })
        .resize(512, 512, { fit: 'inside', withoutEnlargement: true }).png().toBuffer();
      if (image.byteLength > 2_000_000) throw new Error(`Artwork is too large for ${id}`);
      icons.set(id, image);
    }

    appsAdded += 1;
    for (const { source, data } of additions) {
      source.data = data;
      source.changed = true;
      console.log(`Added ${id} to ${source.name}: ${name}`);
    }
  }

  if (icons.size) await mkdir(join(promoDir, 'icons'), { recursive: true });
  for (const [id, image] of icons) await writeFile(join(promoDir, 'icons', `${id}.png`), image);
  for (const { path, data, changed } of sources) {
    if (changed) await writeFile(path, JSON.stringify(data, null, 2) + '\n');
  }
  return appsAdded;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const added = await syncPromoCatalogs(process.argv[2] ?? 'dist');
  console.log(`Promo sync complete: ${added} distinct apps added`);
}
