
import React,{useState,useEffect} from "react";
import "./Table.css";
import Form from 'react-bootstrap/Form';

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import GroupPage from "../pages/GroupPage";


const groupPage =(_id,group_name,total_group_amount,members)=>{
  console.log(_id,group_name,total_group_amount,members);
  
  //  <GroupPage group_id={_id} group_name={group_name} total_group_amount={total_group_amount} members={members}  />
  
 
 }

const GroupTable = ({getData,deleteGroup}) => {
  const navigate = useNavigate()
  console.log("group_tablre")
    console.log(getData)
    const [inputdata, setInputData] = useState({
      group_name:"",total_group_amount:""
});
const [member, setMember] = useState([{ email: '', members_amount: 0 }]);
 //setinput value
 const setInputValue=(e)=>{
  const {name,value} =e.target;
  setInputData({...inputdata,[name]:value})
}

     
  const  onAddExpense = async({group_name,old_group_amount,members,id})=>{
        try{
          // const {id} = req.params;
          // const {group_name,total_group_amount,members} =req.body
          console.log(getData.groups)
           console.log( members)

            // Function to extract name from email address
const extractNameFromEmail = (email) => {
  const atIndex = email.indexOf('@');
  if (atIndex !== -1) {
      return email.slice(0, atIndex); // Extract characters before the '@' symbol
  }
  return email; // Return full email if '@' symbol is not found (fallback)
};

// Retrieve names of members from the array of member objects
const memberNames = members.map(member => extractNameFromEmail(Object.values(member).join('')));
console.log(memberNames);

    

              members.forEach((m)=>{
                const  value ={
                        email:m.email,
                        members_amount: inputdata.total_group_amount/members.length
                 }
            setMember({...inputdata,value})
           })  

           


          setInputData({...inputdata,total_group_amount:inputdata.total_group_amount+old_group_amount})


          const response = await fetch(`http://localhost:4500/api/updategroup/${id}`,{
          method: 'GET',
          body: JSON.stringify({group_name:group_name ,total_group_amount:inputdata.total_group_amount ,members:member})
        })
          const groupdata =await response.json();
          console.log(groupdata);

        }catch(e){ console.log("catch block") ;console.log(e)}
   }

  
    return (
        <>
          <div className="container m-3">
            <h1 className="text-center">ALL Groups</h1>
            <Row>
              <div className="col m-3">
                <Card className="shadow">
                  <Table className="align-items-center" responsive="sm">
                    <thead className="thead-dark">
                      <tr className="table-dark">
                        <th>ID</th>
                        <th>Group name</th>
                        {/* <th></th> */}
                        <th>Amount</th>
                        <th>Add Expense</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
             
                      {getData?.groups && getData?.groups.length > 0 ?  (
                        getData.groups.map((index,i) => {
                          return (
                            <>
                              <tr key={index._id}>
                                <td>{i+1}</td>
                               
                                <td className="bg-gray" onClick={() =>{ console.log("click"); <div>   <GroupPage group_id={index._id} group_name={index.group_name} total_group_amount={index.total_group_amount} members={index.members}  />;</div> }}>
    <span style={{ cursor: 'pointer' }}>{index.group_name}</span>
</td>
                                
                                  <td>{index.total_group_amount}</td>
                                  <td> <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                
                  <Form.Control
                    type="number"
                    key={index.id}
                    name="total_group_amount"
                    value={inputdata.total_group_amount}
                     onChange={(e)=>{const {name,value} =e.target;
                     setInputData({...inputdata,[name]:value})}}
                    placeholder="EnterFriends name "
                  />
                 
                </Form.Group></td>
                <td>
                <button onClick={() => onAddExpense(index.group_name, index.total_group_amount, index.members, index.id)}>
                    Add
                </button>
            </td>
                               
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <span className="no_data text-center">NO Groups present </span>
                      )}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
            <ToastContainer />
          </div>
        </>
      );
}

export default GroupTable
