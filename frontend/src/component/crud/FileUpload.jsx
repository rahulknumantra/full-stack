import React, { useState } from 'react'
import axios from 'axios';
import './addEmployee.css';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate()

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    };

    const handleUpload = async e => {
        try {
            const formData = new FormData();
            formData.append('csvFile', file);
            console.log("formdata==>",formData);
            let response = await axios.post("http://localhost:9026/api/books-i/addEmployeeExcel", formData)
            console.log(response);
            if (response.status===201) {
                console.log('CSV data uploaded successfully');
                alert(response.data.status);
                document.getElementById("myFile").value = "";
                setFile(null)
              } else {
                console.error('Error uploading CSV data:', response.statusText);
                alert(response.data.message);
              }
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='fileUpload'>
            <input className='fileUpload_input' type="file" onChange={handleFileChange} accept=".csv" id="myFile" />
            <button onClick={handleUpload} disabled= {!file} className='fileUpload_button'>Upload CSV</button>
        </div>

    )
}

export default FileUpload
