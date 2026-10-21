import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { test } from 'node:test';
import { createLeadHandler } from './lead-api.mjs';

async function withServer(handler, run) {
  const server = createServer((req, res) => void handler(req, res));
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    await run(`http://127.0.0.1:${server.address().port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

function post(url, body) {
  return fetch(`${url}/api/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

test('valid lead is delivered to the configured Telegram chat', async () => {
  let sent;
  const handler = createLeadHandler({
    getConfig: () => ({ token: 'test-token', chatId: '-1001234567890' }),
    fetchImpl: async (url, options) => {
      sent = { url, ...JSON.parse(options.body) };
      return { ok: true, json: async () => ({ ok: true }) };
    },
  });
  await withServer(handler, async (url) => {
    const response = await post(url, { firstName: 'Madaminbek', lastName: 'Ikramov', phone: '+998 93 675 13 99' });
    assert.equal(response.status, 200);
    assert.equal(sent.chat_id, '-1001234567890');
    assert.match(sent.text, /Madaminbek/);
    assert.match(sent.text, /\+998 93 675 13 99/);
    assert.match(sent.url, /\/sendMessage$/);
  });
});

test('invalid phone never reaches Telegram', async () => {
  let calls = 0;
  const handler = createLeadHandler({
    getConfig: () => ({ token: 'test-token', chatId: '123' }),
    fetchImpl: async () => { calls += 1; },
  });
  await withServer(handler, async (url) => {
    const response = await post(url, { firstName: 'Test', lastName: 'User', phone: '123' });
    assert.equal(response.status, 400);
    assert.equal(calls, 0);
  });
});

test('a body parsed by Vercel works after the request stream is consumed', async () => {
  let calls = 0;
  const handler = createLeadHandler({
    getConfig: () => ({ token: 'test-token', chatId: '123' }),
    fetchImpl: async () => {
      calls += 1;
      return { ok: true, json: async () => ({ ok: true }) };
    },
  });
  await withServer(async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    req.body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    await handler(req, res);
  }, async (url) => {
    const response = await post(url, { firstName: 'Test', lastName: 'User', phone: '+998 90 123 45 67' });
    assert.equal(response.status, 200);
    assert.equal(calls, 1);
  });
});

test('an oversized parsed body is rejected before Telegram delivery', async () => {
  const handler = createLeadHandler({ getConfig: () => ({}) });
  await withServer(async (req, res) => {
    req.body = { firstName: 'A'.repeat(8192) };
    await handler(req, res);
  }, async (url) => {
    const response = await post(url, {});
    assert.equal(response.status, 413);
    assert.equal((await response.json()).code, 'too_large');
  });
});

test('missing Telegram configuration does not claim delivery', async () => {
  const handler = createLeadHandler({ getConfig: () => ({}) });
  await withServer(handler, async (url) => {
    const response = await post(url, { firstName: 'Test', lastName: 'User', phone: '+998 90 123 45 67' });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, 'not_configured');
  });
});

test('Telegram rejection is shown as a delivery failure', async () => {
  const handler = createLeadHandler({
    getConfig: () => ({ token: 'test-token', chatId: '-1001234567890' }),
    fetchImpl: async () => ({ ok: false, json: async () => ({ ok: false }) }),
  });
  await withServer(handler, async (url) => {
    const response = await post(url, { firstName: 'Test', lastName: 'User', phone: '+998 90 123 45 67' });
    assert.equal(response.status, 502);
    assert.equal((await response.json()).code, 'delivery_failed');
  });
});

test('Telegram write restrictions are reported as an unavailable form', async () => {
  for (const rejection of [
    { ok: false, error_code: 403 },
    { ok: false, error_code: 400, description: 'Bad Request: not enough rights to send text messages to the chat' },
  ]) {
    const handler = createLeadHandler({
      getConfig: () => ({ token: 'test-token', chatId: '123' }),
      fetchImpl: async () => ({ ok: false, json: async () => rejection }),
    });
    await withServer(handler, async (url) => {
      const response = await post(url, { firstName: 'Test', lastName: 'User', phone: '+998 90 123 45 67' });
      assert.equal(response.status, 503);
      assert.deepEqual(await response.json(), { ok: false, code: 'delivery_forbidden' });
    });
  }
});
