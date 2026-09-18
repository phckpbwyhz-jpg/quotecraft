export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const clean = (v, max = 300) => String(v || '').slice(0, max);
  const event = {
    type: body.type === 'checkout_click' ? 'checkout_click' : 'pageview',
    path: clean(body.path, 200),
    referrer: clean(body.referrer, 500),
    source: clean(body.source, 120),
    medium: clean(body.medium, 120),
    campaign: clean(body.campaign, 160),
    userAgent: clean(req.headers['user-agent'], 300),
    ts: new Date().toISOString()
  };
  console.log('QUOTECRAFT_EVENT', JSON.stringify(event));
  return res.status(204).end();
}
