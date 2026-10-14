// Run from your site root:  node builder-server.js
// Serves your site on http://localhost:8080 and lets the builder save HTML files.
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = process.cwd(), PORT = process.env.PORT || 8080;
const MIME = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.json':'application/json',
  '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp',
  '.gif':'image/gif', '.mp4':'video/mp4', '.webm':'video/webm', '.ico':'image/x-icon', '.woff2':'font/woff2' };

http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);

  if (req.method === 'POST' && url === '/api/save') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { name, html } = JSON.parse(body);
        const safe = String(name).toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/^-+|-+$/g, '');
        if (!safe) throw new Error('Invalid file name');
        const file = path.join(ROOT, safe + '.html');
        if (fs.existsSync(file)) fs.copyFileSync(file, path.join(ROOT, safe + '.backup.html'));
        fs.writeFileSync(file, html);
        res.end(JSON.stringify({ ok: true, url: '/' + safe + '.html' }));
      } catch (e) { res.statusCode = 400; res.end(JSON.stringify({ ok: false, error: e.message })); }
    });
    return;
  }

  let file = path.join(ROOT, url === '/' ? 'index.html' : url);
  if (!file.startsWith(ROOT)) { res.statusCode = 403; return res.end('Forbidden'); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';
  fs.readFile(file, (err, data) => {
    if (err) { res.statusCode = 404; return res.end('Not found'); }
    res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
}).listen(PORT, () => console.log(`Builder: http://localhost:${PORT}/builder.html`));
