import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lifecycle from './component/crud/classComponent/Lifecycle';
 import AddEmployee from './component/crud/AddEmployee';
 import Employee from './component/crud/Employee';
 import UpdateEmployee from './component/crud/UpdateEmployee';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
        {/* <Route path="/" element={<Lifecycle />} /> */}
           <Route path="/" element={<Employee />} /> 
           <Route path="/add" element={<AddEmployee />} /> 
           <Route path="/update/:id" element={<UpdateEmployee />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
