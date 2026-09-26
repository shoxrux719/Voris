import type { IncomingMessage, ServerResponse } from 'node:http';

export declare function createLeadHandler(options?: {
  getConfig?: () => { token?: string; chatId?: string };
  fetchImpl?: typeof fetch;
  now?: () => number;
}): (req: IncomingMessage, res: ServerResponse) => Promise<void>;

export declare const handleLead: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
