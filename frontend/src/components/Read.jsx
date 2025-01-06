import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from './Navbar';
export default function Read() {
  const [search,setSearch]=useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  // const [ddd,setDDD]=useState("");
  const [taskCat,setTaskCat]=useState([]);

  const baseURL = "http://localhost:5000";
  const endpoints1 = "/api/todo";
  const fullUrl1 = baseURL + endpoints1;

  const endpoints2 = "/api/taskData";
  const fullUrl2 = baseURL + endpoints2;

  const dataLoad=async()=>{
    const response=await fetch(fullUrl2,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      }
    });

    const result=await response.json();

    if(!response.ok){
      setError(result.message);
    }

    if(response.ok){
      setError("");
      setTaskCat(result);
      console.log(result);
    }
  }

  const getTask = async () => {
    const response = await fetch(fullUrl1);
    const result = await response.json();

    if (!response.ok) {
      setError(result.message);
    }

    if (response.ok) {
      const loadData=result.message;
      const userTasks=loadData.filter((item)=>item.email===localStorage.getItem('userEmail'));
      setData(userTasks.length?userTasks:[])
      setError("");
    }
  };

  const handleDelete=async(id)=>{
    const response=await fetch(fullUrl1+`/${id}`,{method:"DELETE"});
    const result= await response.json();

    if(!response.ok){
      setError(result.message);
    }
    
    if(response.ok){
      setError("Deleted Successfully");

      setTimeout(() => {
        setError("");
        getTask();
      }, 1000);
    }
    
  }

  useEffect(() => {
    getTask();
    dataLoad();
  }, []);

  return (
    <>
    <div><Navbar/></div>
      <div className="container">
      <input className="form-control align-left" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      </div>
      <div className="container my-2">
        {error && <div className="alert alert-danger">{error}</div>}
        <h3 className="text-left">Your Tasks</h3>
        {
          taskCat!==0
          ?taskCat.map((cdata)=>{
            return(
              <div key={cdata._id} className="row mb-3">
                <div className="fs-3 m-3">{cdata.statusType}</div>
                <hr className="mx-2"/>
                {
                  data.length!==0?
                  (
                    data?.filter((item)=> cdata.statusType===item.status &&  item.task.toLowerCase().includes(search.toLowerCase()))
                    .reverse().sort((a,b)=>b.imp-a.imp)
                    .map((item) => (
                      <React.Fragment key={item._id}>
                        <div className="container mt-5">
                          <div className="card d-flex flex-column flex-md-row">
                            <div className="card-body d-flex flex-column">
                              <div className="me-4 mb-2">
                                <h5 className="card-title text-primary">{item.task}</h5>
                                <p className="card-text">
                                  <strong>Description:</strong> {item.desc}
                                </p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-column flex-md-row">
                                  <p className="card-text me-3 mb-2 mb-md-0">
                                    <strong>Due Date:</strong> 
                                    {item.dueDate ? new Date(item.dueDate).toISOString().split('T')[0] : 'Not Specified'}
                                  </p>
                                  <p className="card-text me-3 mb-2 mb-md-0">
                                    <strong>Status:</strong>
                                    <span className={`badge ${item.status === 'pending' ? 'bg-warning' : 'bg-success'} ms-1`}>
                                      {item.status}
                                    </span>
                                  </p>
                                  <p className="card-text mb-2 mb-md-0">
                                    {item.imp === true ? <span className="badge bg-danger">Importance</span> : ''}
                                  </p>
                                </div>
                                <div className="d-flex flex-row align-items-end mt-2 mt-md-0">
                                  <Link to={`/update/${item._id}`} className="text-primary me-2">
                                    <FaEdit />
                                  </Link>
                                  <Link onClick={() => { handleDelete(item._id); }} className="text-danger">
                                    <FaTrashAlt />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))
                  ):
                  (<p>No Tasks to display</p>)
                }
              </div>
            );
          })
          :<div>""""""""""</div>
        }
      </div>
    </>
  );
}


