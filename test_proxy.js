const http = require('http');
const https = require('https');
const { HttpsProxyAgent } = require('https-proxy-agent');

const apiKey = 'ffe24a20562c72ad79c68dda905812f3';
const proxyUrl = `http://scraperapi:${apiKey}@proxy-server.scraperapi.com:8001`;

console.log('Testing proxy:', proxyUrl);

const agent = new HttpsProxyAgent(proxyUrl);

https.get('https://amprem.irfanjawa.com/dashboard/generator', { agent, rejectUnauthorized: false }, (res) => {
  console.log('Status Code:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Response Title:', data.match(/<title>(.*?)<\/title>/)?.[1] || 'No Title');
    console.log('Data Length:', data.length);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
