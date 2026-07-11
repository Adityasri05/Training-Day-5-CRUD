import https from 'https';
import { URL } from 'url';

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Get the path and query parameters from the request URL
  const path = req.url.replace(/^\/api/, '');
  const targetUrlStr = `https://training-day-8-mywood-deployment.onrender.com/api${path}`;
  const parsedUrl = new URL(targetUrlStr);

  const headers = {
    'accept': 'application/json',
    'content-type': 'application/json'
  };

  if (req.headers.authorization) {
    headers['authorization'] = req.headers.authorization;
  }

  const options = {
    hostname: parsedUrl.hostname,
    port: 443,
    path: parsedUrl.pathname + parsedUrl.search,
    method: req.method,
    headers: headers
  };

  const proxyReq = https.request(options, (proxyRes) => {
    let rawData = '';
    proxyRes.on('data', (chunk) => { rawData += chunk; });
    proxyRes.on('end', () => {
      res.status(proxyRes.statusCode);
      try {
        const parsed = JSON.parse(rawData);
        res.json(parsed);
      } catch (e) {
        res.send(rawData);
      }
    });
  });

  proxyReq.on('error', (e) => {
    console.error('Proxy request error:', e);
    res.status(500).json({ error: e.message });
  });

  // Write request body if present
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const bodyData = typeof req.body === 'object' ? JSON.stringify(req.body) : req.body;
    if (bodyData) {
      proxyReq.write(bodyData);
    }
  }

  proxyReq.end();
}
