const express = require('express')
require('./db/mongoose')
const user = require('./models/user')
const task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000
app.use(express.json())

//user route POST request {CREATING}
app.post('/user', async (req, res)=>{
   
    try {
        const userOne  = new user(req.body)
        await userOne.save()
        res.status(201).send(userOne)
    } catch (error) {
        res.status(400).send(error)
    }
    
})

//task route to GET data find() method {READING ALLL USERS}
app.get('/user', async (req, res)=>{
    try {
          const userFinder = await user.find({})
          res.status(200).send(userFinder)
    } catch (error) {
      res.status(400).send(error)
    }
  
  })


  
//task route to GET data findById method {READING SINGLE USSER}
app.get('/user/:id',async (req, res)=>{
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
//USER ROUTE TO UPDATE A USER BY PATCH() {UPDATING A SINGLE USER}
app.patch('/user/:id', async (req, res)=>{
    try {
     const updateUser =  await user.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
     if(!updateUser){
      return res.status(404).send()
     }
     res.status(200).send(updateUser);

    } catch (error) {
      res.status(400).send(error)
    }
    
}) 
    //SELETE METHOD {DELETING A SINGLE USER }
    app.delete('/user/:id', async (req, res) => {
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
      

//task route POST request {CREATING A TASK}
app.post('/task', async (req, res)=>{
    try {
        const newTask =  new task(req.body);
        await  newTask.save()
        res.status(201).send(newTask);


    } catch (error) {
            res.status(400).send(error)
    }

})

//task route to GET data  find all method {READING ALL TASKS}
app.get('/task', async (req, res)=>{
  try {
        const taskFinder = await task.find({})
        res.status(200).send(taskFinder)
  } catch (error) {
    res.status(400).send(error)
  }

})


//task route to GET data findById method {READING A SINGLE TASK}
app.get('/task/:id',async (req, res)=>{
    try {
        const id = req.params.id;
        const singleTask =  await task.findById(id)
        if(!singleTask){
            return 'Task not found!'
        }
        res.status(200).send(singleTask)
        
    } catch (error) {
     res.status(500).send(error)   
    }

 

//TASK ROUTE TO UPDATE A TASK BY PATCH() {UPDATING A SINGLE TASK}

    app.patch('/task/:id', async (req, res)=>{
        try {
         const updateTask =  await task.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})
         if(!updateTask){
          return res.status(404).send()
         }
         res.status(200).send(updateTask);
  
        } catch (error) {
          res.status(400).send(error)
        }
        
      }) 


//TASK ROUTE TO DELETE A TASK BY PATCH() {DELETING A SINGLE TASK}
app.delete('/task/:id', async (req, res)=>{
    try {
        const deleteOneTask =  await task.findByIdAndDelete(req.params.id);
        if(!deleteOneTask){
          return res.status(404).send('Task not found')
        }
        res.status(200).send(deleteOneTask)
    } catch (error) {
        res.status(500).send(error)
    }
 
})



})
app.listen(port, ()=>{
    console.log("the server is up and running at port", port);
})