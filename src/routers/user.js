const express = require('express')
const user = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//user route POST request {CREATING}
router.post('/user', async (req, res)=>{
   
    try {
        const userOne  = new user(req.body)
        const token =await  userOne.generateAuthToken()
        await userOne.save()
        res.status(201).send({userOne, token})
    } catch (error) {
        res.status(400).send(error)
    }
    
})
//logIn 
router.post('/user/login', async (req, res) => {
  try {
    //here i was having an error. the error was that i was getting the email in uppercase as mongodb is case sensitive 
    //therefore i have used toLowerCase to lowercase the email id and compare correctly
    // const logUser = await user.findByCredentials(req.body.email, req.body.password);

    const logUser = await user.findByCredentials(req.body.email.toLowerCase(), req.body.password);
    const token = await logUser.generateAuthToken()
    res.send({logUser, token})
    // res.status(200).send(user);
  }  catch (error) {
    console.log("Error during login:", error);
    res.status(400).send("Invalid credentials");
}

});


//USER ROUTE TO UPDATE A USER BY PATCH() {UPDATING A SINGLE USER}
router.patch('/user/:id', async (req, res)=>{
  const updates = Object.keys(req.body)
  const allowedUpdates=["name","email","password","age"]
  const isValidOperation = updates.every((upData)=>allowedUpdates.includes(upData))
  //Validation
  if(!isValidOperation){
      return res.status(404).send("Invalid Update!")
  }
    try {
     const User = await user.findById(req.params.id);
     if(!User){
      return res.status(404).send()
     }
      updates.forEach((update)=>User[update] = req.body[update])
      await User.save()
      res.status(200).send(User);

    } catch (error) {
      res.status(400).send(error)
    }
    //  const updateUser =  await user.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
    
}) 
//task route to GET data find() method {READING ALLL USERS}
router.get('/user/me',auth, async (req, res)=>{
   res.status(200).send(req.User)
  
  })


  
//task route to GET data findById method {READING SINGLE USSER}
router.get('/user/:id',async (req, res)=>{
    try {
        const id = req.params.id;
        const singleUser =  await user.findById(id)
        if(!singleUser){
            return 'User not found!'
        }
        res.status(200).send(singleUser)
        
    } catch (error) {
     res.status(500).send(error)   
    }
})

//SELETE METHOD {DELETING A SINGLE USER }
router.delete('/user/:id', async (req, res) => {
        try {
          const deletedUser = await user.findByIdAndDelete(req.params.id);
          if (!deletedUser) {
            return res.status(404).send();
          }
          res.status(200).send(deletedUser);
        } catch (error) {
          res.status(400).send(error); // Corrected to send the 'error' variable
        }
});
   


module.exports = router;