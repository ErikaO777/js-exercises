export function isEmailAddress(email) {
  // パフォーマンスのためローカルとドメインでテンプレパターンを分割
  const localPattern =
    /^[a-zA-Z0-9_!#$%&'*+\-/=?^_`{|}~]+(\.[a-zA-Z0-9_!#$%&'*+\-/=?^_`{|}~]+)*$/;
  const domainPattern =
    /^[a-zA-Z0-9_!#$%&'*+\-/=?^_`{|}~]+(\.[a-zA-Z0-9_!#$%&'*+\-/=?^_`{|}~]+)*$/;

  // 文字列以外、null, undefinedはまず省く
  if (typeof email !== "string" || email == null || email == undefined) {
    return false;
  }

  // 全角文字や空白が含まれている場合、@が無い場合は不正
  if (email.match(/[^\x00-\x7F]/g) || /\s/.test(email)) {
    return false;
  }

  // @で分割してチェック
  const parts = email.split("@");

  // @がないか、複数ある場合は不正
  if (parts.length !== 2) {
    return false;
  }

  const [local, domain] = parts;
  // 長さチェック - 特に長いドメインは早期にフィルター
  if (
    local.length === 0 ||
    local.length > 64 ||
    domain.length === 0 ||
    domain.length > 252
  ) {
    return false;
  }

  // 連続するドットや先頭や末尾のドットをチェック ..(.の連続文字)はうまく定義できなかった。。。
  if (
    local.includes("..") ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    domain.includes("..") ||
    domain.startsWith(".") ||
    domain.endsWith(".")
  ) {
    return false;
  }

  // 実際の検証は分割して行うことでパフォーマンスが向上
  return localPattern.test(local) && domainPattern.test(domain);
}

// -------　確認　-------
console.log(isEmailAddress("foo@example.com"));
console.log(isEmailAddress(null));
console.log(isEmailAddress(undefined));
console.log(isEmailAddress("foo..bar@example.com"));
console.log(isEmailAddress("ｆｋｌ.@example.com"));
console.log(isEmailAddress("f o o@example.com"));
console.log(isEmailAddress("!#$%&'*+-/=?^_`{|}~@example.com"));
console.log(
  isEmailAddress(
    "a@012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901"
  )
);
console.log(
  isEmailAddress(
    "a@0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012"
  )
);

// 全部はパターンマッチで書けない？

// 参考
// https://www.javadrive.jp/regex-basic/sample/index13.html
// https://zenn.dev/igz0/articles/email-validation-regex-best-practices
