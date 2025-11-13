import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {
  private departments: Department[] = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'Accounts' }
  ];

  async create(dto: CreateDepartmentDto): Promise<Department> {
    //duplciate
    const dept = this.departments.find(d => d.name === dto.name);
    if (dept)
      throw new ConflictException();
    const newDept: Department = {
      id: this.departments.length + 1,
      name: dto.name
    };
    this.departments.push(newDept);
    return newDept;
  }

  async findAll(): Promise<Department[]> {
    return this.departments;
  }

  async findOne(id: number) : Promise<Department> {
    let dept = this.departments.find(d=> d.id === id);
    if (dept)
      return dept;
    throw new NotFoundException();
  }

  async update(id: number, dto: UpdateDepartmentDto) {
    let dept = this.departments.find(e => e.id === id);
    if (!dept) {
      throw new NotFoundException("deparmtent not found");
    }
    //emp = {id,...dto} as Employee;
    Object.assign(dept, dto);
    return dept;
  }

  async remove(id: number) {
    let dept = this.departments.find(e => e.id === id);
    if (dept) {
      this.departments = this.departments.filter(e => e.id !== id);
    }
    throw new NotFoundException();
  }
}
