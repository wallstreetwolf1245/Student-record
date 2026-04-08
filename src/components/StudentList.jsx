import React, { useEffect, useState } from "react";
import { getAllStudents, deleteStudent } from "../services/studentApi";

function StudentList({ refreshTrigger }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      setError(`Failed to load students: ${error.message}`);
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        setStudents(students.filter((student) => student.id !== id));
      } catch (error) {
        setError(`Failed to delete student: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refreshTrigger]);

  return (
    <div className="card">
      <h2>Student List</h2>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{student.age}</td>
                <td>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;