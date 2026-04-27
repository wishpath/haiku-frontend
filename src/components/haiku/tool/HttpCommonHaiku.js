import axios from "axios";

const backendUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"       // local dev
    : "http://129.151.221.35:8080"; // server deployment

export default axios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});