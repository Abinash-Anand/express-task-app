require('../src/db/mongoose')
const Task = require('../src/models/task')
Task.findByIdAndDelete('65952b952cbee735519c0c97').then((task)=>{
    console.log(task);
    return Task.countDocuments({completed:true})
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})