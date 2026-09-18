const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const clean = (v, max = 300) => String(v || '').slice(0, max);
  const q = req.query || {};
  const attribution = new URLSearchParams();
  if (q.utm_source) attribution.set('utm_source', clean(q.utm_source, 120));
  if (q.utm_medium) attribution.set('utm_medium', clean(q.utm_medium, 120));
  if (q.utm_campaign) attribution.set('utm_campaign', clean(q.utm_campaign, 160));
  const buyPath = '/api/buy' + (attribution.toString() ? '?' + attribution.toString() : '');
  const file = path.join(process.cwd(), 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace('https://buy.stripe.com/7sYdR9gOqaoE5Ij6Zsgfu00', buyPath);
  console.log('QUOTECRAFT_PAGEVIEW', JSON.stringify({
    path: clean(req.url, 250),
    referrer: clean(req.headers.referer, 500),
    source: clean(q.utm_source, 120),
    medium: clean(q.utm_medium, 120),
    campaign: clean(q.utm_campaign, 160),
    userAgent: clean(req.headers['user-agent'], 300),
    ts: new Date().toISOString()
  }));
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(html);
};
