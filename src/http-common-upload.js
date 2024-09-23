import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:8888/files',
    headers: {
        'Content-Type': 'application/json'
    }
});