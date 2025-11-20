import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsNull } from 'typeorm';
import { IsDefined, IsNotEmpty, isNotEmpty } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @IsNotEmpty()
    id: number;
}
