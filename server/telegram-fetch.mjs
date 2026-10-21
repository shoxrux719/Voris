import { execFile } from 'node:child_process';
import { request } from 'node:https';
import { rootCertificates } from 'node:tls';
import { promisify } from 'node:util';

const run = promisify(execFile);
let trustedCertificates;

async function certificateAuthorities() {
  if (process.platform !== 'win32') return undefined;
  trustedCertificates ??= run('powershell.exe', [
    '-NoProfile', '-NonInteractive', '-Command',
    "Get-ChildItem -Path Cert:\\LocalMachine\\Root,Cert:\\CurrentUser\\Root | Sort-Object Thumbprint -Unique | ForEach-Object { '-----BEGIN CERTIFICATE-----'; [Convert]::ToBase64String($_.RawData, [Base64FormattingOptions]::InsertLineBreaks); '-----END CERTIFICATE-----' }",
  ], { windowsHide: true, timeout: 5000, maxBuffer: 4 * 1024 * 1024 }).then(({ stdout }) => {
    if (!stdout.includes('-----BEGIN CERTIFICATE-----')) throw new Error('System certificates unavailable');
    return [...rootCertificates, stdout];
  }).catch(() => undefined);
  return trustedCertificates;
}

// Keep TLS verification enabled, including when Windows trusts a local proxy CA.
export async function fetchTelegram(url, { method, headers, body, signal }) {
  const ca = await certificateAuthorities();
  return new Promise((resolve, reject) => {
    const req = request(url, {
      method,
      headers: { ...headers, 'Content-Length': Buffer.byteLength(body) },
      signal,
      ...(ca ? { ca } : {}),
    }, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('error', reject);
      res.on('end', () => resolve({
        ok: res.statusCode >= 200 && res.statusCode < 300,
        json: async () => JSON.parse(Buffer.concat(chunks).toString('utf8')),
      }));
    });
    req.on('error', reject);
    req.end(body);
  });
}
