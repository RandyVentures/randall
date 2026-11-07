import { test } from 'node:test';
import assert from 'node:assert/strict';
import { publicURL, fingerprint, noindex } from './sweep.mjs';
const site={origin:'https://getmandalo.net',disallow:['/pay/','/api/','/merchant']};
test('refuses private payment links and cross-host sitemap URLs',()=>{
  for(const u of ['https://getmandalo.net/pay/token','https://getmandalo.net/api/pay/token','https://getmandalo.net/merchant','https://evil.test/','https://getmandalo.net/?token=secret','https://getmandalo.net/#token']) assert.throws(()=>publicURL(u,site));
  assert.equal(publicURL('https://getmandalo.net/resources',site),'https://getmandalo.net/resources');
});
test('detects content changes without resubmitting for script changes',()=>{
  assert.equal(fingerprint('<h1>Hello</h1><script>build1</script>'),fingerprint('<h1>Hello</h1><script>build2</script>'));
  assert.notEqual(fingerprint('<h1>Hello</h1>'),fingerprint('<h1>Updated</h1>'));
});
test('does not submit noindex pages or headers',()=>{
  assert.equal(noindex('<meta content="noindex,follow" name="robots">'),true);
  assert.equal(noindex('<meta name="bingbot" content="none">'),true);
  assert.equal(noindex('<h1>Public</h1>','noindex'),true);
  assert.equal(noindex('<meta name="robots" content="index,follow">'),false);
});
