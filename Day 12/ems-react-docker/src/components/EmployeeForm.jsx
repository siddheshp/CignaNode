import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { hasAdminRole } from '../utils/auth';
import employeeService from '../services/employeeService';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authState } = useOktaAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    salary: '',
    dateOfBirth: '',
    mobileNumber: '',
    departmentId: '',
  });

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const token = authState?.accessToken?.accessToken;
      const data = await employeeService.getEmployeeById(Number(id), token);
      
      setFormData({
        name: data.name,
        email: data.email,
        salary: data.salary.toString(),
        dateOfBirth: data.dateOfBirth.split('T')[0],
        mobileNumber: data.mobileNumber.toString(),
        departmentId: data.departmentId.toString(),
      });
    } catch (err) {
      setError('Failed to fetch employee details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('EmployeeForm - Auth State:', authState);
    console.log('EmployeeForm - isAuthenticated:', authState?.isAuthenticated);
    console.log('EmployeeForm - Access Token Claims:', authState?.accessToken?.claims);
    console.log('EmployeeForm - Groups:', authState?.accessToken?.claims?.groups);
    console.log('EmployeeForm - Has Admin Role:', hasAdminRole(authState));

    if (authState === null) {
      return;
    }

    setCheckingAuth(false);

    if (!hasAdminRole(authState)) {
      setError('You do not have permission to access this resource. Admin role is required.');
      return;
    }

    if (id) {
      fetchEmployee();
    }
  }, [authState, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hasAdminRole(authState)) {
      setError('You do not have permission to perform this action. Admin role is required.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const token = authState?.accessToken?.accessToken;

      const employeeData = {
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        mobileNumber: formData.mobileNumber,
        salary: Number(formData.salary),
        departmentId: Number(formData.departmentId),
      };

      console.log('Sending employee data:', JSON.stringify(employeeData, null, 2));

      if (id) {
        await employeeService.updateEmployee(Number(id), employeeData, token);
      } else {
        await employeeService.createEmployee(employeeData, token);
      }

      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to save employee');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (checkingAuth) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Checking authentication...</span>
          </div>
          <p className="mt-2">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!hasAdminRole(authState)) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Access Denied</h4>
          <p>You do not have permission to access this resource. Admin role is required.</p>
          <hr />
          <p className="mb-0">
            Please contact your administrator if you believe you should have access.
          </p>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
            Back to Employee List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3>{id ? 'Edit Employee' : 'Add Employee'}</h3>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">
                    Salary *
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="departmentId" className="form-label">
                    Department ID *
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="departmentId"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    required
                    min="1"
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/')}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : (
                      id ? 'Update Employee' : 'Add Employee'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
