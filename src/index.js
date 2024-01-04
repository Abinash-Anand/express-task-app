const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')
const task = require('./models/task');
const user = require('./models/user')


const app = express();
const port = process.env.PORT || 3000

// express middlewares
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, ()=>{
    console.log("the server is up and running at port", port);
})