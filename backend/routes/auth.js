const express =require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 const JWT_SECRET='THISISSECRET';
const fetchuser = require('../middleware/fetchuser')

router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 3 }),    //validate schemas, enter a vlid anme is the error msg show if error occurs

    body('username','Enter a valid email').isEmail(),
    body('password','enter password of atleat 5 char').isLength({ min: 5 }),
],async (req, res)=>{
  let success = false; 
    const errors =validationResult(req);   //if schema validate ho gya toh err array 0 hoga varna nhi
    if (!errors.isEmpty()) {                //array 0 nhi hua toh return i.e show hoga error jo likha hai
        return res.status(400).json({success, errors: errors.array() });
      }
      //for unique user
      try{
      let user = await User.findOne({username: req.body.email});
      if (user){
        console.log(user);
        return res.status(400).json({error:"email already exists"})
      }
      const salt = await bcrypt.genSalt(5);  //generate bcrypt salt
      const pass = await bcrypt.hash(req.body.password ,salt);      //create hash of pass+salt
     user=await User.create({
        name: req.body.name,
        username: req.body.username,
        password: pass
      })
    const data={
      user:{
        id:user.id
      }
    }
      const authtoken =jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
    
    //syntax below used when not using async

    //   .then(user => res.json(user))  
    //   .catch(err=> console.log(err))
    // console.log(req.body); to show entered data in console
    // const user = User(req.body);
    // user.save();

    // res.send(req.body);
})

router.post('/login',[
  body('username','Enter a valid email').isEmail(),
  body('password','Enter correct password').exists(),
 ], async (req, res)=>{
  let success = false; 
    const errors =validationResult(req);   //if schema validate ho gya toh err array 0 hoga varna nhi
    if (!errors.isEmpty()) { 
                    //array 0 nhi hua toh return i.e show hoga error jo likha hai
        return res.status(400).json({ errors: errors.array() });
      }
      const {username , password} =req.body;
      try{
        let user = await User.findOne({username});    //check whether username exists or not
        if (!user){
           success = false;
          return res.status(400).json({error:"Try login with correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);  // check whether password is correct or not
        if(!passwordCompare){
          success = false;
          return res.status(400).json({ success,error:"Try login with correct credentials"})
        }
        const data={
          user:{
            id:user.id
          }
        }
          const authtoken =jwt.sign(data, JWT_SECRET);
           success = true;
          res.json({success,authtoken})
        }
        catch(error){
            console.log(error.message);
            res.status(500).send("Internal server error");
        }
    })

    router.post('/getuser', fetchuser , async(req,res)=>{
   try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password") ; //select mtlb jo user fetch kre toh sab fetch except jo select mai likha here password i.e -(minus)password likha hai
    res.send(user)
   }
   catch(error){
    console.log(error.message);
    res.status(500).send("Internal server error");
}
    })
module.exports = router