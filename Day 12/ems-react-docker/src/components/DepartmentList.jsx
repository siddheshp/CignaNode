import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDepartments, deleteDepartment } from '../services/departmentService';
import './DepartmentList.css';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const data = await getAllDepartments();
      setDepartments(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await deleteDepartment(id);
        setDepartments(departments.filter(dept => dept.id !== id));
        setError('');
      } catch (err) {
        setError(err.message || 'Failed to delete department');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/departments/edit/${id}`);
  };

  if (loading) {
    return <div className="loading-message">Loading departments...</div>;
  }

  return (
    <div className="department-list-container">
      <h2>Departments</h2>

      {error && <div className="error-message">{error}</div>}

      <Link to="/departments/add" className="btn btn-primary add-department-link">
        Add Department
      </Link>

      {departments.length === 0 ? (
        <div className="no-departments-message">
          No departments found. Click "Add Department" to create one.
        </div>
      ) : (
        <div className="department-table-container">
          <table className="table table-striped table-hover department-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td>{dept.id}</td>
                  <td>{dept.name}</td>
                  <td>
                    <div className="department-actions">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(dept.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(dept.id)}
                      >
                        Delete
                      </button>
                    </div>
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

export default DepartmentList;
