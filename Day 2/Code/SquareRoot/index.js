//take number from user
import readline from 'readline';
import { calculateSquareRoot } from './utility.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a number: ', (number) => {
    //validate input
    if (isNaN(number)) {
        console.log('Please enter a valid number.');
        rl.close();
        return;
    }
    //call utility module to calculate square root
    const sqrt = calculateSquareRoot(Number(number));

    console.log(`The square root of ${number} is ${sqrt}`);
    rl.close();
});