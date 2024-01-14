const jwt = require('jsonwebtoken');
const user = require("../models/user")
const auth = async (req,res,next)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "authToken");
        const User = await user.findOne({_id:decoded._id, "tokens.token": token})
        
        if(!User){
            throw new Error()
        }
            req.User = User;
            next()
    } catch (error) {
        res.status(400).send('Please authenticate')
    }
  
}
module.exports=auth;