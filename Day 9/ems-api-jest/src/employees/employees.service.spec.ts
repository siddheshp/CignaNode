import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let mockRepo: Partial<Record<keyof Repository<Employee>, jest.Mock>>;

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
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({id: 1});
  })


});