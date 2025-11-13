import { IsDateString, IsEmail, IsNotEmpty, IsNumber, Matches, Min } from "class-validator";

export class CreateEmployeeDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsDateString()
    dateOfBirth: string;

    @Matches(/^\d{10}$/, {message: 'Mobile must be 10 digit number'})
    mobile: string;

    @IsNumber()
    @Min(1)
    departmentId: number
}
