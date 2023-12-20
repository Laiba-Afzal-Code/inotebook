import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();
  const hendleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  // use useLocation to show active buton if they are active
  let location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg bg-light fw-bold bg-body-light">
    <div className="container-fluid">
    <img src="https://banner2.cleanpng.com/20180327/tpq/kisspng-scythe-don-t-get-caught-book-computer-icons-clip-a-store-shelf-5ab9e4f04332c2.4928392715221322082753.jpg" alt="iNotebook"  width={50}/>
      <Link className="navbar-brand" to="/home">iNoteBook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname ==="/home"? "active": ""}`} aria-current="page" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname ==="/about"? "active": ""}`} to="/about">About</Link>
          </li>
        </ul>
        {!localStorage.getItem('token')?<form className="d-flex" role="button">
         <Link className='btn btn-dark mx-3' to='/login'>LogIn</Link>
         <Link className='btn btn-dark mx-3' to='/signup'>SignUp</Link>
        </form>: <button onClick={hendleLogout} className='btn btn-dark'>LogOut</button>}
      </div>
    </div>
  </nav>
  )
};

export default Navbar
