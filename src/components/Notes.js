import React,{useContext,useEffect, useRef,useState} from 'react'
import NoteContext from '../context/NoteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom';
export default function Notes (props) {
    const context = useContext(NoteContext);
    const {notes ,getNote, editNote} = context;
    const [note, setnote] = useState({id:"",etitle:"", edescription:""})
    const navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNote()
      }
     else{
navigate('/login')
     }
    // eslint-disable-next-line
    }, [])
    const updateNote=(currentnote)=>{
          ref.current.click();
          setnote({id:currentnote._id, etitle: currentnote.title, edescription: currentnote.description})
          
    }
    const ref =useRef(null)
    const refclose =useRef(null)

    const handleClick=(e)=>{
      console.log(note);
      editNote(note.id, note.etitle, note.edescription);
      refclose.current.click();
      props.showAlert("success","Note Updated successfully")
       
  }
  const handleChange=(e)=>{
      
   setnote({...note, [e.target.name]: e.target.value})
  }
  return (
   
    <>
     <Addnote showAlert={props.showAlert} />
    
<button ref ={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp"  onChange={handleChange} minLength={5} required />
   
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} minLength={5} required/>
  </div>
  
</form>
      </div>
      <div className="modal-footer">
        <button ref ={refclose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
     <div className="row my-3">
    <h2>YOUR NOTES </h2>
    {notes.map((note)=>{
        return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>;
    })}
    </div>
    </>
  )
}
