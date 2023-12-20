import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className="container foot my-5">
        <h1>Footer</h1>
        <div className="mainfoot">
            <h1>iNotebook</h1>
        <form className="d-flex footbtn" role="button">
         <Link className='btn btn-dark mx-3' to='/login'>LogIn</Link>
         <Link className='btn btn-dark mx-3' to='/signup'>SignUp</Link>
        </form>
        </div>
          <h4>iNotebook - Where Ideas Take Flight.</h4>
      </div>
    </div>
  )
}

export default Footer
