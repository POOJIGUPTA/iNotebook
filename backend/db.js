const mongoose = require('mongoose');
const mongoURI ="mongodb+srv://inotebook:inotebook@cluster0.hkosnyd.mongodb.net/?retryWrites=true&w=majority"

const connectToMongoose =()=>{
mongoose.connect(mongoURI ,()=>{
    console.log('database connected');
    })
}

module.exports = connectToMongoose;