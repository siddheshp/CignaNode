import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, Put, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    // 1) validate

    // call service method
    return await this.employeesService.create(createEmployeeDto);

    // try {
    //   return this.employeesService.create(createEmployeeDto);
    // } catch (error) {
    //   console.log(error.message);
    //   if (error.message == "Employee already exists")
    //     throw new ConflictException(error.message);
    // }
  }

  

  //localhost:3000/{controller} GET
  @Get()
  async findAll() {
    return await this.employeesService.findAll();
  }

  @Get(':id')
  async findOne(@Param ('id') id: number) {
    return await this.employeesService.findOne(id);
  }

  // @Get('find')
  // async findOne(@Query ('id') id: number) {
  //   return await this.employeesService.findOne(id);
  // }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.employeesService.remove(+id);
  }
}
