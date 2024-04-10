const newUser =require('../Models/user');
const Group = require('../Models/group')
const bcrypt =require('bcryptjs');
const jwt =require("jsonwebtoken");
const { groupdetails } = require('./groupcontroller');
// const nodemailer = require("nodemailer");
const keysecret = process.env.JWT_SECRET_KEY;

//for user registration
exports.addinguser=async(req,res)=>{
    const {name,email,password,mobile,cpassword} =req.body;
   
    //checking validation
    if(!name || !email || !password || !mobile|| !cpassword){
        return res.status(400).json({error:"All fields are required!"})
    }  
    else{
        try{
            
             const preuser = await newUser.findOne({email:email})  //databse email :frontent email

             if(preuser){
                return res.status(400).json({error:"This email is Already Exist!"}) 
             }else if(password !==cpassword){
                return res.status(400).json({error:"Password and Confirm Password Not Match"})
             }else{
                 //here password hasing 
                //  console.log("hii")
                 const hashpassword = await bcrypt.hash(password,6);
                  console.log(hashpassword)

                const finalUser =new newUser ({
                    name,email,password:hashpassword,mobile        
                });

               
                const storeData =await finalUser.save();
                console.log(storeData);
                return res.status(200).json({success:"User register Sucessfully!",data:storeData})

             }


        }catch(error){
          
            console.log("catch block error",error.message);
            return res.status(400).json(error);

        }
    }    
}


//for loginuser
exports.loginuser=async(req,res)=>{
    //   console.log(req.body);

    const {email,password} =req.body;

    //checking validation
    if(!email || !password){
        return res.status(400).json({error:"All fields are required!"})
    }  
    else{
        try{
             const userValid = await newUser.findOne({email:email});
             if(userValid){
                const isMatch = await bcrypt.compare(password,userValid.password);    //entered passwort ,old passwordat the time of register
                if(!isMatch){
                   res.status(400).json({error:"Invalid Password"});
                }
                else{
                    //generating token
                    console.log("key secret: ",keysecret)
                    const token = await jwt.sign({email:email},keysecret,{
                        expiresIn:"1d"
                       });
                    //  async function(){
                    //     try{
                    //         let tokengen = jwt.sign({email:email},keysecret,{
                    //          expiresIn:"1d"
                    //         });
                    //         console.log("tokengen",tokengen);
                    //         return tokengen;
                            
                         
                    //     }catch(error){
                    //          res.status(400).json(error);
                    //     }
                    // };  
                    

                     //cookie genrating 
                     res.cookie("usercookie",token,{
                          expires:new Date(Date.now()+9000000),
                          httpOnly:true
                     });

                     const result = {
                        userValid,
                        token,
                    };
                    
                    res.status(200).json({ status: 200, result });
                } 
            }
        }
        catch(error){
            console.log("catch block error",error);
            return res.status(400).json(error);
        }
    }
}
    

//for single user details
exports.userdetails=async(req,res) => {
    const {id} = req.params;
    try{
        const userdata = await newUser.findById({_id:id}).populate('groups');
       console.log(userdata);
       res.json(userdata);
   }catch(error){
    console.error('Error finding user and populating groups:', error);
    
     res.status(401).json(error);
   }
   }

//for add groups in  user details
exports.updateuser = async (req, res) => {
    const { group_id, email } = req.body;
    

    try {   

        //for adding member of email of creating member
        const groupdetails = await (async(req,res)=>{ const {id} = req.params;
            try{
                const groupdata = await newGroup.findOneAndUpdate(
                    { _id: id },
                    {
                        $push: {
                            members: {
                                group_amount: 0,
                                group_members: email
                            }
                        }
                    },
                    { new: true } // To return the updated document
                );
               console.log(groupdata);
               res.json(groupdata);
           }catch(error){
             console.log("catch block error",error);
             res.status(401).json(error);
           }})

           console.log(groupdetails)
  
        // const owe_members=await Group.findOneAndUpdate({id: group_id},$push:{'owe_members':{members:}})
        const userdata = await newUser.findOneAndUpdate(
            { email: email },
            { $push: { 'groups': group_id } },
            { new: true }
        );

        if (!userdata) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log(userdata);
        
        return res.status(200).json(userdata);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


exports.updateuserfriend = async (req,res)=>{
    const { owe_members_email, members_amount, email } = req.body;

    try {
        // Find the user document where email matches
        const user = await newUser.findOne({ email });
    
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        // Find the owe_member object with the specified email
        let oweMember = user.owe_members.find(member => member.email === owe_members_email);
           console.log(oweMember)
        if (!oweMember) {
            //create a new owe member of a user for adding expense
            let  Member ={
                email:owe_members_email,
                members_amount: members_amount
          } 
          user.owe_members.push(Member)
            await user.save();

            res.status(200).json({ message: 'Owe member created' });
        }
        else{
        //   console.log(oweMember)
        //  Updatee new members_amount value into the members_amount 

        const old_amount = oweMember.members_amount

        //if members_amount is zero it means we settle down so else will execute
        if(members_amount){
            oweMember.members_amount = members_amount +old_amount;
            } 
            else{
                oweMember.members_amount= Number(0)
            }
        
    
        // Save the updated user document
        await user.save();
    
        res.json({ user });}
    } catch (error) {
        console.error('Error updating user friend:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    


  
   
}  




   