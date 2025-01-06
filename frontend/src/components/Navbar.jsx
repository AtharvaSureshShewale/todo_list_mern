import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

  const navigate=useNavigate();

  const handleClick=()=>{
    localStorage.removeItem('authToken');
    navigate('/login');
  }

  return (
    <>
<nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand text-dark fw-bold" to="">
            TODO List
          </Link>
          <div className="" id="navbarNav">
            {
              !localStorage.getItem('authToken')
                ? (
                  <div className="d-flex ms-auto">
                    <Link className="btn bg-white mx-1 fw-bold" to="/login">
                      Login
                    </Link>
                    <Link className="btn bg-white mx-1 fw-bold" to="/createuser">
                      SignUp
                    </Link>
                  </div>
                ) : (
                    <div className='d-flex ms-auto'>
                    <Link className='btn text-primary pb-1' to="/create">
                    <FaPlus/>
                    </Link>
                    <div className="btn text-danger mx-1 fw-bold" onClick={handleClick}>
                      <FaSignOutAlt/>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
      </nav>
    </>
  )
}
