import { cache, slowFn } from "./index.js";

describe("cache関数", () => {
    
  test("consoleでキャッシュ動作を確認", () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const cachedSlowFn = cache(slowFn);
    const obj1 = { x: 2, y: 3 };
    
    // 1回目の呼び出し
    cachedSlowFn(obj1);
    expect(consoleSpy).toHaveBeenCalledWith('計算してキャッシュに保存: {"x":2,"y":3}');
    
    // 2回目の呼び出し
    cachedSlowFn(obj1);
    expect(consoleSpy).toHaveBeenCalledWith('cacheから取得: {"x":2,"y":3}');
    
    consoleSpy.mockRestore(); // スパイをクリーンアップ
  });

  test("slowFnを変更", () => {
    function slowFibonacci(obj) {
      const n = obj.n;
      if (n <= 1) return n;
      return slowFibonacci({ n: n - 1 }) + slowFibonacci({ n: n - 2 });
    }
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const cachedSlowFn = cache(slowFibonacci);
    const obj1 = { n: 5 };
    
    // 1回目の呼び出し
    cachedSlowFn(obj1);
    expect(consoleSpy).toHaveBeenCalledWith('計算してキャッシュに保存: {"n":5}');

    // 2回目の呼び出し
    cachedSlowFn(obj1);
    expect(consoleSpy).toHaveBeenCalledWith('cacheから取得: {"n":5}');

    consoleSpy.mockRestore(); // スパイをクリーンアップ
  });

});
