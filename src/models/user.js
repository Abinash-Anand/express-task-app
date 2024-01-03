const mongoose = require('mongoose')
const validator = require("validator");

//mongoose model for a user
const user =  mongoose.model('user',{
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

module.exports = user;