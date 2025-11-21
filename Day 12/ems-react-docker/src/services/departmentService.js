// Helper function to get config value from runtime or build-time
const getEnvValue = (key) => {
  // First try runtime config (for Docker/Podman)
  if (window.ENV_CONFIG && window.ENV_CONFIG[key] && !window.ENV_CONFIG[key].startsWith('${')) {
    return window.ENV_CONFIG[key];
  }
  // Fallback to build-time env (for local development)
  return import.meta.env[key];
};

const API_BASE_URL = `${getEnvValue('VITE_API_BASE_URL')}/departments`;

const getHeaders = () => ({
  'Content-Type': 'application/json',
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

export const getAllDepartments = async () => {
  try {
    return await handleResponse(await fetch(API_BASE_URL));
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

export const getDepartmentById = async (id) => {
  try {
    return await handleResponse(await fetch(`${API_BASE_URL}/${id}`));
  } catch (error) {
    console.error('Error fetching department:', error);
    throw error;
  }
};

export const createDepartment = async (departmentData) => {
  try {
    return await handleResponse(await fetch(API_BASE_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(departmentData),
    }));
  } catch (error) {
    console.error('Error creating department:', error);
    throw error;
  }
};

export const updateDepartment = async (id, departmentData) => {
  try {
    return await handleResponse(await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(departmentData),
    }));
  } catch (error) {
    console.error('Error updating department:', error);
    throw error;
  }
};

export const deleteDepartment = async (id) => {
  try {
    return await handleResponse(await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    }));
  } catch (error) {
    console.error('Error deleting department:', error);
    throw error;
  }
};

// Default export
export default {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
