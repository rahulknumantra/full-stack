import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployee from './component/crud/AddEmployee';
import Employee from './component/crud/Employee';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Employee />} />
          <Route path="/add" element={<AddEmployee />} />
          {/* <Route path="/update" element={<Update />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
