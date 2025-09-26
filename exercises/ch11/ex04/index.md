### 型付き配列を用いた処理速度の比較
予想：Float64Arrayは通常の数値型を持つ配列なので、あまり通常と変わらない思われる。Float32Arrayの特徴は、要素の精度が低いことや数値の範囲が狭い代わりに必要なメモリが半分になることである。ゆえに、まず速度は普通の配列を用いるより早くなると考えられる。

結果：
Float64Array…
arrayMultiply: 575.9790000021458
typedArrayMultiply: 579.8207000009716

Float32Array…
arrayMultiply: 567.4915000014007
typedArrayMultiply: 566.9636000022292　←一番早い

Uint8Array…
arrayMultiply: 601.5784999988973
typedArrayMultiply: 570.8394000008702