import React, { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import employeeService from "./tool/EmployeeService";
import "./tool/CSVUpload.css";

const Upload = () => {
    document.title = 'CSV Uploader'; 
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState();
    const [percent, setPercent] = useState(0);
    const [downloadUri, setDownloadUri] = useState();
    const [employees, setEmployees] = useState([]);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles[0].type === "text/csv") {
            setFile(acceptedFiles[0]);
            setSuccess(false);
            setPercent(0);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop,
    });

    const uploadFile = async () => {
        try {
            setSuccess(false);
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            const API_URL = "http://129.151.221.35:8888/files";
            const response = await axios.put(API_URL, formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setPercent(percentCompleted);
                },
            });
            setDownloadUri(response.data.filedownloadUri);
            setSuccess(true);
            setLoading(false);
            init();
        } catch (err) {
            alert(err.message);
        }
    };

    const init = () => {
        employeeService.getAll()
            .then(response => setEmployees(response.data))
            .catch(error => console.error('Something went wrong', error));
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="upload-container">
            <h2>CSV File Uploader</h2>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {file ? <p>{file.name}</p> : <p>Drop or select a CSV file</p>}
            </div>

            {file && (
                <div className="upload-actions">
                    <button onClick={uploadFile} className="upload-button">
                        {success ? "✅ Uploaded!" : "📤 Upload File"}
                    </button>
                    {loading && <p>Uploading... {percent}%</p>}
                </div>
            )}

            <div className="employee-table">
                <h3>Employee List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Upload;
