const express =require("express");
const router =new express.Router();

//controllers
const userController = require('../Controller/usercontroller');
const groupController=require('../Controller/groupcontroller')

//user login and signup

router.post("/signupuser", userController.addinguser);
router.post("/loginuser", userController.loginuser);

//details
router.get("/getuser/:id",userController.userdetails)
router.post("/useraddingroup",userController.updateuser)
router.post("/updateuserfriend",userController.updateuserfriend)

//groups
router.post("/creategroup/:id", groupController.addGroup); //create group and it have userid
router.post("/updategroup/:id", groupController.updategroup);
router.get("/getgroups/:id",groupController.groupdetails); 


module.exports =router;