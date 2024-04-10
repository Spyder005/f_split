import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Link,NavLink} from 'react-router-dom'
import {ToastContainer,toast } from "react-toastify"
import './min.css'


const Signup = () => {
     
    const [passShow,setPassShow] =useState(false);  //for password hide and show 
  const [cpassShow,setCPassShow] =useState(false);

  const [inputvalue,setInputValue]=useState({
    name:"",
    email:"",
    password:"",
    cpassword:"",
    mobile:"",
  })

  const navigate =useNavigate();


  //set the input fileds 
  const setVal =(e)=>{
    const {name,value} =e.target;
    setInputValue({...inputvalue,[name]:value})
  }

   //for submit button  and validation
   const addUserdata=async(e)=>{
    e.preventDefault();
    const { name, email, password, cpassword,mobile } = inputvalue;

    if (name === "") {
        toast.warning("fname is required!");
    } else if (email === "") {
        toast.error("email is required!");
    } else if (!email.includes("@")) {
        toast.warning("includes @ in your email!");
    } else if (password === "") {
        toast.error("password is required!");
    } else if (password.length < 6) {
        toast.error("password must be 6 char!");
    } else if (cpassword === "") {
        toast.error("cpassword is required!");
    }
    else if (cpassword.length < 6) {
        toast.error("confirm password must be 6 char!");
    } else if (password !== cpassword) {
        toast.error("pass and Cpass are not matching!");
    } else {
       //  console.log("user registration succesfully done");
       toast.success("User register SucessFully!");

        
 console.log(inputvalue)

const response =await fetch("http://localhost:4500/api/signupuser",{
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({email:email,password:password,cpassword:cpassword,mobile:mobile,name:name})
})
    
console.log(response)

         if(response.status === 200){  //this is for if any filed is empty and reload the page all filed should be empty
           toast.success("User register SucessFully!");
         navigate("/login");
         setInputValue({
             ...inputvalue,
             fname:"",
             email:"",
             password:"",
             cpassword:""
    
           });
         }else{
           toast.error("Error!")
         }

    }

   
 }
    


    return (
        <>
             <section>
            <div className="form_data">
              <div className="form_heading">
                <h1>Sign UP</h1>
                <p>We hope that you will get like it.</p>
              </div>
    
              <form>
              <div className="form_input">
                  <label htmlFor="fname">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={inputvalue.name}
                    onChange={setVal}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form_input">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={inputvalue.email}
                    onChange={setVal}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="form_input">
                  <label htmlFor="password">Password</label>
                  <div className="two">
                    <input
                      type={!passShow ? "password" : "text"}   //flase == password ,true == text
                      name="password"
                      id="password"
                      value={inputvalue.password}
                      onChange={setVal}
                      placeholder="Enter your password"
                    />
                    <div className="showpass"  onClick={() => setPassShow(!passShow)}>{!passShow ? "Show" : "Hide"}</div>
                  </div>
                </div>
                <div className="form_input">
                  <label htmlFor="password">Confirm Password</label>
                  <div className="two">
                    <input
                      type={!cpassShow ? "password" : "text"}   //flase == password ,true == text
                      name="cpassword"
                      id="cpassword"
                      value={inputvalue.cpassword}
                      onChange={setVal}
                      placeholder="Confirm password"
                    />
                    <div className="showpass"  onClick={() => setCPassShow(!cpassShow)}> {!cpassShow ? "Show" : "Hide"}</div>
                  </div>
                </div>
                <button className='btn' onClick={addUserdata}>Sign Up</button>
                <p>Have an Account? <NavLink to ="/login">Login</NavLink></p>
              </form>
              <ToastContainer position="top-center" />
            </div>
          </section>
        </>
      )
}

export default Signup
