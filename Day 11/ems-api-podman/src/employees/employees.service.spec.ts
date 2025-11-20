import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { MongoServerClosedError, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { assert } from 'console';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { create } from 'domain';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdatedAt } from 'sequelize-typescript';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let mockRepo: Partial<Record<keyof Repository<Employee>, jest.Mock>>;
  let createDto: CreateEmployeeDto;
  let updateDto: UpdateEmployeeDto;

  beforeEach(async () => {
    mockRepo = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockRepo
        }
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);

    createDto = { name: 'New Employee', email: 'new@test.com', salary: 55000, dateOfBirth: '1995-05-05', mobileNumber: 5555555555, departmentId: 1 };
    updateDto = {
      id: 1,
      name: 'new name',
      salary: 8000
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find all employees', async () => {
    //Arrange
    const mockEmployees: Employee[] = [
      { id: 1, name: 'Ravi', email: 'ravi@test.com', salary: 50000, dateOfBirth: new Date('1990-01-01'), mobileNumber: 1234567890, departmentId: 1 },
      { id: 2, name: 'Priya', email: 'priya@test.com', salary: 60000, dateOfBirth: new Date('1992-02-02'), mobileNumber: 9876543210, departmentId: 2 },
    ];

    mockRepo.find?.mockResolvedValue(mockEmployees);

    //Act
    const actual = await service.findAll();
    //assert
    expect(actual).toEqual(mockEmployees);
    expect(actual).toHaveLength(2);
    expect(mockRepo.find).toHaveBeenCalled();
  })

  it('should return one employee by id', async () => {
    //Arrange
    const mockEmployee: Employee = {
      id: 1, name: 'Ravi', email: 'ravi@test.com', salary: 50000,
      dateOfBirth: new Date('1990-01-01'), mobileNumber: 1234567890, departmentId: 1,
    };

    mockRepo.findOneBy?.mockResolvedValue(mockEmployee);

    //Act
    const actual = await service.findOne(1);

    //Assert
    expect(actual).toEqual(mockEmployee);
    // expect(actual.email).toEqual(mockEmployee.email);
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  })

  it('should throw NotFoundException when employee not found', async () => {
    mockRepo.findOneBy?.mockResolvedValue(null);

    await expect(service.findOne(10)).rejects.toThrow(Error);
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 10 });
  })

  it('should create new employee', async () => {
    mockRepo.insert?.mockResolvedValue({ generatedMaps: [], identifiers: [], raw: [] });
    // const mockEmployee: Employee = { id: 
    //   name: 'New Employee', email: 'new@test.com', salary: 55000, dateOfBirth: new Date('1995-05-05'), mobileNumber: 5555555555, departmentId: 1
    // };
    // mockRepo.insert?.mockResolvedValue(mockEmployee);

    // createDto = { name: 'New Employee', email: 'new@test.com', salary: 55000, dateOfBirth: '1995-05-05', mobileNumber: 5555555555, departmentId: 1 };

    const actual = await service.create(createDto);

    //expect(actual).toEqual(createDto);
    expect(actual.email).toBe(createDto.email);
    expect(actual.name).toBe(createDto.name);
    expect(actual.mobileNumber).toBe(createDto.mobileNumber);
    expect(actual.dateOfBirth.toISOString().split('T')[0]).toBe(createDto.dateOfBirth);
  })

  it('should throw ConflictException when duplicate employee added', async () => {
    const emp: Employee = { id: 1, name: 'New Employee', email: 'new@test.com', salary: 55000, dateOfBirth: new Date('1995-05-05'), mobileNumber: 5555555555, departmentId: 1, };
    mockRepo.findOneBy?.mockResolvedValue(emp);

    await expect(service.create(createDto)).rejects.toThrow(ConflictException);
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ email: createDto.email });
    expect(mockRepo.insert).not.toHaveBeenCalled();
  })

  it('should update an employee', async () => {
    //Arrange
    const existingEmp: Employee = {
      id: 1, name: 'New Employee', email: 'new@test.com', salary: 55000, dateOfBirth: new Date('1995-05-05'), mobileNumber: 5555555555, departmentId: 1
    };

    mockRepo.findOneBy?.mockResolvedValue(existingEmp);
    mockRepo.update?.mockResolvedValue({ affected: 1, generatedMaps: [], raw: [] });

    //Act
    const actual = await service.update(1, updateDto);

    //Assert
    expect(actual.name).toBe(existingEmp.name);
    expect(actual.salary).toBe(existingEmp.salary);
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(mockRepo.update).toHaveBeenCalledWith({ id: 1 }, expect.objectContaining(updateDto));
  })

  it('Update -> should throw NotFoundException when employee not found', async () => {
    mockRepo.findOneBy?.mockResolvedValue(null);

    await expect(service.update(18, updateDto)).rejects.toThrow(NotFoundException);
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({id:18});
    expect(mockRepo.update).not.toHaveBeenCalled();
  })

  it('Remove -> should delete an employee', async()=>{
    
  })
});