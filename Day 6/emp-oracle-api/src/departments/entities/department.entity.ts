import { InferAttributes, InferCreationAttributes, Model, type CreationOptional } from "sequelize";
import { PrimaryKey, AutoIncrement, Column, DataType, AllowNull, HasMany } from "sequelize-typescript";
import { Employee } from "src/employees/entities/employee.entity";

export class Department extends Model<
        InferAttributes<Department>,              // attributes on an instance
        InferCreationAttributes<Department>       // attributes needed to create
    > {
        @PrimaryKey
        @AutoIncrement
        @Column(DataType.INTEGER)
        declare id: CreationOptional<number>
    
        @AllowNull(false)
        @Column(DataType.STRING(30))
        name: string;

          // One Department has many Employees
        @HasMany(() => Employee)
        employees: Employee[];
}
