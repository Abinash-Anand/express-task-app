require('../src/db/mongoose');
const user = require('../src/models/user')
user.findByIdAndUpdate('658ed7b6a9ca3a20745c4d56', {age:10}).then((result) => {
    console.log(result);
    return user.countDocuments({age:10})
  }).then((result)=>{
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
