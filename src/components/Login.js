
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    // we use usenavigate from react-router-dom to redirict our user on home page!
    const navigate = useNavigate();
    //use onSubmit function on form to submit form and get authtoken
    const hendleSubmit = async (e)=>{
        e.preventDefault(); // use to never relode our web page
        // Api call for user from backend
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          const json = await response.json()
          console.log(json);
          // redireact if our user are login successfully with vaild data!
          if(json.success){
            //save the authtoken and redireact 
            localStorage.setItem('token', json.authtoken);
            navigate('/home');
          }
          else{
            alert("invalid credentials!")
          }
        };
        // onchange function on input to get and do changes
        const onChange = (e) => {
          setCredentials({...credentials, [e.target.name]: e.target.value });
        };
  return (
    //JSX
    <div>
      <div className="container py-5 px-4 my-3 logback">
     <form onSubmit={hendleSubmit}>
      <h1 className='back py-3 my-3'>LogIn</h1>
  <div className="mb-3 fw-bold">
    <label htmlFor="email" className="form-label py-2">Email Address:</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" aria-describedby="emailHelp"/>
    <div id="emailhelp"  className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 fw-bold">
    <label htmlFor="password" className="form-label">Password:</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password"/>
  </div>
  <button type="submit" className="btn btn-dark my-3">Submit!</button>
</form>
</div>
    </div>
  )
}

export default Login;
