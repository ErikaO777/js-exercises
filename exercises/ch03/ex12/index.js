class Example {
  valueOf() {
    return this.constructor.name;
  }

  toString() {
    return 'aaa: ${this.constructor.name}'; 
  }
}

let obj = new Example(111);

console.log(obj); 
console.log(obj + 0); 
