const https = require('https');

module.exports = async (req, res) => {
  const host = 'quotecraft-azure.vercel.app';
  const key = '5a046475-8f6d-4c83-86f7-87edea8c78e8';
  const urlList = [
    `https://${host}/`,
    `https://${host}/service-job-pricing-calculator.html`,
    `https://${host}/cleaning-business-pricing-calculator.html`,
    `https://${host}/online-cleaning-quote-calculator.html`,
    `https://${host}/commercial-cleaning-bid-calculator.html`,
    `https://${host}/mobile-detailing-pricing-calculator.html`,
    `https://${host}/handyman-pricing-calculator.html`,
    `https://${host}/pressure-washing-pricing-calculator.html`,
    `https://${host}/pressure-washing-price-per-square-foot.html`,
    `https://${host}/pool-service-pricing-calculator.html`,
    `https://${host}/lawn-care-pricing-calculator.html`,
    `https://${host}/leaf-removal-pricing-calculator.html`,
    `https://${host}/gutter-cleaning-pricing-calculator.html`,
    `https://${host}/holiday-light-installation-pricing-calculator.html`,
    `https://${host}/junk-removal-pricing-calculator.html`,
    `https://${host}/how-to-price-service-jobs.html`
  ];

  const payload = JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList
  });

  const result = await new Promise((resolve, reject) => {
    const request = https.request({
      hostname: 'api.indexnow.org',
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, response => {
      let body = '';
      response.on('data', chunk => body += chunk);
      response.on('end', () => resolve({ status: response.statusCode, body }));
    });
    request.on('error', reject);
    request.write(payload);
    request.end();
  });

  res.status(result.status || 500).json({ submitted: urlList.length, indexNowStatus: result.status, body: result.body });
};
