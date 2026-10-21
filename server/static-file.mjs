import { createReadStream } from 'node:fs';

export function serveStaticFile(req, res, file, info, contentType) {
  const size = info.size;
  const headers = { 'Content-Type': contentType, 'Accept-Ranges': 'bytes', 'Content-Length': size };
  let start = 0;
  let end = size - 1;
  let status = 200;
  if (req.method === 'GET' && req.headers.range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    let valid = !!match && !!(match[1] || match[2]) && size > 0;
    if (valid) {
      if (!match[1]) {
        const suffix = Number(match[2]);
        valid = Number.isSafeInteger(suffix) && suffix > 0;
        start = Math.max(0, size - suffix);
      } else {
        start = Number(match[1]);
        end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
        valid = Number.isSafeInteger(start) && Number.isSafeInteger(end) && start < size && start <= end;
      }
    }
    if (!valid) {
      res.writeHead(416, { ...headers, 'Content-Range': `bytes */${size}`, 'Content-Length': 0 }).end();
      return;
    }
    status = 206;
    headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
    headers['Content-Length'] = end - start + 1;
  }
  res.writeHead(status, headers);
  if (req.method === 'HEAD' || size === 0) { res.end(); return; }
  const stream = createReadStream(file, { start, end });
  stream.on('error', () => res.destroy());
  res.once('close', () => stream.destroy());
  stream.pipe(res);
}
