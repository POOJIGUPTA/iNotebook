import React,{useState } from 'react'
import {  useNavigate } from 'react-router-dom'



const Login = (props) => {
    const [credentials, setcredentials] = useState({username:"", password:""})
    const navigate= useNavigate();

    const handleSubmit=async(e)=>{
     e.preventDefault();
     const response = await fetch("http://localhost:5000/auth/login", {
        method: 'POST',// *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({username:credentials.username ,password:credentials.password})
        
      });
      const json = await response.json();
      console.log(json);
      if (json.success){
       localStorage.setItem('token', json.authtoken);
       props.showAlert("success","Successfuuly logged in")
        navigate("/")
    
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
      <h2>LOGIN to continue to iNotebook</h2>
      <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label" >Username</label>
    <input type="email" className="form-control" id="email" name="username" value={credentials.email} onChange={handleChange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label" onChange={handleChange}>Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
  </div>
  {/* <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
</div>
    </>
  )
}

export default Login
