const express = require('express')
const task = require('../models/task')
const router = new express.Router()

//task route POST request {CREATING A TASK}
router.post('/task', async (req, res)=>{
    try {
        const newTask =  new task(req.body);
        await  newTask.save()
        res.status(201).send(newTask);


    } catch (error) {
            res.status(400).send(error)
    }

})

//task route to GET data  find all method {READING ALL TASKS}
router.get('/task', async (req, res)=>{
  try {
        const taskFinder = await task.find({})
        res.status(200).send(taskFinder)
  } catch (error) {
    res.status(400).send(error)
  }

})


//task route to GET data findById method {READING A SINGLE TASK}
router.get('/task/:id',async (req, res)=>{
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

router.patch('/task/:id', async (req, res)=>{
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
router.delete('/task/:id', async (req, res)=>{
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


module.exports= router;