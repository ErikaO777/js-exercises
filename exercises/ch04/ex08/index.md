### undefined ではなくvoid 0 という書き方があった理由
undefinedについて、過去には予約語ではない時期があり、自由に再定義することができた。そのため、undefinedが常にundefinedとは限らず不確かであるのでundefinedを使うのを避けるべきとされていた。
(現在は再定義できないようになっている)
そこで代わりに使われていたのがvoid 0であり、void演算子を用いればいつでも確実なundefinedを返すことができる。また、voidの後が0なのは、void 0という式が一番シンプルでわかりやすくそういう慣例になっていたからだと思われる。


参考文献
* https://liginc.co.jp/web/js/38494
* https://www.spread1.co.jp/wp/post-2916/
