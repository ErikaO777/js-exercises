let obj = {
    real : 1,
    imaginary : 2,
 };

let add = function(obj) { return obj.real + obj.imaginary; };
let sub = function(obj) { return obj.real - obj.imaginary; };
let mul = function(obj) { return obj.real * obj.imaginary; };
let div = function(obj) { return obj.real / obj.imaginary; };

console.log("add = " + add(obj));
console.log("sub = " + sub(obj));
console.log("mul = " + mul(obj));
console.log("div = " + div(obj));