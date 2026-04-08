import React, { useState } from "react";
import { createStudent } from "../services/studentApi";

function StudentForm({ onStudentAdded }) {
  const [student, setStudent] = useState({
    id: "",
    name: "",
    course: "",
    age: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!student.id || !student.name || !student.course || !student.age) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await createStudent({
        id: parseInt(student.id),
        name: student.name,
        course: student.course,
        age: parseInt(student.age),
      });

      setMessage("Student added successfully!");

      // Reset form
      setStudent({
        id: "",
        name: "",
        course: "",
        age: "",
      });

      // Refresh student list
      if (onStudentAdded) {
        onStudentAdded();
      }
    } catch (error) {
      setMessage(`Failed to add student: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID</label>
          <input
            type="number"
            name="id"
            value={student.id}
            onChange={handleChange}
            placeholder="Enter student ID"
          />
        </div>

        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Enter student name"
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <input
            type="text"
            name="course"
            value={student.course}
            onChange={handleChange}
            placeholder="Enter course"
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            placeholder="Enter age"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Student"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default StudentForm;