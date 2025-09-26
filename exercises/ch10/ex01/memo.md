### エラー
>npx webpack --mode=none ./ch10/ex01/index.cjs -o ./ch10/ex01/dist
asset main.js 3.03 KiB [emitted] (name: main)
./ch10/ex01/index.cjs 327 bytes [built] [code generated]
./ch10/ex01/stats.cjs 841 bytes [built] [code generated]
./ch10/ex01/sets.cjs 7.82 KiB [built] [code generated] [1 error]

ERROR in ./ch10/ex01/sets.cjs 4:0
Module parse failed: 'import' and 'export' may appear only with 'sourceType: module' (4:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|  * AbstractSet クラスでは、has() 抽象メソッドのみを定義する。
|  */
> export class AbstractSet {
|   // このメソッドではエラーをスローする。このようにすることで、
|   // サブクラスでこのメソッドを定義しなければならないようにする。
 @ ./ch10/ex01/index.cjs 3:15-43

webpack 5.101.3 compiled with 1 error in 94 ms

### webpackそれぞれモードの意味
mode: "none"（何もしない）
最も素の状態でビルド。最適化（圧縮や高速化など）など一切行われない。

mode: "development"（開発用）
開発に便利な設定が自動で有効になる。
コードは圧縮されず、ソースマップ（元のコードとの対応表）が付く。
ビルドが速く、エラーがわかりやすい。

mode: "production"（本番用）
最適化された状態でビルドされる。
コードは圧縮され、不要なコードは削除される。
ファイルサイズが小さくなり、読み込みが速くなる。