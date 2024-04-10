const mongoose = require('mongoose');
const validator = require('validator');
const groupSchema=require('./group')
const userSchema = new mongoose.Schema({
 
    name:{
       type:String,
       required:true,
       trim:true,
    },
    email:{
       type:String,
       required :true,
       unique:true,
       validate(value){
         if(!validator.isEmail(value)){
           throw new Error("Invalid Email Id")
         }
       }
    },
    password:{
     type:String,
     required:true,
     minlength:6,
    },
    mobile: {
        type: Number,
        required: true,
        maxLength: 10,
        minLength: 10,
    },
    total_amount: {type:Number,},
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groupSchema' // Reference to the 'Group' model
    }],
      
  owe_members:{
           type:[{
            email: {type: String,unique: true},
            members_amount: {type: Number},
            
           }]
      }
    
    
    

});

module.exports =mongoose.model('userSchema',userSchema);
