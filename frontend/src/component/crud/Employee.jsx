import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import './employee.css';
import FileUpload from './FileUpload';

const Employee = () => {
  const [emp, setEmp] = useState([]);
  const [filteredEmpData, setFilteredEmpData] = useState([]);
  const [filterValue, setFilterValue] = useState('');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    let fetchAllEmpData = async () => {
      try {
        let res = await axios.get(`http://localhost:9026/api/books-i/getEmpDetails?limit=${limit}&page=${page}`);
        console.log(res.data);
        setEmp(res.data.result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllEmpData()
  }, [page, limit])

  useEffect(() => {
    // Implement your filter logic here
    const filtered = emp.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase()) || item.surname.toLowerCase().includes(filterValue.toLowerCase()) || item.department.toLowerCase().includes(filterValue.toLowerCase()) || item.designation.toLowerCase().includes(filterValue.toLowerCase()));
    setFilteredEmpData(filtered);
  }, [emp, filterValue]);

  const handleFilterChange = event => {
    setFilterValue(event.target.value);
  };

  //download data 
  const downloadData = () => {
    const csvContent = emp.map((row) => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'emp.csv';
    link.click();
  };

  //handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:9026/api/books-i/deleteEmployee/" + id)
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='Employee'>
      <div className="main_ection">
        <h1>Employee List</h1>
        <div className='second_section'>
          <h2>Search Employee</h2>
          <input type="text" placeholder='Search by Name ,Surname, Designation and Department' value={filterValue} onChange={handleFilterChange} />
        </div>
        <div className='table_section'>
          <table >
            <thead>
              <tr>
                <th>EMP ID</th>
                <th>Name</th>
                <th>surname</th>
                <th>gender</th>
                <th>department</th>
                <th>designation</th>
                <th>salary</th>
                <th>age</th>
                <th>contact</th>
                <th>address</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmpData.map((e) => (
                <tr key={e.empcode}>
                  <td>{e.empcode}</td>
                  <td>{e.name}</td>
                  <td>{e.surname}</td>
                  <td>{e.gender}</td>
                  <td>{e.department}</td>
                  <td>{e.designation}</td>
                  <td>{e.salary}</td>
                  <td>{e.age}</td>
                  <td>{e.contact}</td>
                  <td>{e.address}</td>
                  <td><button className='td_Button u_button' ><Link to={`/update/${e.empcode}`}>U</Link></button></td>
                  <td><button className='td_Button x_button' onClick={() => handleDelete(e.empcode)}>X</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='limit_page_button' onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}>pre</button>
          <span>Page {page}</span>
          <button className='limit_page_button' onClick={() => setPage((prevPage) => prevPage + 1)}>Next</button>
        </div>
        <div className='button_section'>
          <button><Link to="/add">Add New Employee</Link></button>
          <button onClick={downloadData} disabled={emp.length === 0}>Download Data</button>
          <button >Download format</button>
        </div>
        <div>
          <FileUpload />
        </div>
      </div>
    </div>
  )
}

export default Employee
