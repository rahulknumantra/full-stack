import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './addEmployee.css';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {

    const navigate =useNavigate()
    const location = useLocation()
    const employeeId= location.pathname.split('/')[2];
    
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
    useEffect(() => {
        let fetchAllEmpData = async () => {
          try {
            let res = await axios.get("http://localhost:9026/api/books-i/getEmpById/"+employeeId);
            const result =res.data.result[0];
            setEmp(result);
          } catch (error) {
            console.log(error);
          }
        }
        fetchAllEmpData()
      }, [employeeId])
    const handleClick = async e =>{
        e.preventDefault();
        try {
        let updateEmpRes = await axios.put("http://localhost:9026/api/books-i/updateEmployee/"+employeeId,emp) 
         console.log(">>>>",updateEmpRes.data.status)
           navigate("/")
        } catch (error) {
          console.log(error);  
        }
    }
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
                        <input type="text" placeholder=' Employee Surname' onChange={handleChange} name='surname' value={emp.surname} />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Gender">Employee Gender </label>
                        <input type="text" placeholder='Gender' onChange={handleChange} name='gender' value={emp.gender} />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Department">Employee Department </label>
                        <input type="text" placeholder='Department' onChange={handleChange} name='department' value={emp.department} />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Designation">Employee Designation </label>
                        <input type="text" placeholder='Designation' onChange={handleChange} name='designation' value={emp.designation}/>
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Salary">Employee Salary</label>
                        <input type="text" placeholder='Salary' onChange={handleChange} name='salary' value={emp.salary} />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Age">Employee Age </label>
                        <input type="text" placeholder='Age' onChange={handleChange} name='age' value={emp.age} />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Contact">Employee Contact </label>
                        <input type="text" placeholder='Contact' onChange={handleChange} name='contact' value={emp.contact} />
                    </div>
                    <div className='EmpDet'>
                        <label htmlFor="Employee Address">Employee Address</label>
                        <input type="text" placeholder='Address' onChange={handleChange} name='address' value={emp.address}/>
                    </div>
                </div>
                <div className="button">
                    <button onClick={handleClick}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateEmployee
