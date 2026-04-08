import React, { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleStudentAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="app-container">
      <h1>Student Record Manager</h1>

      <div className="layout">
        <StudentForm onStudentAdded={handleStudentAdded} />
        <StudentList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

export default App;
