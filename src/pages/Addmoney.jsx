
import React,{useState} from 'react'
import Card from "react-bootstrap/Card" 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { toast } from "react-toastify"
import{useNavigate} from 'react-router-dom'

const Addmoney = () => {
    // console.log(owe_members_email)
    const navigate=useNavigate()

    const [inputdata, setInputData] = useState({
        owe_members_email:"",members_amount:""
  });
    //setinput value
    const setInputValue=(e)=>{
        const {name,value} =e.target;
        setInputData({...inputdata,[name]:value})
      }

       //on submit
  const submitUserData = async(e) => {
    e.preventDefault();
    
    const {owe_members_email, members_amount} = inputdata;
    try {
    if (owe_members_email === "") {
      toast.error("owe_members_email is Required !")
    }  else if (members_amount === "") {
        toast.error("members_amount is Required !")}
   
  

     
      
        // const tot =members_amount +members_amoun;
        console.log(inputdata.owe_members_email)
        console.log(Number(inputdata.members_amount ))
        // console.log(email)
       
        
            const response = await fetch("http://localhost:4500/api/updateuserfriend", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ owe_members_email: owe_members_email, members_amount: Number(members_amount), email: window.globaluser_email })
            });                       
           
            const data = await response.json();
            console.log(data); // Log the response data if the request succeeds
            navigate('/friends')
            if (response.status!=200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
           
        } catch (error) {
            console.error('Fetch Error:', error);
        }

     
  


   


     } ;
    return (
       
        <div className="container m-5">
          <h2 className="text-center m-6">Add Expense by m@ngmai.com</h2>
          <Card className="shadow mt-3 p-3 ">
            <Form>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Friends name</Form.Label>
                  <Form.Control
                    type="text"
                    name="owe_members_email"
                    value={inputdata.owe_members_email}
                     onChange={setInputValue}
                    placeholder="EnterFriends name "
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label> Amount </Form.Label>
                  <Form.Control
                    type="text"
                    name="members_amount"
                    value={inputdata.members_amount}
                    onChange={setInputValue}
                    placeholder="Total Group Amount"
                  />
                </Form.Group>


 {/* <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail"> <Form.Label>Add Group members</Form.Label></Form.Group>
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

<button type="button" className='p-6' onClick={addMember}>Add Member</button>
<br />  */}


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

export default Addmoney
