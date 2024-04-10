const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
   email: {
       type: String,
       required: true ,
       // Assuming email is required
       unique: true
      },
   members_amount: {
       type: Number, // Adjust type as needed (e.g., Number, or any other valid type)
       default:0
      }
});

const groupSchema = new mongoose.Schema({
       group_name:{
          type:String,
          required:true,
          unqiue:true,
       },
       members:[
         memberSchema],
       
       total_group_amount:{
        type:Number,

       }


})

module.exports =mongoose.model('groupSchema',groupSchema);