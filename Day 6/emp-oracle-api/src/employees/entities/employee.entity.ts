import {  type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Department } from "src/departments/entities/department.entity";

@Table({})
export class Employee extends Model<
        InferAttributes<Employee>,              // attributes on an instance
        InferCreationAttributes<Employee>       // attributes needed to create
    > {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: CreationOptional<number>

    @AllowNull(false)
    @Column(DataType.STRING(30))
    name: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING(30))
    email: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    salary: number;

    @AllowNull(false)
    // @Column(DataType.DATE)
    @Column({field: 'Date_of_Birth', type: DataType.DATE})
    dateOfBirth: Date;

    @AllowNull(false)
    @Column({type: DataType.INTEGER})
    mobileNumber: number

    // @AllowNull(false)
    // @Column(DataType.INTEGER)
    // departmentId: number;

    // Foreign key to Department
    @AllowNull(false)
    @ForeignKey(() => Department)
    @Column(DataType.INTEGER)
    departmentId: number;

    // Each Employee belongs to one Department
    @BelongsTo(() => Department, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
    department: Department;
}
