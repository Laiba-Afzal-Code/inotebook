import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className="container  d-flex foot my-5 py-5">
        <div className="mainfoot">
        <h1>iNotebook</h1>
        <h4>iNotebook - Where Ideas Take Flight.</h4>
        <form className="d-flex py-5 footbtn" role="button">
         <Link className='btn btn-dark mx-3' to='/login'>LogIn</Link>
         <Link className='btn btn-dark mx-3' to='/signup'>SignUp</Link>
        </form>
         <p>Create your creative notes and Enhance your knoledage on our best websites!</p>
         <p>Thanks for Useing iNotebook<i className="fa-solid fa-face-smile-beam mx-2"></i></p>
        </div>
        <div className="mainfoot">
        <h1>Highlights</h1>
        <h4>Explore our website and start your Learning-</h4>
        <form className="py-5 footbtn" role="button">
         <Link className='btn btn-dark mx-3' to='/home'>Home</Link>
         <Link className='btn btn-dark mx-3' to='/about'>About</Link>
        </form>
         <p><i className="fa-solid fa-envelope mx-2"></i>Contact us for more information and any help!</p>
         <p><i className="fa-solid fa-laptop-file mx-2"></i>Enjoy-Learning-Enjoy-iNotebook</p>
        </div>
         
      </div>
      <div className="fot">
      <h5>© 2023 iNotebook website - www.inotebook.com - Do not share my personal information!</h5>
      </div>
    </div>
  )
}

export default Footer;
