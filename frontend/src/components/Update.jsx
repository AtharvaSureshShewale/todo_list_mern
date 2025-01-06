import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
export default function Update() {

    const [task, setTask] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("");
    const [dueDate, setDDate] = useState("");
    const [imp, setImp] = useState(false);
    const [error, setError] = useState("");

    const navigate=useNavigate();
    const baseURL = "http://localhost:5000";
    const endpoints = "/api/todo";
    const fullUrl = baseURL + endpoints;

    const {id}=useParams();
    console.log(id);
  const getSingleTask=async()=>{
    const response=await fetch(fullUrl+`/${id}`);
    const result=await response.json();

    if(!response.ok){
      setError(result.message);
    }

    if(response.ok){
      setError("");
      setTask(result.message.task);
      setDesc(result.message.desc);
      setStatus(result.message.status);
      const formatedDate=new Date(result.message.dueDate).toISOString().split('T')[0];
      setDDate(formatedDate);
      setImp(result.message.imp);
    }
  }
  console.log(task, desc, status, dueDate, imp);
  const handleEdit=async(e)=>{
    e.preventDefault();
    const user={task,desc,status,dueDate,imp};

    const response=await fetch(fullUrl+`/${id}`,{
      method:"PATCH",
      body:JSON.stringify(user),
      headers:{
        'Content-Type':'application/json',
      }
    });

    const result=await response.json();

    if(!response.ok){
      setError(result.message);
    }

    if(response.ok){
      setError("Updated Successfully");

      setTimeout(() => {
        console.log(result);
        setError("");
        setTask("");
        setDesc("");
        setStatus("");
        setDDate("");
        setImp("");
        navigate("/");
      }, 1000);
    }
  }

  useEffect(() => {
    getSingleTask();
  }, []);
  
  return (
    <>
    <div><Navbar/></div>
     <div className="container my-2">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleEdit}>
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
  )
}
