import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { InjectModel } from '@nestjs/sequelize';
import { privateDecrypt } from 'crypto';

@Injectable()
export class EmployeesService {
  constructor(@InjectModel(Employee) private readonly entity: typeof Employee) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    const emp = this.entity.create({
      name: dto.name,
      dateOfBirth: new Date(dto.dateOfBirth),
      email: dto.email,
      departmentId: dto.departmentId,
      mobileNumber: dto.mobileNumber,
      salary: dto.salary
    });
    return emp;
  }

  async findAll(): Promise<Employee[]> {
    return this.entity.findAll();
  }

  async findOne(id: number) {
    //return `This action returns a #${id} employee`;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    //return `This action updates a #${id} employee`;
  }

  async remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
