import supertest from 'supertest';
import { serve } from './index.js';
import path from 'path';

const app = serve(path.resolve('./exercises/ch16/ex09/static'), 0);

describe('GET)', () => {
    test('存在しないパスは404', async () => {
        const res = await supertest(app).get('/__no_such__');
        expect(res.status).toBe(404);
        expect(res.text).toContain('Not Found');
        expect(res.headers['content-type']).toMatch(/text\/plain/);
    });
});


describe('POST', () => {
    test('200 としてリクエスト内容を返す', async () => {
        const body = 'hello';
        const res = await supertest(app)
            .post('/test/mirror?x=1')
            .set('X-Test', '123')
            .send(body);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/text\/plain/);

        // 先頭行にメソッドとURLが含まれているか
        expect(res.text).toMatch(/^POST\s+\/test\/mirror\?x=1\s+HTTP\/\d\.\d\r?\n/);
        // ヘッダ
        expect(res.text).toMatch(/x-test:\s*123/i);
        // 本文
        expect(res.text.endsWith(body)).toBe(true);
    });
});
