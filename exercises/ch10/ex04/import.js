import Attack, { damage, Magic, recovery } from './index.js';
// importするときは、デフォルト設定したもののみimport Attack from './index.js';
// 名前付きは波カッコ

const myAttack = new Attack('パンチ', 30);
const myHeal = new Magic('回復', 20);
const myDamage = damage(100, 30);
const myRecovery = recovery(70, 20);

console.log(myAttack.use());
console.log(myDamage);
console.log(myHeal.use());
console.log(myRecovery);