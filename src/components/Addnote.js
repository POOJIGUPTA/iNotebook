import React,{useContext, useState} from 'react'
import NoteContext from '../context/NoteContext';

const Addnote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
   const [note, setnote] = useState({title:"", description:""})
    const handleClick=(e)=>{
        e.preventDefault();
         addNote(note.title, note.description);
         setnote({title:"",description:""})
         props.showAlert("success", "Note added successfully")
    }
    const handleChange=(e)=>{
        
     setnote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
      <div className="my-3">
        <h2>ADD NOTES</h2>
        <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp"  onChange={handleChange} minLength={5} required/>
    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} minLength={5} required/>
  </div>
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
    </>
  )
}

export default Addnote
