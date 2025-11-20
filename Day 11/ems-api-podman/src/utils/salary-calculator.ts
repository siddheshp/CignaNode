export function calculateAnnualSalary(monthlySalary: number): number {
    if (monthlySalary < 0)
        throw new Error('invalid salary');
    return monthlySalary * 12;
}