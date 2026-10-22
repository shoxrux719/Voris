import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleLead } from './lead-api.mjs';
import { serveStaticFile } from './static-file.mjs';

const distRoot = path.resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const port = Number(process.env.PORT) || 4173;
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.m4s': 'video/mp4',
  '.m3u8': 'application/vnd.apple.mpegurl',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm',
};

createServer(async (req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }

  if (pathname === '/api/lead') {
    try {
      await handleLead(req, res);
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' }).end('{"ok":false,"code":"server_error"}');
    }
    return;
  }
  if (pathname.startsWith('/api/')) {
    res.writeHead(404).end();
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  let file = path.resolve(distRoot, `.${pathname === '/' ? '/index.html' : pathname}`);
  if (file !== distRoot && !file.startsWith(`${distRoot}${path.sep}`)) {
    res.writeHead(403).end();
    return;
  }
  let info;
  try {
    info = await stat(file);
    if (!info.isFile()) throw new Error('not a file');
  } catch {
    if (path.extname(pathname)) {
      res.writeHead(404).end();
      return;
    }
    file = path.join(distRoot, 'index.html');
    try {
      info = await stat(file);
    } catch {
      res.writeHead(503).end('Run npm run build first.');
      return;
    }
  }
  serveStaticFile(req, res, file, info, mime[path.extname(file).toLowerCase()] || 'application/octet-stream');
}).listen(port, () => {
  console.log(`Portfolio server ready at http://localhost:${port}`);
});
