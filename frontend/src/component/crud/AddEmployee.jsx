import React, { useState } from 'react'
import axios from 'axios';
import './addEmployee.css';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

    const [emp,setEmp] = useState({
        name: "",
        surname: "",
        gender: "",
        department: "",
        designation: "",
        salary: "",
        age: "",
        contact: "",
        address:""
    });
    const handleClick = async e =>{
        e.preventDefault();
        try {
          let res= await axios.post("http://localhost:9026/api/books-i/addEmployee",emp) 
          console.log(res.data.status);
           navigate("/")
        } catch (error) {
          console.log(error);  
        }
    }
    const navigate =useNavigate()
    const handleChange = (e) =>{
        setEmp((prev)=>({...prev, [e.target.name] : e.target.value}))
    }
    return (
        <div className='AddEmployee'>
            <div className="Empform">
                <div className="EmpFormInput">
                    <div className='EmpDet'>
                        <label htmlFor="Employee Name">Employee Name </label>
                        <input type="text" placeholder='Employee Name' onChange={handleChange} name='name' value={emp.name} />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Surname">Employee Surname </label>
                        <input type="text" placeholder=' Employee Surname' onChange={handleChange} name='surname' />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Gender">Employee Gender </label>
                        <input type="text" placeholder='Gender' onChange={handleChange} name='gender' />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Department">Employee Department </label>
                        <input type="text" placeholder='Department' onChange={handleChange} name='department' />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Designation">Employee Designation </label>
                        <input type="text" placeholder='Designation' onChange={handleChange} name='designation'/>
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Salary">Employee Salary</label>
                        <input type="text" placeholder='Salary' onChange={handleChange} name='salary' />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Age">Employee Age </label>
                        <input type="text" placeholder='Age' onChange={handleChange} name='age' />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Contact">Employee Contact </label>
                        <input type="text" placeholder='Contact' onChange={handleChange} name='contact' />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Address">Employee Address</label>
                        <input type="text" placeholder='Address' onChange={handleChange} name='address'/>
                    </div>
                </div>
                <div className="button">
                    <button onClick={handleClick}>Add Employee</button>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee
