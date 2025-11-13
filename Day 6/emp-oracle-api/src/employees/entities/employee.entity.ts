import type { CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

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

    @AllowNull(false)
    @Column(DataType.INTEGER)
    departmentId: number;
}
