const express = require('express')
require('./db/mongoose')
const user = require('./models/user')
const task = require('./models/task')
const app = express();
const port = process.env.PORT || 3000
app.use(express.json())

//user route POST request
app.post('/user',(req, res)=>{
    const userOne  = new user(req.body)
    userOne.save().then((result)=>{
        res.send(userOne)
    }).catch((error)=>{
        res.send(error)
    })
})



//task route POST request
app.post('/task', (req, res)=>{
    const newTask = new task(req.body);
    newTask.save().then((result)=>{
        res.send(newTask)
    }).catch((error)=>{

        res.status(400).send(error)
        })
})

//task route to GET data  find all method
app.get('/task', (req, res)=>{
   
    task.find({}).then((task)=>{
        res.send(task)
    }).catch((e)=>{
        res.send(e)
    })
})
//task route to GET data findById method
app.get('/task/:id', (req, res)=>{
    const id = req.params.id;
    task.findById(id).then((task)=>{
     if(!task){
        return res.status(404).send()
     }
        res.send(task)
    }).catch((e)=>{
        res.status(500).send(e)
    })

})
app.listen(port, ()=>{
    console.log("the server is up and running at port", port);
})