import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return await this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  async findAll() {
    return await this.departmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.departmentsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return await this.departmentsService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.departmentsService.remove(+id);
  }
}
