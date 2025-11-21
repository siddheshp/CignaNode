import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';
import NavBar from './components/NavBar';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import DepartmentList from './components/DepartmentList';
import DepartmentForm from './components/DepartmentForm';
import { RequireAdmin } from './components/SecureRoute';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        
        {/* Employee Routes */}
        <Route 
          path="/add" 
          element={
            <RequireAdmin>
              <EmployeeForm />
            </RequireAdmin>
          } 
        />
        <Route 
          path="/edit/:id" 
          element={
            <RequireAdmin>
              <EmployeeForm />
            </RequireAdmin>
          } 
        />

        {/* Department Routes */}
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/departments/add" element={<DepartmentForm />} />
        <Route path="/departments/edit/:id" element={<DepartmentForm />} />
      </Routes>
    </div>
  );
}

export default App;
