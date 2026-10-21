import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, writeFile, stat, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { serveStaticFile } from './static-file.mjs';

test('video streaming supports seeking, suffixes, HEAD and invalid ranges', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'portfolio-range-'));
  const file = path.join(directory, 'clip.mp4');
  const data = Buffer.from('0123456789abcdef');
  await writeFile(file, data);
  const info = await stat(file);
  const server = createServer((req, res) => serveStaticFile(req, res, file, info, 'video/mp4'));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/clip.mp4`;
  try {
    for (const [range, expected, contentRange] of [
      ['bytes=0-1', '01', 'bytes 0-1/16'],
      ['bytes=10-', 'abcdef', 'bytes 10-15/16'],
      ['bytes=-3', 'def', 'bytes 13-15/16'],
      ['bytes=14-999', 'ef', 'bytes 14-15/16'],
    ]) {
      const res = await fetch(url, { headers: { Range: range } });
      assert.equal(res.status, 206);
      assert.equal(res.headers.get('Content-Type'), 'video/mp4');
      assert.equal(res.headers.get('Content-Range'), contentRange);
      assert.equal(await res.text(), expected);
    }
    const head = await fetch(url, { method: 'HEAD' });
    assert.equal(head.status, 200);
    assert.equal(head.headers.get('Content-Length'), '16');
    assert.equal(head.headers.get('Accept-Ranges'), 'bytes');
    assert.equal(await head.text(), '');
    for (const range of ['bytes=16-', 'bytes=-0', 'bytes=5-2', 'bytes=0-1,4-5']) {
      const res = await fetch(url, { headers: { Range: range } });
      assert.equal(res.status, 416);
      assert.equal(res.headers.get('Content-Range'), 'bytes */16');
      assert.equal(await res.text(), '');
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
    assert(path.resolve(directory).startsWith(path.resolve(tmpdir()) + path.sep));
    await rm(directory, { recursive: true, force: true });
  }
});
