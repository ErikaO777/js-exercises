// for (i = 1; i < 101; i++)
//   console.log(i % 15 ? (i % 3 ? (i % 5 ? i : "Buzz") : "Fizz") : "FizzBuzz");


for (let i = 1; i < 101; i++) {
  let n = i;
  if (n % 15 === 0) {
    console.log("FizzBuzz");
  } else if (n % 5 === 0) {
    console.log("Buzz");
  } else if (n % 3 === 0) {
    console.log("Fizz");
  } else {
    console.log(n);
  }
}
