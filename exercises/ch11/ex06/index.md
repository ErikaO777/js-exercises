### メールアドレスの正規表現
メールの正式な仕様（RFC）に完全に沿うことは難しいため、一般的に使われるのは以下。
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
・ローカルパートに使える文字は英数字と限られた記号
・1文字以上
・@は必須で入っていること
・@の後のドメイン名は英字で2文字以上

https://blastengine.jp/blog_content/regular-expression/
https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)