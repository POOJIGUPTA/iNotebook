
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About.js';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';


function App() {
  const[alert, setAlert]= useState('NULL');

  const showAlert=(type, message)=>{
    setAlert({
      type: type,
      msg: message
      
    })
    setTimeout(() =>{
      setAlert('NULL');
    },2000);
  }
  return (
   <>
  <NoteState>
   <Router>
   <Navbar/>
   <Alert alert={alert}/>
   <div className="container">
   <Routes>
          <Route  path="/" element={<Home showAlert={showAlert}/>}/>
          {/* <Route  path="/about" element={<About />}/> */}
          <Route  path="/login" element={<Login showAlert={showAlert} />}/>
          <Route  path="/signup" element={<Signup showAlert={showAlert}/>}/>
            
          
          {/* <Route path="/">
            <Home />
          </Route> */}
        </Routes>
        </div>
        </Router>
        </NoteState>
   </>
  );
}

export default App;
