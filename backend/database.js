const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL;
const mongoURI = DATABASE_URL
const mongoDB =async()=>{
    try{ console.log("connection start")
        await mongoose.connect(mongoURI, { useNewUrlParser: true ,useUnifiedTopology: true  });
        console.log('Connected to MongoDB');
    } catch(e){
        console.log('Error connecting to MongoDB : ',e)
    }
}

module.exports =mongoDB;