const { response } = require('express');
const newGroup = require('../Models/group')
const newUser =require('../Models/user')

//create a new group
exports.addGroup = async (req,res)=>{
    const {group_name,total_group_amount,members} =req.body;
    const {id} =req.params

    
    
    if(!group_name || !members ){
        return res.status(400).json({error:"All fields are required!"})
    } 
    else{
        try{
            
            const pregroup = await newGroup.findOne({group_name:group_name})  //databse email :frontent email

            if(pregroup){
               return res.status(400).json({error:"This group is Already Exist!"}) 
            }else{
              

               const group =new newGroup ({
                group_name,total_group_amount,members   
               });

              
               const storeData =await group.save();
               console.log(storeData);
               
               //push group id to a user created it
               const userdata = await newUser.findByIdAndUpdate(
                { _id: id },
                { $push: { 'groups': storeData?._id } },
                { new: true }
            );

           
    
            if (!userdata) {
                return res.status(404).json({ error: "User not found" });
            }
    
            console.log(userdata);
            // const userreturn = await res.status(200).json(userdata);
            
            // return res.status(200).json(userdata);



             //push group members in a user as a owe frnd
            // let add_frnd
             const owe_frnd = storeData?.members.filter((element) =>{ 
                if(userdata.email!==element.email){
                    return element
                //   const ans =  userData.owe_frnd.map((element2)=>{
                //             if(element2.email!=element.email){
                //                 return element
                //             }
                //     })
                }
                 })
             const userd = await newUser.findByIdAndUpdate(
                { _id: id },
                { $push: { 'owe_members': owe_frnd

                 } },
                { new: true }
            ); 



              //for adding member of email of creating member in group details
                    
                      
              const groupdata = await  newGroup.findOneAndUpdate(
                { group_name:group_name },
                {
                    $push: {
                        members: {
                            members_amount: 0,
                            email: userdata.email
                        }
                    }
                },
                { new: true } // To return the updated document
            );
           console.log(groupdata);
           if(groupdata){
        //    return res.status(200).json({success:"group added Sucessfully and also add member in group!",groupdata,userdata})
            console.log(groupdata);
    }
           else {
         console.log("last catch block error",);
         res.status(401).json("error");
       }

       //jitne member he group me unke database me group id store krwaya
    //    const promises = groupdata.members.map(async (member) => {
    //     // Find the user by email and update the 'groups' array
    //     const updatedUser = await newGroup.findOneAndUpdate(
    //         { email: member.email },
    //         { $push: { groups: storeData?._id } }, // Assuming storeData contains the new group ID
    //         { new: true }
    //     );
    //     return updatedUser;
    // });
      const userGroupIdAdd= groupdata.members.map(async (index)=>{
       const  updatedUser =  newGroup.findOneAndUpdate(
        { email: index.email},
        { $push: { 'groups': storeData?._id } },
        { new: true }
    );
     
    if (!updatedUser) {
        return res.status(404).json({ error: "userGroupIdAdd not execute" });
    }
    return updatedUser;

})
console.log(userGroupIdAdd); 

    //    //jitne member he group me unke database me group id store krwaya
    //    const userGroupIdAdd = await newGroup.findOneAndUpdate(
    //     { email: id },
    //     { $push: { 'groups': storeData?._id } },
    //     { new: true }
    // );

    if (!userGroupIdAdd) {
        return res.status(404).json({ error: "userGroupIdAdd not execute" });
    }
    else{
        console.log(userGroupIdAdd);
        return res.status(200).json({success:"group added Sucessfully and also add member in group and member me bhi group id add kr di!",groupdata,userdata})
     
    }
 
        }

        }catch(error){
         
           console.log("catch block error",error.message);
           return res.status(400).json(error);

       }
    }
}
//edit or update a group
exports.updategroup=async(req,res)=>{
    const {id} = req.params;
    const {group_name,total_group_amount,members} =req.body;

    //consle.log(req.body);

    try{
       

        const groupupdate=await newGroup.findByIdAndUpdate({_id:id},{
            group_name,total_group_amount,members
        },{
            new:true
        });
    
        const response = await groupupdate.save();
        // console.log(ans);
        res.status(200).json(response);
    }catch(error){
      res.status(401).json(error);
    }
}

//get groups by id
exports.groupdetails=async(req,res) => {
    const {id} = req.params;
    try{
       const groupdata=await newGroup.findOne({_id:id});
       console.log(groupdata);
       res.json(groupdata);
   }catch(error){
     console.log("catch block error",error);
     res.status(401).json(error);
   }
   }