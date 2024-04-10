import React,{useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card"
import {  useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import './min.css'
import GroupTable from '../component/Table';
const Home = () => {
    const navigate =useNavigate();
    const token= localStorage.getItem('userdatatoken');
    // console.log(token)


    const [getData,setGetData] =useState()
  //  console.log(window.globaluser_id,window.globaluser_email)
    const _id =localStorage.getItem('user_id');
    console.log(_id)

    //for getting groups of particular user
    const groupsGet = async () => {
  
        const response = await fetch(`http://localhost:4500/api/getuser/${_id}`,{
          method: 'GET'
        })
  
       
        if(response.status===200){
          const userdat = await response.json();
          console.log("hoem page")
          console.log(userdat)
          setGetData(userdat);
         
        }
        else{
          toast.error("error for get news data");
        }
     
             
            }
    
      
     useEffect(()=>{
        
      groupsGet()
     

     },[]);

  return (
    <>
    <section>
        <div className='form_data'>
           
        


 {(!token) ? 
<Card className="text-center text-center m-5 bg-dark text-light d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
<Card.Header>Restricted page</Card.Header>
<Card.Body  >
<div className='container   bg-dark text-light'  style={{ minHeight: '50vh' }}>
<h1 className='justify-content-center ' >If you are user plz login</h1>


<hr/>

<button className='btn btn-primary mx-auto d-block' onClick={()=>{navigate('/login')}}>Login</button> </div>
</Card.Body>
</Card>


: 
 <div className="container">
    <div className='d-flex flex-left flex-row gap-6'>
          <h1>{getData?.name}:</h1>
          <h1>usData.total_amount</h1>
         </div>
      
         <div>
         <Button variant="primary" className='d-flex flex-end mt-3' onClick={()=>{navigate('/addgroup')}}>Add Group</Button>{' '}
         </div>
         <hr />
           
          
              
        

           
         <GroupTable getData={getData} deleteGroup={"sdsfs"} />
{/* <TablesNew
 userdata={userdata}
 deleteUser={deleteUser}
 userGet={userGet}
/> */}


</div>

}




      
        </div>
    </section>
    </>
  )
}

export default Home
