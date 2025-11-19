import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let mockService: Partial<Record<keyof EmployeesService, jest.Mock>>;
  let createDto: CreateEmployeeDto;

  beforeEach(async () => {
    mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService, useValue: mockService
        }
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);

    createDto = {
      name: 'John Doe', email: 'john@test.com', salary: 50000,
      dateOfBirth: '1990-01-15', mobileNumber: 1234567890, departmentId: 1
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new employee', async () => {
    //Arrange
    const createdEmployee: Employee = { id: 1, name: 'John Doe', email: 'john@test.com', salary: 50000, dateOfBirth: new Date('1990-01-15'), mobileNumber: 1234567890, departmentId: 1, };

    mockService.create?.mockResolvedValue(createdEmployee);
    //Act
    const actual = await controller.create(createDto);

    //Assert
    expect(actual).toEqual(createdEmployee);
    expect(mockService.create).toHaveBeenCalledWith(createDto);
    expect(mockService.create).toHaveBeenCalledTimes(1);
  })

  it('findAll -> should return all employees', async () => {
    const employees: Employee[] = [
      { id: 1, name: 'John Doe', email: 'john@test.com', salary: 50000, dateOfBirth: new Date('1990-01-15'), mobileNumber: 1234567890, departmentId: 1, },
      { id: 2, name: 'Jane Smith', email: 'jane@test.com', salary: 60000, dateOfBirth: new Date('1992-05-20'), mobileNumber: 9876543210, departmentId: 2, }
    ];

    mockService.findAll?.mockResolvedValue(employees);

    const result = await controller.findAll();

    expect(result).toEqual(employees);
    expect(result).toHaveLength(2);
    expect(mockService.findAll).toHaveBeenCalled();
  })
});
