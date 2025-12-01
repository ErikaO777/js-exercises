
const a = document.querySelectorAll("nav a");
const product_item = document.querySelectorAll(".product-item");
const cart_img = document.querySelector(".cart img");
const price_elements = document.querySelectorAll(".product-item .price");
const all_product_img = document.querySelectorAll(".product-item img");
const search_button = document.querySelector(".search-bar button");
const footer_para = document.querySelector("footer p");
const header_img = document.querySelector("header .account img");
const company_link = document.querySelector("nav a[href='#about']");

// --------------- 確認　---------------
//1 .nav 要素内のリンク (<a>)
for (let i = 0; i < a.length; i++) {
    console.log(a[i].href);
}
// http://localhost:3000/ch15.01-03/ex13#home
// http://localhost:3000/ch15.01-03/ex13#products
// http://localhost:3000/ch15.01-03/ex13#contact
// http://localhost:3000/ch15.01-03/ex13#about


// 2.商品リスト (.product-list) 内の最初の商品 (.product-item)
console.log(product_item[0]);
// undefined


// 3.カートアイコンの画像 (<img>)
console.log(cart_img.src);
// http://localhost:3000/ch15.01-03/30


// 4.商品リスト (.product-list) 内の価格 (.price) を表示する要素
const prices = Array.from(price_elements).map(el => el.textContent);
console.log(prices);
// (4) ['¥12,000', '¥25,000', '¥8,000', '¥15,000']


// 5.商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (<img>)
console.log(all_product_img);
// NodeList(4) [img, img, img, img]


// 6.検索バー (.search-bar) 内の検索ボタン (<button>)
console.log(search_button);
// <button>検索</button>


// 7.フッター (footer) 内のパラグラフ (<p>) 要素
console.log(footer_para.textContent);
// © 2024 家電オンラインショップ. All rights reserved.


// 8.商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
for (let i = 0; i < product_item.length; i++) {
    if (i % 2 === 0) {
        console.log(product_item[i + 1].textContent);
    }
}
// 商品2
//           最新モデルの家電です。
//           ¥25,000
//           カートに追加  
// 商品4
//           耐久性のある家電製品。
//           ¥15,000
//           カートに追加


// 9.ヘッダー (header) 内のアカウントリンク (.account) の画像 (<img>)
console.log(header_img.src);
// http://localhost:3000/ch15.01-03/30


// 10.ナビゲーションリンクのうち、"会社情報" のリンク
console.log(company_link.href);
// http://localhost:3000/ch15.01-03/ex13#about