import { handleLead } from '../server/lead-api.mjs';

export default async function handler(req, res) {
  try {
    await handleLead(req, res);
  } catch {
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, code: 'server_error' }));
  }
}
