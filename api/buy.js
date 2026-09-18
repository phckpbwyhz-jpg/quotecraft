module.exports = (req, res) => {
  const clean = (v, max = 300) => String(v || '').slice(0, max);
  const q = req.query || {};
  console.log('QUOTECRAFT_CHECKOUT_CLICK', JSON.stringify({
    referrer: clean(req.headers.referer, 500),
    source: clean(q.utm_source, 120),
    medium: clean(q.utm_medium, 120),
    campaign: clean(q.utm_campaign, 160),
    userAgent: clean(req.headers['user-agent'], 300),
    ts: new Date().toISOString()
  }));
  res.setHeader('Cache-Control', 'no-store');
  res.redirect(302, 'https://buy.stripe.com/7sYdR9gOqaoE5Ij6Zsgfu00');
};
