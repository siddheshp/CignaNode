import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { OktaAuthGuard } from 'src/auth/okta-auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseGuards(OktaAuthGuard, AdminGuard)
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeesService.create(createEmployeeDto);
  }

  @Get()
  async findAll() {
    return await this.employeesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.employeesService.findOne(+id);
  }

  @UseGuards(OktaAuthGuard, AdminGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeesService.update(+id, updateEmployeeDto);
  }

  @UseGuards(OktaAuthGuard, AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.employeesService.remove(+id);
  }
}
