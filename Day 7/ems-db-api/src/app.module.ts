import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/entities/employee.entity';
import { Department } from './departments/entities/department.entity';

@Module({
  imports: [EmployeesModule, DepartmentsModule,
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521,
      username: 'training',
      password: 'training123',
      serviceName: 'XEPDB1',
      // database: 'XEPDB1',
      entities: [Employee, Department],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
