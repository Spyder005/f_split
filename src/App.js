import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route ,Routes } from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Group from './pages/Group';
import Navbarss from './component/Navbarss';
import Friend from './pages/Friend';
import Addmoney from './pages/Addmoney';
import GroupPage from './pages/GroupPage';

function App() {
  return (
    <>
    <Router>
      <div>

    <Navbarss /> {/* Render Navbar component */}
      <Routes >
      <Route path="/" element={<Home />} />
        <Route  path="/login" element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/addgroup' element={<Group/>}/>
        <Route path='/friends' element={<Friend/>}/>
        <Route path='/addmoney' element={<Addmoney/>}/>
        <Route path='/grouppage' element={<GroupPage/>}/>
        
      </Routes>
    
      </div>
    </Router>
            
       
    </>
  );
}

export default App;
