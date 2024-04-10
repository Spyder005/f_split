const dotenv = require('dotenv');
dotenv.config()

const express = require('express')
const cors= require('cors');
const mongoDB =require('./database')

//import router
const router =require('./Router/router')




const app =express();
const port = process.env.PORT;


// Cors policy
app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Accept");
    next();
});

//Database connection
 mongoDB()

//JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




//Load routes 
// console.log("hii")
app.use('/api',router);

app.listen(port,() => {
    console.log(`Server Listening at http://localhost:${port}`)
});