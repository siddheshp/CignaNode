import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { getAllEmployees, deleteEmployee } from '../services/employeeService';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { authState } = useOktaAuth();

  const isAdmin = authState?.isAuthenticated && 
    (authState.accessToken?.claims?.groups || []).includes('admin');

  useEffect(() => {
    console.log('Auth State:', authState);
    console.log('Access Token Claims:', authState?.accessToken?.claims);
    console.log('Groups:', authState?.accessToken?.claims.groups);

    fetchEmployees();
  }, [authState]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Failed to load employees. Please make sure the API server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert('Admin role required to delete employees');
      return;
    }

    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const accessToken = authState.accessToken?.accessToken;
        await deleteEmployee(id, accessToken);
        setEmployees(employees.filter(emp => emp.id !== id));
        alert('Employee deleted successfully!');
      } catch (err) {
        alert(err.message || 'Failed to delete employee');
        console.error(err);
      }
    }
  };



  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee List</h2>
      
      {employees.length === 0 ? (
        <div className="alert alert-info">
          No employees found. Click "Add Employee" to create one.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Date of Birth</th>
                <th>Mobile Number</th>
                <th>Department ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>${employee.salary.toLocaleString()}</td>
                  <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                  <td>{employee.mobileNumber}</td>
                  <td>{employee.departmentId}</td>
                  <td>
                    {isAdmin && (
                      <>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => navigate(`/edit/${employee.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {!isAdmin && (
                      <span className="text-muted">Admin access required</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
