let complex = {
    real : 1,
    imaginary : 2,
 };

export let add = function(obj) { return obj.real + obj.imaginary; };
export let sub = function(obj) { return obj.real - obj.imaginary; };
export let mul = function(obj) { return obj.real * obj.imaginary; };
export let div = function(obj) { return obj.real / obj.imaginary; };

console.log("add = " + add(complex));
console.log("sub = " + sub(complex));
console.log("mul = " + mul(complex));
console.log("div = " + div(complex));