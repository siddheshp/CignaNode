console.log('Simple Calculator');
console.log(process.argv);
const args = process.argv.slice(2);

//validation 1
if (args.length !== 4) {
    console.log('Usage: node calculator.js <number1> <operator> <number2>');
    process.exit(1);
}

// validation 2 , data type check


const [num1, num2] = args.map(Number);
//sum
console.log('Sum:', num1 + num2);