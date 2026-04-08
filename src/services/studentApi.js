const API_BASE_URL = "http://localhost:5085/api/student";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP Error: ${response.status}`);
  }
  return response.json();
};

// Get all students
export const getAllStudents = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Get a specific student by ID
export const getStudentById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error fetching student ${id}:`, error);
    throw error;
  }
};

// Create a new student
export const createStudent = async (student) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

// Update an existing student
export const updateStudent = async (id, student) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`Error updating student ${id}:`, error);
    throw error;
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.status === 204 ? null : await response.json();
  } catch (error) {
    console.error(`Error deleting student ${id}:`, error);
    throw error;
  }
};
