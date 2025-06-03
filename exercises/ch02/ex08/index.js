import { parse } from "acorn";

const code1 = "let a; a = 3; console.log(a);";
const ast1 = parse(code1, { ecmaVersion: 2020 });

console.log(JSON.stringify(ast1, null, 2));

const code2 = `let a 
a 
=
3
console.log(a)
`

const ast2 = parse(code2, { ecmaVersion: 2020 });

console.log(JSON.stringify(ast2, null, 2));