import axios from "axios";

export default axios.create({
    baseURL: 'http://129.151.221.35:8888/api/v1/employee',
    headers: {
        'Content-Type': 'application/json'
    }
});