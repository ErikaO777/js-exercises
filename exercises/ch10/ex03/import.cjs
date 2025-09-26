const { Attack, damage } = require('./index.cjs');
const myAttack = new Attack('パンチ', 30);
const myDamage = damage(100, 30);

console.log(myAttack.use());
console.log(myDamage);