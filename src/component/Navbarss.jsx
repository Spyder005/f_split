import React from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
const Navbarss = () => {
    let navigate =useNavigate();
    const token = localStorage.getItem('userdatatoken')
    return (
        <div>
           
          <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark text-light"> 
           
        
       
        <div className="collapse navbar-collapse text-light" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2 ">
                
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            
            {(token)?
              <>

              
              <li className="nav-item mx-2">
  
                <Link className="nav-link active" aria-current="page" to="/addgroup">Add Groups</Link>
              </li>
              <li className="nav-item mx-2"> 
                <Link className="nav-link active" aria-current="page" to="/friends">Friends</Link>
              </li>
              <li className="nav-item mx-2"> 
                <button className="nav-item mt-2" onClick={()=>{localStorage.removeItem('userdatatoken');localStorage.removeItem('user_email','user_id');navigate('/login')}}> Log out</button>
                
              </li>
              
              </>
              
              : <>
              <li className="nav-item mx-2">
                <Button variant="primary" className='d-flex flex-end mt-3' onClick={()=>{navigate('/login')}}>
                {/* <Link className="nav-link active" aria-current="page" to="/login">Login </Link> */}
                Login
               </Button>
            </li>
            <li className="nav-item mx-2">
            <Button variant="primary" className='d-flex flex-end mt-3'onClick={()=>{navigate('/signup')}}>
             {/* <Link className="nav-link active" aria-current="page" to="/signup">Signup </Link> */}
                 Signup
              </Button>
            </li>
              </>

            }
           
           
          
    
          
{/*     
            {() ? <li className="nav-item mx-2">
              <Link className="nav-link active" aria-current="page" to="/admin">Admin Page</Link>
            </li> :<div></div>
    
            } */}
             {/* {(authToken) ? <li className="nav-item mx-2">
                 <Link className="nav-link active" aria-current="page" to="/addcategory">Add Category</Link>
              
            </li> :<div></div>
    
            } */}
           
          </ul>
          </div>
            {/* <div className=' float-right'  >
              {(!authToken) ?<button type="button" className="btn btn-success "> <Link className="nav-link active text-light" aria-current="page" to="/login">Admin Login</Link></button>
                        : 
                        <button className=" text-light btn btn-success" aria-current="page" onClick={()=>{localStorage.removeItem('authToken')}}><Link className="nav-link active text-light" aria-current="page" to="/">Admin Logout</Link></button>
                        
              
            }
    </div> */}
         </nav>
            
          </nav>
        </div>
      )
}

export default Navbarss
