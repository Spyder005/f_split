import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './min.css'
import {toast,ToastContainer} from "react-toastify"
import {Link,NavLink} from 'react-router-dom'
import Home from './Home'

const Login = () => {
    const [passShow, setPassShow] = useState(false); //for password hide and show
  const navigate = useNavigate();

  const [inputvalue, setInputValue] = useState({
    email: "",
    password: "",
   
  });

  //set the input fileds
  const setVal = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputvalue, [name]: value });
  };
 
  //on submit
  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inputvalue;

    if (email === "") {
      toast.error("email is required!");
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!");
    } else if (password === "") {
      toast.error("password is required!");
    } else if (password.length < 6) {
      toast.error("password must be 6 char!");
    } else {
     
      const response =await fetch("http://localhost:4500/api/loginuser",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:email,password:password})
      })

      
      if (response.status === 200) {//this is for if any filed is empty and reload the page all filed should be empty
        const responseData = await response.json(); // Parse response body as JSON
        const token = responseData.result.token; // Access token property from response data
        
        // console.log("Token:", token); //
        console.log(JSON.stringify(responseData.result.userValid))
        // console.log(JSON.stringify(responseData.result.data?._id))
        localStorage.setItem("userdatatoken",JSON.stringify(token));
         localStorage.setItem("user_id", responseData.result.userValid._id)
         localStorage.setItem("user_email", JSON.stringify(responseData.result.userValid.email))
         window.globaluser_id = responseData.result.userValid._id
         window.globaluser_email=responseData.result.userValid.email
         console.log(window.globaluser_id,window.globaluser_email)
        console.log("token seted")
        toast.success("Login Sucessfully !");
       
        navigate("/");
        setInputValue({
          ...inputvalue,
          email: "",
          password: "",
        });
      } else {
        toast.error("Enter correct Credentials !");
      }

    }}



  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad are back. Please Login.</p>
          </div>

          <form>
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
                  type={!passShow ? "password" : "text"} //flase == password ,true == text
                  name="password"
                  id="password"
                  value={inputvalue.password}
                  onChange={setVal}
                  placeholder="Enter your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginuser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to="/signup">Sign Up</NavLink>
            </p>
            <p>
              <NavLink to="/password-reset">Forgot Password</NavLink>
            </p>
          </form>
          <ToastContainer position="top-center" />
        </div>
      </section>
    </>
  );
}

export default Login
