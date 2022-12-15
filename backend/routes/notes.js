const express =require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes =require('../models/Notes')
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes',fetchuser, async(req, res)=>{
    try {
        const notes = await Notes.find({ user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
    
})

router.post('/addnotes',fetchuser,[
    body('title','Enter a title').isLength({ min: 5 }),
    body('description','enter desciption').isLength({ min: 5 }),
] ,async(req,res)=>{
    try {
        const{title,description} =req.body;
    const errors =validationResult(req);   
    if (!errors.isEmpty()) {                
        return res.status(400).json({ errors: errors.array() });
      }
       const note = new Notes({
            title,description,user: req.user.id
        })
        const savenote = await note.save()
        res.json(savenote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})

router.put('/updatenotes/:id',fetchuser,async(req,res)=>{    //:id means id bhi pass krni pdegi
  const{title,description}=req.body;
  const newNote ={};
  if(title){newNote.title =title};
  if(description){newNote.description =description  };

  let note= await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("NOT FOUND")
  }
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("NOT ALLOWED");
  }
  note =await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
  res.json({note});
})

router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{    //:id means id bhi pass krni pdegi
    try{
    let note= await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("NOT FOUND")
    }
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("NOT ALLOWED");
    }
    note =await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Notes deleted successfully",note: note});
}
catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
}
  })
module.exports = router;

