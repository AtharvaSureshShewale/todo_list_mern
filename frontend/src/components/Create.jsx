import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

export default function Create() {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDDate] = useState("");
  const [imp, setImp] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  console.log(task, desc, status, dueDate, imp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseURL = "http://localhost:5000";
    const endpoints = "/api/todo";
    const fullUrl = baseURL + endpoints;


    const email=localStorage.getItem("userEmail");
    const addTask = { task, desc, status, dueDate, imp, email };

    const response = await fetch(fullUrl, {
      method: "POST",
      body: JSON.stringify(addTask),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.message.includes("task")) {
        setError("Task is required");
      } else if (result.message.includes("desc")) {
        setError("Description is required");
      } else {
        setError(result.message || "an error occured");
      }
    }

    if (response.ok) {
      setError("");
      setTask("");
      setDesc("");
      setStatus("");
      setDDate("");
      setImp("");
      navigate("/");
    }
  };

  return (
    <>
    <div><Navbar/></div>
      <div className="container my-2">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Task</label>
            <input
              type="text"
              className="form-control"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              id="exampleDropdown"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="exampleDate"
              required
              value={dueDate}
              onChange={(e) => setDDate(e.target.value)}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={imp}
              onChange={(e) => setImp(!imp)}
            />
            <label className="form-check-label">Important</label>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
