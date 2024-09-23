import React, { useEffect, useState } from "react";
import {
    CssBaseline,
    Toolbar,
    Container,
    Paper,
    Grid,
    Typography,
    CircularProgress,
    Fab,
    LinearProgress
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';
import CloudUpload from '@mui/icons-material/CloudUpload';
import employeeService from "../services/employee.service";

const DropZoneContainer = styled(Paper)(({ theme }) => ({
    height: 300,
    background: "#efefef",
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
    borderStyle: "dashed",
    borderColor: "#aaa",
}));

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
        <>
            <CssBaseline />
            <Toolbar />

            <Container maxWidth="md">
                <DropZoneContainer {...getRootProps()} elevation={0}>
                    <input {...getInputProps()} />
                    {file ? <p>{file.name}</p> : <p>Drop or select a CSV file</p>}
                </DropZoneContainer>

                {file && (
                    <Grid container spacing={2} style={{ marginTop: 12 }}>
                        <Grid item xs={12}>
                            <Fab aria-label="save" color="primary" onClick={uploadFile}>
                                {success ? <CheckIcon /> : <CloudUpload />}
                            </Fab>
                            {loading && <CircularProgress size={68} style={{ position: "absolute" }} />}
                        </Grid>

                        <Grid item xs={12}>
                            {loading && (
                                <>
                                    <LinearProgress variant="determinate" value={percent} style={{ width: 200 }} />
                                    <Typography variant="body1">{percent}%</Typography>
                                </>
                            )}
                            {success && <Typography variant="body1">The file is successfully uploaded!</Typography>}
                            {success && (
                                <Typography variant="body1">
                                    <a href={downloadUri} target="_blank" rel="noopener noreferrer">File URL</a>
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                )}
            </Container>

            <Container maxWidth="md" style={{ marginTop: 20 }}>
                <Paper elevation={4}>
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
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
                </Paper>
            </Container>
        </>
    );
};

export default Upload;
