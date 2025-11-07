//utility function to calculate square root
export function calculateSquareRoot(number) {
    try {
        if (number < 0) {
            throw new Error('Cannot calculate square root of negative numbers.');
        }
    } catch (error) {
        console.error(error.message);
    }
    return Math.sqrt(number);
}

//same using arrow function
export const calculateSquareRoot = (number) => Math.sqrt(number);