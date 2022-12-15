const mongoose= require('mongoose')
const {Schema} =mongoose;

const NotesSchema = new Schema({
    user:{                                   //foreign key ki jisne login kiya h uske hi notes show ho
      type: mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
    title:{
    type : String,
    required: true
    },
    description :{
       type: String,
       required : true
    },
    date:{
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Notes', NotesSchema);