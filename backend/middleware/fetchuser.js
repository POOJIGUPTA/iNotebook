const jwt = require('jsonwebtoken');
JWT_SECRET='THISISSECRET';
 
const fetchuser=(req,res,next)=>{
    const token= req.header('auth-token');   //ye hum thunderclient ke header mai dalte hai ki yha se checl ho auth token hamara
    if(!token){
        return res.status(401).json({error:"Pleare authenticate using a valid token"});
    }
    const data = jwt.verify(token,JWT_SECRET );   //verify token
    req.user = data.user;
    next()               //ki jab sab ho jae is fun mai toh jha se req aai hai uski next fun chl jae here(req,res)
}

module.exports = fetchuser;