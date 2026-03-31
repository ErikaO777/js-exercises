import { Polly } from '@pollyjs/core';
import FetchAdapter from '@pollyjs/adapter-fetch';
import FSPersister from '@pollyjs/persister-fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const recordingsDir = path.join(__dirname, '__recordings__');
console.log('recordingsDir:', recordingsDir);
// Polly.register(NodeHttpAdapter);
Polly.register(FetchAdapter);
Polly.register(FSPersister);

export function setupPolly(name) {
    const polly = new Polly(name, {
        adapters: ['fetch'],
        persister: 'fs',
        persisterOptions: {
            fs: {
                recordingsDir: recordingsDir,
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

    // 録画保存前にトークンを除去するフック
    polly.server.any().on('beforePersist', (req, recording) => {
        // request ヘッダーから authorization を除去
        recording.request.headers = recording.request.headers.filter(
            (h) => h.name.toLowerCase() !== 'authorization'
        );
    });

    return polly;
}