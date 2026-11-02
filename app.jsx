import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link }
from 'react-router-dom';

function Form({ setStudent }) {
  const [data, setData] = useState({
    name: '', email: '', department: '', phone: ''
  });

  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!data.name || !data.email ||
        !data.department || !data.phone) {
      setError("All fields are required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError("Enter valid email");
      return;
    }

    if (!/^\d{10}$/.test(data.phone)) {
      setError("Enter valid 10-digit phone number");
      return;
    }

    setStudent(data);
    setError("Registration Successful!");
  }

  return (
    <div>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name"
          onChange={e => setData({...data,name:e.target.value})}/>

        <input placeholder="Email"
          onChange={e => setData({...data,email:e.target.value})}/>

        <input placeholder="Department"
          onChange={e => setData({...data,department:e.target.value})}/>

        <input placeholder="Phone"
          onChange={e => setData({...data,phone:e.target.value})}/>

        <button type="submit">Register</button>
      </form>
      <p>{error}</p>
      <Link to="/display">View Details</Link>
    </div>
  );
}

function Display({ student }) {
  useEffect(() => {
    console.log("Display page loaded");
  }, []);

  return (
    <div>
      <h2>Student Details</h2>
      {student ? (
        Object.entries(student).map(([key,value]) =>
          <p key={key}>{key}: {value}</p>
        )
      ) : <p>No student registered</p>}
      <Link to="/">Back to Form</Link>
    </div>
  );
}

export default function App() {
  const [student, setStudent] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form setStudent={setStudent}/>}/>
        <Route path="/display"
          element={<Display student={student}/>}/>
      </Routes>
    </BrowserRouter>
  );
}
