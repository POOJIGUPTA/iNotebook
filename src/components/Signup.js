import React, {useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"",username:"", password:"", cpassword:""})
    const navigate= useNavigate();

    const handleSubmit=async(e)=>{
     e.preventDefault();
     const {name , username, password}= credentials;
     const response = await fetch("http://localhost:5000/auth/createuser", {
      
        method: 'POST',// *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({name, username ,password})
        
      });
      const json = await response.json();
      console.log(json);
      if (json.success){
       localStorage.setItem('token', json.authtoken);
        navigate("/")
        props.showAlert("success","Account created Successfuuly")
      }
      else{
        props.showAlert("danger","Invalid credentials")
      }

    }
  const handleChange=(e)=>{
      
    setcredentials({...credentials, [e.target.name]: e.target.value})
   }
  return (
    <>
    <div className="mt-3">
      <h2>Create account to continue to iNotebook</h2>
      <form onSubmit={handleSubmit} >
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={handleChange} minLength={3} required aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Username</label>
    <input type="email" className="form-control" id="email" name="username" onChange={handleChange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    </>
  )
}

export default Signup
