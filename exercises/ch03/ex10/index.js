// Symbol()
const x = Symbol("Hello");
const y = Symbol("Hello");

const obj1 = {};

obj1[x] = 1;
obj1[y] = 2;

console.log(obj1[x]); //1
console.log(obj1[y]); //2

// Symbol.for()
const a = Symbol.for("World");
const b = Symbol.for("World");

const obj2 = {};
obj2[a] = 1;

console.log(obj2[b]); //1