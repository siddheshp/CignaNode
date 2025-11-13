import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  //list off emp
  private employees: Employee[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', dateOfBirth: '1998-05-15', mobile: '9876543210', departmentId: 1 },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', dateOfBirth: '1995-10-20', mobile: '9123456780', departmentId: 2 },
  ];

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    // duplicate scenario
    const emp = this.employees.find(e => e.email === createEmployeeDto.email);
    if (!emp) {
      // emp does not exist
      // DTO to model
      const newEmp: Employee = {
        id: this.employees.length + 1,
        name: dto.name,
        email: dto.email,
        dateOfBirth: dto.dateOfBirth,
        mobile: dto.mobile,
        departmentId: dto.de
      };

      // process: add
      this.employees.push(newEmp);
      return newEmp;
    }
    // throw Error("Employee already exists");
    throw new ConflictException("Employee already exists");
  }

  async findAll(): Promise<Employee[]> {
    return this.employees;
  }

  async findOne(id: number) {
    let emp = this.employees.find(e => e.id === id);
    if (!emp)
      throw new NotFoundException();
    return this.employees.find(e => e.id === id);
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    //console.log(id);
    let emp = this.employees.find(e => e.id === id);
    if (!emp) {
      throw new NotFoundException("employee not found");
    }
    //emp = {id,...dto} as Employee;
    Object.assign(emp, dto);
    return emp;
  }

  async remove(id: number) {
    let emp = this.employees.find(e => e.id === id);
    if (emp) {
      this.employees = this.employees.filter(e => e.id !== id);
    }
    throw new NotFoundException();
  }
}
