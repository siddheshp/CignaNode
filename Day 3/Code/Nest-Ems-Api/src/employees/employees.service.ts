import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  //list off emp
  private employees: Employee[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', dateOfBirth: '1998-05-15', mobile: '9876543210' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', dateOfBirth: '1995-10-20', mobile: '9123456780' },
  ];

  create(createEmployeeDto: CreateEmployeeDto): Employee {
    // duplicate scenario
    const emp = this.employees.find(e => e.email === createEmployeeDto.email);
    if (!emp) {
      // emp does not exist
      // DTO to model
      const newEmp : Employee  = {
        id : this.employees.length + 1,
        name : createEmployeeDto.name,
        email : createEmployeeDto.email,
        dateOfBirth : createEmployeeDto.dateOfBirth,
        mobile : createEmployeeDto.mobile
      };

      // process: add
      this.employees.push(newEmp);
      return newEmp;
    }
    throw Error("Employee already exists");
  }

  findAll(): Employee[] {
    return this.employees;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
