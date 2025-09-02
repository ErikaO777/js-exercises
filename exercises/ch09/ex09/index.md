## SOLID原則
### 単一責任の原則 (single-responsibility principle)
クラスは単一の責任を持つべきである。
There should never be more than one reason for a class to change.

#### どういうこと？
クラスに責任（機能、役割）が多いと、バグが発生する可能性が高くなってしまう。
動作を分離することが目的。

### 開放閉鎖の原則（open/closed principle）
クラスは拡張にはオープンで、変更にはクローズドであるべきである。
software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.

#### どういうこと？
クラスを変更するということは、そのクラスを利用するすべてのシステムに影響を及ぼすということ。
理想は、既存の関数に機能を追加することであり、変更はしないこと。

### リスコフの置換原則（Liskov substitution principle）
CLASS AがCLASS Bのサブタイプである場合、プログラム内のCLASS B型のオブジェクトをCLASS A型のオブジェクトに置き換えても、そのプログラムの特性は何も変わらない。
Functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it.

#### どういうこと？
あるクラスから別のクラスを作る時（継承）、元のクラスは親、新しいクラスは子となる。この時、子クラスは親クラスの機能全てを備えている必要がある。ゆえに、子クラスは、親クラスと同様の結果を提供しなければならない。システム全体を見て、親子クラスに一貫性をもたせなければならない。

### インターフェース分離の原則 (Interface segregation principle)
クライアントが使用しないメソッドへの依存を強制すべきではない。各クライアントに特化したインターフェースがたくさんあった方がよい。
Many client-specific interfaces are better than one general-purpose interface.

#### どういうこと？
クラスは、自身の持つ役割を果たすのに必要な最低限の機能のみを持つべきで、それ以外の動作は予期せぬバグになってしまう可能性がある。
それ以外の動作は削除するか、別のクラスに持たせる必要がある。

### 依存性逆転の原則（dependency inversion principle）
上位モジュールは、下位モジュールに依存するべきではなく、どちらもインターフェースなどの抽象に依存するべきだ。
High-level modules should not import anything from low-level modules. Both should depend on abstractions (e.g., interfaces), [not] concretions.

#### どういうこと？
上位モジュールを、ツールを用いて実際に動作を実行するクラス(人？)、下位モジュールを動作を実行するために必要なツール(道具？)だとする。この時、上位モジュールは下位モジュールと融合すべきでなく、インターフェースと融合するべきである。
また、クラスとインターフェース、どちらもツールがどういう語句化の仕組みについては知る必要はない。

参考：https://qiita.com/baby-degu/items/d058a62f145235a0f007