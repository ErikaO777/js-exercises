import { retryWithExponentialBackoff } from "./index.js";

// jest.fn()でモック関数の作成
describe("retryWithExponentialBackoff関数のテスト", () => {
  test("false → true", (done) => {
    const mockFunc = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(true);
    retryWithExponentialBackoff(mockFunc, 3, (result) => {
      expect(result).toBe(true);
      expect(mockFunc).toHaveBeenCalledTimes(2);
      done();
    });
  });

  test("false → false → false", (done) => {
    const mockFunc = jest.fn().mockReturnValue(false);
    retryWithExponentialBackoff(mockFunc, 3, (result) => {
      expect(result).toBe(false);
      expect(mockFunc).toHaveBeenCalledTimes(4);
      done();
    });
  });

  test("true", (done) => {
    const mockFunc = jest.fn().mockReturnValue(true);
    retryWithExponentialBackoff(mockFunc, 3, (result) => {
      expect(result).toBe(true);
      expect(mockFunc).toHaveBeenCalledTimes(1);
      done();
    });
  });
});

    