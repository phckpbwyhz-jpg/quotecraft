module.exports = async (req, res) => {
  const key = '5a046475-8f6d-4c83-86f7-87edea8c78e8';
  const urls = [
    'https://quotecraft-azure.vercel.app/',
    'https://quotecraft-azure.vercel.app/cleaning-business-pricing-calculator.html',
    'https://quotecraft-azure.vercel.app/commercial-cleaning-bid-calculator.html',
    'https://quotecraft-azure.vercel.app/junk-removal-pricing-calculator.html',
    'https://quotecraft-azure.vercel.app/holiday-light-installation-pricing-calculator.html'
  ];
  const results = [];
  for (const url of urls) {
    try {
      const endpoint = 'https://api.indexnow.org/indexnow?url=' + encodeURIComponent(url) + '&key=' + key;
      const r = await fetch(endpoint);
      results.push({ url, status: r.status, ok: r.ok });
    } catch (e) {
      results.push({ url, error: String(e && e.message || e) });
    }
  }
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ results });
};
