import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);

  const loadStudents = () => {
    axios.get("http://localhost:5000/students")
      .then((res) => {
        setStudents(res.data);
      });
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const saveStudent = () => {
    axios.post("http://localhost:5000/students", {
      name: name
    }).then(() => {
      setName("");
      loadStudents();
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>MERN Stack Integration</h2>

      <input
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={saveStudent}>Save</button>

      <h3>Student List</h3>

      <ul>
        {students.map((student) => (
          <li key={student._id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;