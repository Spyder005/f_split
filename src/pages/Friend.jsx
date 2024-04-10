import React,{useState,useEffect} from 'react'
import {  useNavigate,NavLink, Link } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import './button.css'

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Addmoney from './Addmoney';



const Friend = () => {
    const navigate =useNavigate()
    const [getData,setGetData] =useState()
    const id ="660f0aba2e85078af39d4696"
    
    const userGet = async () => {
        const response =await fetch(`http://localhost:4500/api/getuser/${id}`,{
            method: 'GET',
          
          })
        if (response.status === 200) {
          const userdat = await response.json();
          console.log(userdat)
          setGetData(userdat);
          
        } else {
          toast.error("error for get news data");
        } 
      };
    const  settleexpense= async ( email,members_amount)=>{
        try{

            const response = await fetch("http://localhost:4500/api/updateuserfriend", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ owe_members_email: email, members_amount: Number(0), email: "m@ngmai.com" })
            });   
            const data = await response.json();
            console.log(data); // Log the response data if the request succeeds
            navigate('/friends')
            if (response.status!==200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

        }catch(err){console.log(err)}
       
                        
        
      }
      useEffect(()=>{
        
        userGet()
       
  
       },[]);

  return (
  
    // <section>
    // <h1 className='mt-10'>getData.name</h1>
    // </section>
    <div className="container m-5">
            
            <Row>
              <div className="col m-3">
                <Card className="shadow">
                <div className='d-flex flex-row justify-content-between m-3' > 
                <h1 className="text-center ">Friends</h1>
                
            <button className='button-custom btn-group-sm ' onClick={()=>{navigate('/addmoney')}}>Add Expense</button>
                </div>
                  <Table className="align-items-center " responsive="sm">
                    <thead className="thead-dark">
                      <tr className="table-dark">
                        <th>ID</th>
                        <th>Friend Name</th>
                        <th>Amount</th>
                        {/* <th></th>
                        <th></th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
             
                      {getData?.owe_members && getData?.owe_members.length > 0 ?  (
                        getData.owe_members.map((index,i) => {
                          return (
                            <>
                              <tr key={index._id}>
                                <td>{i+1}</td>
                               
                                <td>{index.email}</td>
                                <td>{index.members_amount}</td>
                              
                                <td>
                                 
                                      <i className="fa-solid fa-ellipsis-vertical"></i>
                                      <button
                                          
                                          className="text-decoration-white bg-red"
                                          onClick={() =>{ settleexpense(index.email,index.members_amount)}}
                                        >
                                            <span className='text-dark'>Settle</span>
                                         
                                        </button>
                                 
                                      
                                  
                                     
                                </td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <span className="no_data text-center">NO Friends present </span>
                      )}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
            <ToastContainer />
          </div>
      
   
  )
}

export default Friend
