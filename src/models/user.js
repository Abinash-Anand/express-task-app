const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcrypt")
//mongoose model for a user
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true,
        uppercase: true
    },
    age:{
        type: Number,
        trim: true,
        //custom validator
        validate(age){
            if(age <10){
                console.log('age is below 10');
                throw new Error("age is below 10");
            }
        }

    },
    email:{
        type: String,
        unique:true,
        trim:true,
        lowercase:true,
        validate(email){
            if(!(validator.isEmail(email))){
                throw new Error('Invalid email provided!');
            }
        }

    },
    password:{
        type:String,
        trim:true,
        required:true,
        minLength:7,
        validate:(password)=>{
            if(password.toLowerCase().includes('password')){
                throw new Error('This password text is forbidden!')
            
        }
    }
        
    }
})
//Login system
userSchema.statics.findByCredentials = async (email, password) => {
    
    const User = await user.findOne({ email });
    if (!User) {
        throw new Error("Unable to login");
    }
    console.log("parameters comparison:",await bcrypt.compare(password,User.password));

    const isMatch = await bcrypt.compare(password, User.password);
    console.log("parameters:", password, User.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    } 
    return User;
};



//Hashing the password
userSchema.pre("save", async function(next){
    const thisUser = this;
    if(thisUser.isModified('password')){
        thisUser.password = await bcrypt.hash(thisUser.password, 10)
        console.log("Successful");
        next();
    }
   else{
    next()
   }
})


const user =  mongoose.model('user',userSchema)

module.exports = user;