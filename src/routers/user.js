const express = require('express')
const user = require('../models/user')
const router = new express.Router()

//user route POST request {CREATING}
router.post('/user', async (req, res)=>{
   
    try {
        const userOne  = new user(req.body)
        await userOne.save()
        res.status(201).send(userOne)
    } catch (error) {
        res.status(400).send(error)
    }
    
})
//USER ROUTE TO UPDATE A USER BY PATCH() {UPDATING A SINGLE USER}
router.patch('/user/:id', async (req, res)=>{
  const users = Object.keys(req.body)
  const allowedUpdates=["name","email","password","age"]
  const isValidUpdate = users.every((upData)=>allowedUpdates.includes(upData))
  if(!isValidUpdate){
      return res.status(404).send("Invalid Update!")
  }
    try {
     const updateUser = await user.findById(req.params.id);
     if(!updateUser){
      return res.status(404).send()
     }
      users.forEach((update)=>updateUser[update] = req.body[update])
      await updateUser.save()
    //  const updateUser =  await user.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
    
     res.status(200).send(updateUser);

    } catch (error) {
      res.status(400).send(error)
    }
    
}) 
//task route to GET data find() method {READING ALLL USERS}
router.get('/user', async (req, res)=>{
    try {
          const userFinder = await user.find({})
          res.status(200).send(userFinder)
    } catch (error) {
      res.status(400).send(error)
    }
  
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