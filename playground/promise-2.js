require('../src/db/mongoose')
const Task = require('../src/models/task')
// Task.findByIdAndDelete('65952b952cbee735519c0c97').then((task)=>{
//     console.log(task);
//     return Task.countDocuments({completed:true})
// }).then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log(e);
// })


const deleteTaskAndCount = async (id)=>{
    const deleteTaskById = await Task.findByIdAndDelete(id);
    const countDocument = await Task.countDocuments({completed:true}) 
    return {deleteTaskById,countDocument};
}
deleteTaskAndCount('65952a0b7532fbb15732bd5b').then((result)=>{
    console.log("result",result);
}).catch((e)=>{
    console.log(e);
})