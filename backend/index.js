const connectToMongoose = require('./db')
const express = require('express')
const cors = require('cors')
// const parser = require('body-parser');
// const urlencodedParser = parser.urlencoded({extended : true});


connectToMongoose();

const app = express()
app.use(cors());
const port = 5000
app.use(express.json()); //middleware to show json in console
// app.use(parser.json());
// app.use(urlencodedParser)  

// respond with "hello world" when a GET request is made to the homepage
app.use('/auth', require('./routes/auth'))
app.use('/notes', require('./routes/notes'))
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
