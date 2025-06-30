// for (i = 1; i < 101; i++)
//   console.log(i % 15 ? (i % 3 ? (i % 5 ? i : "Buzz") : "Fizz") : "FizzBuzz");

let result = "";
for (let i = 1; i <= 100; i++) {
  let n = i;
  if (n % 15 === 0) {
    result += "FizzBuzz\n";
  } else if (n % 5 === 0) {
    result += "Buzz\n";
  } else if (n % 3 === 0) {
    result += "Fizz\n";
  } else {
    result += n + "\n";
  }
}
