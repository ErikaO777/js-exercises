import { jest } from '@jest/globals';
import { retryWithExponentialBackoff } from "./index.js";

// jest.fn()でモック関数の作成
describe("retryWithExponentialBackoff関数のテスト", () => {
    test("false → true", (done) => {
        const mockFunc = jest.fn().mockReturnValueOnce(Promise.resolve(false)).mockReturnValueOnce(Promise.resolve(true));
        retryWithExponentialBackoff(mockFunc, 3, (result) => {
            expect(result).toBe(true);
            expect(mockFunc).toHaveBeenCalledTimes(2);
            done();
        });
    });

    test("false → false → false", (done) => {
        const mockFunc = jest.fn().mockReturnValue(Promise.resolve(false));
        retryWithExponentialBackoff(mockFunc, 3, (result) => {
            expect(result).toBe(false);
            expect(mockFunc).toHaveBeenCalledTimes(4);
            done();
        });
    });

    test("true", (done) => {
        const mockFunc = jest.fn().mockReturnValue(Promise.resolve(true));
        retryWithExponentialBackoff(mockFunc, 3, (result) => {
            expect(result).toBe(true);
            expect(mockFunc).toHaveBeenCalledTimes(1);
            done();
        });
    });
});

