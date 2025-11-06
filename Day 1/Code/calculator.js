console.log('Simple Calculator');
// console.log(process.argv);
const args = process.argv.slice(2);

//validation 1
if (args.length !== 3) {
    console.log('Usage: node calculator.js <number1> <operator> <number2>');
    process.exit(1);
}

// validation 2 , data type check
if (isNaN(args[0]) || isNaN(args[2])) {
    console.log('Both number1 and number2 should be valid numbers.');
    process.exit(1);
}

//operator
const operators = ['+', '-', '*', '/'];
if (!operators.includes(args[1])) {
    console.log('Operator should be one of +, -, *, /');
    process.exit(1);
}

const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[2]);

let result;

switch (args[1]) {
    case '+':
        result = num1 + num2;
        break;
    case '-':
        result = num1 - num2;
        break;
    case '*':
        result = num1 * num2;
        break;
    case '/':
        if (num2 === 0) {
            console.log('Error: Division by zero is not allowed.');
            process.exit(1);
        }
        result = num1 / num2;
        break;
    default:
        console.log('Invalid operator.');
        process.exit(1);
}

console.log(`Result: ${result}`);