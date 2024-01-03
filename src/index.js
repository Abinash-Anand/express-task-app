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

app.listen(port, ()=>{
    console.log("the server is up and running at port", port);
})