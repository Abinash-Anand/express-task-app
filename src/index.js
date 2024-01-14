const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')
const task = require('./models/task');
const user = require('./models/user')


const app = express();
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
//     if(req.method){
//         console.log("Server currently on Maintainance mode!");
//         res.status(503).send("Server currently on Maintainance mode! ")
//     }else{
//         next()
//     }
// })
// express middlewares
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, ()=>{
    console.log("the server is up and running at port", port);
})



