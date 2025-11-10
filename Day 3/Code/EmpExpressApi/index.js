import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

const __dirname = path.resolve();
const filePath = path.join(__dirname, 'employees.json');

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/employees', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading employees.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const employees = JSON.parse(data);
        res.json(employees);
    });
});

app.post('/employees', (req, res) => {
    const newEmployee = req.body;
    // Basic validation
    if (!newEmployee.name || !newEmployee.email || !newEmployee.dateOfBirth || !newEmployee.mobile) {
        res.status(400).send('Bad Request: Missing required fields');
        return;
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading employees.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const employees = JSON.parse(data);
        employees.push(newEmployee);
        fs.writeFile(filePath, JSON.stringify(employees, null, 2), (err) => {
            if (err) {
                console.error('Error writing to employees.json:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).send('Employee added successfully');
        });
    });
});

app.listen(3000, ()=> {
    console.log('Server is running on http://localhost:3000');
});