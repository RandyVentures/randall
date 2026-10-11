// Notify only public sitemap pages whose live HTML changed. Node 22+.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
export function publicURL(value, site) {
  const u = new URL(value);
  if (u.origin !== site.origin || u.username || u.password || u.search || u.hash || site.disallow.some(p => u.pathname.startsWith(p))) throw new Error(`Excluded URL: ${value}`);
  return u.href;
}
export function fingerprint(html) {
  // Ignore changing build assets and scripts; retain readable HTML + metadata.
  return createHash('sha256').update(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<link\b[^>]*(?:stylesheet|preload|modulepreload)[^>]*>/gi,'').replace(/\s+/g,' ').trim()).digest('hex');
}
export function noindex(html, header = '') {
  return /\bnoindex\b|\bnone\b/i.test(header) || [...html.matchAll(/<meta\b[^>]*>/gi)].some(([tag]) => /name\s*=\s*["'](?:robots|bingbot)["']/i.test(tag) && /content\s*=\s*["'][^"']*\b(?:noindex|none)\b/i.test(tag));
}
async function get(url, site) {
  for (let redirects = 0; redirects < 5; redirects++) {
    publicURL(url, site);
    const res = await fetch(url, {redirect:'manual', signal:AbortSignal.timeout(20000), headers:{'User-Agent':'RandyVentures-IndexNow/1.0'}});
    if ([301,302,303,307,308].includes(res.status)) { url = new URL(res.headers.get('location'),url).href; continue; }
    return res;
  }
  throw new Error('Too many redirects');
}
async function sitemapURLs(site) {
  const pending = [site.sitemap], seen = new Set(), urls = new Set();
  while (pending.length) {
    const url = pending.shift(); if (seen.has(url)) continue; seen.add(url);
    if (seen.size > 100) throw new Error('Sitemap limit exceeded');
    const res = await get(url,site); if (res.status !== 200) throw new Error(`Sitemap HTTP ${res.status}`);
    const xml = await res.text(); if (xml.length > 10000000) throw new Error('Sitemap too large');
    if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('Unsupported XML entities');
    const index = /<sitemapindex\b/i.test(xml);
    if (!index && !/<urlset\b/i.test(xml)) throw new Error('Not an XML sitemap');
    const locs = [...xml.matchAll(/<loc\b[^>]*>\s*([^<]+)\s*<\/loc>/gi)].map(m => m[1].trim().replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
    for (const loc of locs) { const valid = publicURL(loc,site); if (index) pending.push(valid); else urls.add(valid); }
    if (urls.size > 1000) throw new Error('Public page limit exceeded');
  }
  return urls;
}
async function main() {
  const send = process.argv.includes('--send');
  const sites = JSON.parse(await readFile(new URL('./sites.json',import.meta.url),'utf8'));
  const statePath = process.env.INDEXNOW_STATE_PATH || fileURLToPath(new URL('./state/pages.json',import.meta.url));
  let state = {}; try { state = JSON.parse(await readFile(statePath,'utf8')); } catch(e) { if(e.code !== 'ENOENT') throw e; }
  let failed = false;
  const report = [];
  for (const site of sites) {
    try {
      if (send) {
        const keyRes = await get(site.keyLocation,site);
        if(keyRes.status !== 200 || (await keyRes.text()).trim() !== site.key) throw new Error('Hosted key missing or incorrect');
      }
      const urls = await sitemapURLs(site), before = state[site.host] || {}, after = {...before}, changes = [];
      // Four concurrent GETs, only public sitemap URLs. Never enumerate user data.
      const list = [...urls];
      for(let i=0;i<list.length;i+=4) {
        const results = await Promise.all(list.slice(i,i+4).map(async url => {
          const res = await get(url,site);
          if(res.status !== 200 || !/text\/html/i.test(res.headers.get('content-type') || '')) throw new Error(`Public page HTTP ${res.status}: ${url}`);
          const html = await res.text();
          if(noindex(html,res.headers.get('x-robots-tag') || '')) return {url,excluded:true};
          return {url,hash:fingerprint(html)};
        }));
        for(const result of results) {
          if(result.excluded) { delete after[result.url]; continue; }
          if(before[result.url] !== result.hash) changes.push(result.url);
          after[result.url] = result.hash;
        }
      }
      // Sitemap removal alone does not prove deletion. Submit only confirmed 404/410.
      for(const url of Object.keys(before)) {
        if(urls.has(url)) continue;
        publicURL(url,site);
        const res = await get(url,site);
        if([404,410].includes(res.status)) changes.push(url);
        else if(res.status !== 200) throw new Error(`Removed page HTTP ${res.status}; retain state for retry`);
        delete after[url];
      }
      let status = null;
      if(send && changes.length) {
        const payload = {host:site.host,key:site.key,keyLocation:site.keyLocation,urlList:changes};
        const res = await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify(payload),signal:AbortSignal.timeout(20000)});
        status = res.status;
        if(![200,202].includes(status)) throw new Error(`IndexNow HTTP ${status}; state retained for retry`);
      }
      if(send) state[site.host] = after;
      const entry = {host:site.host,pages:urls.size,changed:changes.length,status,dryRun:!send};
      report.push(entry); console.log(JSON.stringify(entry));
    } catch(e) { failed = true; const entry={host:site.host,error:e.message};report.push(entry); console.error(JSON.stringify(entry)); }
  }
  if(send) { await mkdir(new URL('./state',import.meta.url),{recursive:true}); await writeFile(statePath,JSON.stringify(state,null,2)+'\n'); }
  await writeFile(new URL('./last-run.json',import.meta.url),JSON.stringify({time:new Date().toISOString(),send,report},null,2)+'\n');
  if(failed) process.exitCode = 1;
}
if(process.argv[1] === fileURLToPath(import.meta.url)) await main();
