import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, Min, IsDateString, Matches } from "class-validator";

export class CreateEmployeeDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @Min(1)
    salary: number;

    @ApiProperty()
    @IsDateString()
    dateOfBirth: string;

    @ApiProperty()
    @Matches(/^\d{10}$/, { message: 'Mobile number must be 10 digits' })
    mobileNumber: number

    @ApiProperty()
    @IsNotEmpty()
    departmentId: number;
}
