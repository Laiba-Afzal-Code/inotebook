import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  // we use usenavigate from react-router-dom to redirict our user on home page!
  const navigate = useNavigate();
  //use onSubmit function on form to submit form and get authtoken
  const hendleSubmit = async (e)=>{
      e.preventDefault(); // use to never relode our web page
      // Api call for user from backend
      const {name, email, password} = credentials
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
        });
        const json = await response.json()
        console.log(json);
        // redireact - if our user are signup successfully with vaild data!
        if(json.success){
          //save the authtoken and redireact 
          localStorage.setItem('token', json.authtoken);
          navigate('/home');
          props.showAlert("Account Created Successfully", "success")
        }
        else{
         props.showAlert("Invaild credentials", "danger")
        }
      };
      // onchange function on input to get and do changes
      const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value });
      };
return (
  //JSX
  <div>
    <div className="container signback my-5 py-5 px-3">

   <form onSubmit={hendleSubmit}>
   <h1 className='back py-3 my-5 px-4'>SignUp</h1>
   <div className="mb-3 fw-bold">
  <label htmlFor="name" className="form-label">Name:</label>
  <input type="text" className="form-control" value={credentials.name} onChange={onChange} name="name" id="name" aria-describedby="nameHelp"/>
</div>
<div className="mb-3 fw-bold">
  <label htmlFor="email" className="form-label">Email:</label>
  <input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" aria-describedby="emailHelp"/>
  <div id="emailhelp"  className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3 fw-bold">
  <label htmlFor="password" className="form-label">Password:</label>
  <input type="password" className="form-control" value={credentials.password} onChange={onChange} minLength={5} required name="password" id="password"/>
</div>
<div className="mb-3 fw-bold">
  <label htmlFor="password" className="form-label">Confirm Password:</label>
  <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} minLength={5} required name="cpassword" id="cpassword"/>
</div>
<button type="submit" className="btn btn-dark py-1 px-3 my-4">Submit!</button>
</form>
</div>
  </div>
)
}

export default Signup;
