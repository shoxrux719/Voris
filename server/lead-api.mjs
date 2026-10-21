import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { fetchTelegram } from './telegram-fetch.mjs';

// Telegram requests must always verify the remote certificate.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

const envPath = fileURLToPath(new URL('../.env', import.meta.url));

function telegramConfig() {
  let local = {};
  try {
    const lines = readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\s*(TELEGRAM_BOT_TOKEN|TELEGRAM_CHAT_ID)\s*=\s*(.*?)\s*$/);
      if (match) local[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return {
    token: process.env.TELEGRAM_BOT_TOKEN || local.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID || local.TELEGRAM_CHAT_ID,
  };
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  const chunks = [];
  let length = 0;
  let tooLarge = false;
  for await (const chunk of req) {
    length += chunk.length;
    if (length > 8192) tooLarge = true;
    if (!tooLarge) chunks.push(chunk);
  }
  if (tooLarge) return { error: 'too_large' };
  try {
    return { value: JSON.parse(Buffer.concat(chunks).toString('utf8')) };
  } catch {
    return { error: 'invalid_json' };
  }
}

function cleanName(value) {
  if (typeof value !== 'string') return null;
  const name = value.trim().replace(/\s+/g, ' ');
  if (name.length < 1 || name.length > 80 || !/^[\p{L}\p{M}][\p{L}\p{M}\s'‘’ʻ.-]*$/u.test(name)) return null;
  return name;
}

function cleanPhone(value) {
  if (typeof value !== 'string') return null;
  const phone = value.trim();
  if (!/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(phone)) return null;
  return phone;
}

export function createLeadHandler({ getConfig = telegramConfig, fetchImpl = fetchTelegram, now = Date.now } = {}) {
  const attempts = new Map();

  return async function handleLead(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      sendJson(res, 405, { ok: false, code: 'method_not_allowed' });
      return;
    }
    if (!String(req.headers['content-type'] || '').startsWith('application/json')) {
      sendJson(res, 415, { ok: false, code: 'unsupported_media_type' });
      return;
    }

    let parsed;
    try {
      parsed = await readJson(req);
    } catch {
      sendJson(res, 400, { ok: false, code: 'invalid_request' });
      return;
    }
    if (parsed.error) {
      sendJson(res, parsed.error === 'too_large' ? 413 : 400, { ok: false, code: parsed.error });
      return;
    }
    const body = parsed.value;
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      sendJson(res, 400, { ok: false, code: 'invalid_request' });
      return;
    }
    if (body.website) {
      sendJson(res, 200, { ok: true });
      return;
    }
    const firstName = cleanName(body.firstName);
    const lastName = cleanName(body.lastName);
    const phone = cleanPhone(body.phone);
    if (!firstName || !lastName || !phone) {
      sendJson(res, 400, { ok: false, code: 'invalid_fields' });
      return;
    }

    const { token, chatId } = getConfig();
    if (!token || !chatId) {
      sendJson(res, 503, { ok: false, code: 'not_configured' });
      return;
    }

    const address = req.socket.remoteAddress || 'unknown';
    const cutoff = now() - 10 * 60 * 1000;
    const recent = (attempts.get(address) || []).filter((time) => time > cutoff);
    if (recent.length >= 5) {
      sendJson(res, 429, { ok: false, code: 'rate_limited' });
      return;
    }
    attempts.set(address, [...recent, now()]);

    const message = `📩 Новая заявка с портфолио\n\nИмя: ${firstName}\nФамилия: ${lastName}\nТелефон: ${phone}`;
    try {
      const telegram = await fetchImpl(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
        signal: AbortSignal.timeout(10000),
      });
      const result = await telegram.json();
      if (!telegram.ok || result.ok !== true) throw new Error('telegram_rejected');
      sendJson(res, 200, { ok: true });
    } catch {
      sendJson(res, 502, { ok: false, code: 'delivery_failed' });
    }
  };
}

export const handleLead = createLeadHandler();
