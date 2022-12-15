import  {useState} from 'react'
import NoteContext  from './NoteContext'

const NoteState=(props)=>{
  const host ="http://localhost:5000";
  const note=[]
      const [notes, setNotes]= useState(note);
       //GET ALL NOTE
       const getNote=async()=>{
        const response = await fetch(`${host}/notes/fetchallnotes`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            "auth-token":localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          
          
        });
       const json =  await response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
      setNotes(json)
        
      }

      //ADD A NOTE
      const addNote=async(title, description)=>{
        const response = await fetch(`${host}/notes/addnotes`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            "auth-token":localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          
          body: JSON.stringify({title,description}) // body data type must match "Content-Type" header
        });
       const json = await response.json();
       console.log(json) // parses JSON response into native JavaScript objects
      
        const note={
          "_id": "638240df82faff06d3b1fa772",
          "user": "6382247b82391551a569cd89",
          "title": title,
          "description": description,
          "date": "2022-11-26T16:37:51.093Z",
          "__v": 0
        };
         setNotes(notes.concat(note))
      }

      //DELETE NOTE
      const deleteNote=async(id)=>{
        const response = await fetch(`${host}/notes/deletenotes/${id}`, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            "auth-token":localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          
        });
       const json = await response.json(); // parses JSON response into native JavaScript objects
       console.log(json)
        console.log(id);
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
        
      }

      //EDIT A NOTE
      const editNote= async(id,title,description)=>{
        const response = await fetch(`${host}/notes/updatenotes/${id}`, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            "auth-token":localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          
          body: JSON.stringify({title,description}) // body data type must match "Content-Type" header
        });
       const json = await response.json();
       console.log(json) // parses JSON response into native JavaScript objects
      
      let newNotes= JSON.parse(JSON.stringify(note))
        for(let index=0; index<newNotes.length; index++){
          const element =newNotes[index];
          if(element._id===id){
            newNotes[index].title =title;
            newNotes[index].description=description;
            break;
          }
          setNotes(newNotes);
        }
       
        
      }
    return(
        <NoteContext.Provider value={{notes ,getNote, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
