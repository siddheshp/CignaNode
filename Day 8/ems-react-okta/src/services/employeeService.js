const API_BASE_URL = 'http://localhost:3000/api/employees';

const getAuthHeaders = (accessToken) => ({
  'Content-Type': 'application/json',
  ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
});

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized: Please log in');
    if (response.status === 403) throw new Error('Forbidden: Admin role required');
    throw new Error(`Failed: ${response.statusText}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return null;
};

export const getAllEmployees = async () => {
  try {
    return await handleResponse(await fetch(API_BASE_URL));
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    return await handleResponse(await fetch(`${API_BASE_URL}/${id}`));
  } catch (error) {
    console.error('Error fetching employee:', error);
    throw error;
  }
};

export const createEmployee = async (employeeData, accessToken) => {
  try {
    return await handleResponse(await fetch(API_BASE_URL, {
      method: 'POST',
      headers: getAuthHeaders(accessToken),
      body: JSON.stringify(employeeData),
    }));
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (id, employeeData, accessToken) => {
  try {
    return await handleResponse(await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(accessToken),
      body: JSON.stringify(employeeData),
    }));
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id, accessToken) => {
  try {
    return await handleResponse(await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(accessToken),
    }));
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

// Default export
export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
