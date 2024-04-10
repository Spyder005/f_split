import React,{useState} from 'react'
import Card from "react-bootstrap/Card" 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from "react-toastify"
import{useNavigate} from 'react-router-dom'
import './button.css'

const Group = () => {
     const navigate=useNavigate()
    const [inputdata, setInputData] = useState({
        group_name:"",total_group_amount:""
  });
const [members, setMembers] = useState([{ email: '', members_amount: 0 }]);
const handleMemberChange = (index, key, value) => {
  const updatedMembers = [...members];
  updatedMembers[index][key] = value;
  setMembers(updatedMembers);
};
const addMember = () => {
  setMembers([...members, { email: '', members_amount: 0 }]);
};

  //setinput value
  const setInputValue=(e)=>{
    const {name,value} =e.target;
    setInputData({...inputdata,[name]:value})
  }

  const formembers= (e)=>{
   
    const enteredValue = e.target.value; 
    // Get the entered value
   
    const enteredEmails = enteredValue.split(','); // Split input by commas

    // Update state with the new array of email addresses
    setInputData({...inputdata,members:enteredEmails})
    
  }




  //on submit
  const submitUserData = async(e) => {
    e.preventDefault();

    const {group_name, total_group_amount} = inputdata;

    if (group_name === "") {
      toast.error("group_name is Required !")
    }  else if (members === "") {
        toast.error("members is Required !")
    } else if (total_group_amount === "") {
      toast.error("Description  is Required !")
    } 
  
    
//      else {
//       // console.log('sucessfully');
     
//     //   const data = new FormData(); //logic to enter ttake thee data for backend
//     //   data.append("group_name",group_name)
//     //   data.append("total_group_amount",total_group_amount)
//     //   data.append("members",members)
     
      
     
      const response =await fetch("http://localhost:4500/api/creategroup/660f0aba2e85078af39d4696",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({group_name:inputdata.group_name, total_group_amount:inputdata.total_group_amount, members:members})
      })
       console.log(response)
      if(response.status === 200){  //this is for if any filed is empty and reload the page all filed should be empty
        navigate("/");
      }else{
        toast.error("Error!")
      }

     
  


   


     } ;
     return (
       
        <div className="container m-5">
          <h2 className="text-center m-6">Add Group</h2>
          <Card className="shadow mt-3 p-3 ">
            <Form>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Group name</Form.Label>
                  <Form.Control
                    type="text"
                    name="group_name"
                    value={inputdata.group_name}
                    onChange={setInputValue}
                    placeholder="Enter Group Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Group Amount </Form.Label>
                  <Form.Control
                    type="text"
                    name="total_group_amount"
                    value={inputdata.total_group_amount}
                    onChange={setInputValue}
                    placeholder="Total Group Amount"
                  />
                </Form.Group>


 <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail"> <Form.Label>Add Group members</Form.Label></Form.Group>
{members.map((member, index) => (
    <div className='d-flex flex-row' key={index}>
        <Form.Label>member email</Form.Label>
        <Form.Control
            type="email"
            value={member.email}
            onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
            placeholder="Enter emai"
            required
        />
        <br />
        <label>Members Amount:</label>
        <input
            type="number"
            value={member.members_amount}
            onChange={(e) => handleMemberChange(index, 'members_amount', e.target.value)}
            required
        />
        <br />
    </div>
))}

<Button type="button" className="btn  btn-fit-content" onClick={addMember}>Add Member</Button>
<br /> 


                {/* <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Add Members Email</Form.Label>
                <Form.Control
    type="text"
    name="members"
    value={inputdata.members} // inputdata.members is an array
    onChange={(e) => formembers(e)}
    placeholder="Add Members Email (comma-separated)"
/>
                </Form.Group> */}
                
                
    
               
             
                  
                <Button variant="primary" type="submit" onClick={submitUserData}>
                  Submit
                </Button>
              </Row>
            </Form>
          </Card>
          
        </div>
         // }
       );
}

 export default Group

// import React, { useState } from 'react';
// // import axios from 'axios'; // Import Axios for making HTTP requests

// const Group = () => {
//     const [groupName, setGroupName] = useState('');
//     const [members, setMembers] = useState([{ email: '', members_amount: 0 }]);
//     const [totalGroupAmount, setTotalGroupAmount] = useState(0);

//     const handleMemberChange = (index, key, value) => {
//         const updatedMembers = [...members];
//         updatedMembers[index][key] = value;
//         setMembers(updatedMembers);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const newGroupData = {
//             group_name: groupName,
//             members: members,
//             total_group_amount: totalGroupAmount
//         };

//         try {
//             const response = await fetch("http://localhost:4500/api/creategroup",{
//                        method: 'POST',
//                        headers: {'Content-Type': 'application/json'},
//                        body: JSON.stringify({group_name:groupName, total_group_amount:totalGroupAmount, members:members})
//                     })
//             console.log('New group added:', response.data);
//             // Handle success (e.g., show success message, redirect, etc.)
//         } catch (error) {
//             console.error('Error adding new group:', error);
//             // Handle error (e.g., show error message)
//         }
//     };

//     const addMember = () => {
//         setMembers([...members, { email: '', members_amount: 0 }]);
//     };

//     return (
//         <div>
//             <h2>Add New Group</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Group Name:</label>
//                 <input
//                     type="text"
//                     value={groupName}
//                     onChange={(e) => setGroupName(e.target.value)}
//                     required
//                 />
//                 <br />

//                 <label>Total Group Amount:</label>
//                 <input
//                     type="number"
//                     value={totalGroupAmount}
//                     onChange={(e) => setTotalGroupAmount(e.target.value)}
//                     required
//                 />
//                 <br />

//                 <h3>Members:</h3>
//                 {members.map((member, index) => (
//                     <div key={index}>
//                         <label>Email:</label>
//                         <input
//                             type="email"
//                             value={member.email}
//                             onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
//                             required
//                         />
//                         <br />
//                         <label>Members Amount:</label>
//                         <input
//                             type="number"
//                             value={member.members_amount}
//                             onChange={(e) => handleMemberChange(index, 'members_amount', e.target.value)}
//                             required
//                         />
//                         <br />
//                     </div>
//                 ))}
//                 <button type="button" onClick={addMember}>Add Member</button>
//                 <br />

//                 <button type="submit">Save Group</button>
//             </form>
//         </div>
//     );
// };

// export default Group