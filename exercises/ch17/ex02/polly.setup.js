import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

Polly.register(NodeHttpAdapter);
Polly.register(FetchAdapter);
Polly.register(FSPersister);

export function setupPolly(name) {
    const polly = new Polly(name, {
        adapters: ['fetch', 'node-http'],
        persister: 'fs',
        persisterOptions: {
            fs: {
                recordingsDir: path.join(__dirname, '__recordings__'),
            },
        },
        recordIfMissing: false,
        recordFailedRequests: false,
        mode: 'replay',
        matchRequestsBy: {
            headers: false,     // authorizationヘッダーの差異を無視
            body: false,        // bodyの差異を無視
            order: false,       // リクエスト順序を無視
            url: {
                protocol: true,
                username: true,
                password: true,
                hostname: true,
                port: true,
                pathname: true,
                query: true,
                hash: false,
            },
        },
    });
    return polly;
}