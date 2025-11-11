class Employee {
    private id: number;
    name: string;
    email: string;
    dateOfBirth: string;
    mobile: string;

    constructor(id: number, name: string, email: string, dateOfBirth: string, mobile: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.mobile = mobile;
    }

    get(){
        return this.id;
        
    }
}

const emp1 = new Employee(1, 'Alice Johnson', 'alice@example.com', '1998-05-15', '9876543210');
console.log(emp1.get());
//emp1.id = 5;