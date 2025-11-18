import { calculateAnnualSalary } from "./salary-calculator";

describe('Salary calculator', ()=> {
    it('should calculate annual salary correctly', ()=>{
        //Arrange
        const monthly = 1000;

        //Act
        const actual = calculateAnnualSalary(monthly);

        //Assert
        expect(actual).toBe(12000);
    })

    it('should throw error for negative salary', ()=>{
        expect(() => calculateAnnualSalary(-2)).toThrow();
    })
})