
import './App.css';
import Navbar from './Components/Navbar';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PolicyFeatch from './Components/PolicyFeatch';
import Dashboard from './Components/Dashboard';
import RegistrationForm from './Components/Registration';
import AddPolicy from './Components/Add_policy';



function App() {
  return (
    <>
    
    <Router>
    <Navbar />
    <Routes>

      
      <Route path="/" element={<Dashboard />} />
      <Route path="/PolicyFeatch" element={<PolicyFeatch />} />
      <Route path="/Add_policy" element={<AddPolicy />} />
      <Route path="/Registration" element={<RegistrationForm/>}/>
      </Routes>
    </Router> 
    
    </> 
  );
}

export default App;
