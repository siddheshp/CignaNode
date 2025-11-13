import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './config/database.config';
import { Employee } from './employees/entities/employee.entity';
import { Department } from './departments/entities/department.entity';

@Module({
  imports: [
    EmployeesModule, 
    DepartmentsModule,
    SequelizeModule.forRoot({...getSequelizeConfig(), models: [Employee]})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
