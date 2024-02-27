import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

const Employee = () => {
  const [emp, setEmp] = useState([]);
  const [filteredEmpData, setFilteredEmpData] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  useEffect(() => {
    let fetchAllEmpData = async () => {
      try {
        let res = await axios.get("http://localhost:9026/api/books-i/getEmpDetails");
        console.log(res.data);
        setEmp(res.data.result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllEmpData()
  }, [])

  useEffect(() => {
    // Implement your filter logic here
    const filtered = emp.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase()) || item.surname.toLowerCase().includes(filterValue.toLowerCase()));
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
  return (
    <div>
      <h1>Employee List</h1>
      <label>Search Employee</label>
      <input type="text" placeholder='Search by Name' value={filterValue} onChange={handleFilterChange} />
      <button onClick={downloadData} disabled={emp.length === 0}>Download Data</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>surname</th>
            <th>gender</th>
            <th>department</th>
            <th>designation</th>
            <th>salary</th>
            <th>age</th>
            <th>contact</th>
            <th>address</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      <button><Link to ="/add">Add New Employee</Link></button>
    </div>
  )
}

export default Employee
