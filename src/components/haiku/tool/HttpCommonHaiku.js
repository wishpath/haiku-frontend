import axios from "axios";

const backendUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/"       // local dev
    : window.location.protocol === "http:"
        ? "http://129.151.221.35:8080" // any http
        : "/api"; // targetting for https://www.aruna.lt

// const backendUrl =
// window.location.hostname === "localhost"
// ? "http://localhost:8080"       // local dev
// : "/api"; // targetting for https://www.aruna.lt


export default axios.create({
    baseURL: backendUrl,
    // allow browser to send/receive cookies
    // because this is a cross-origin request in case of localhost (port 3000 to port 8080)
    withCredentials: true, 
    headers: {
        'Content-Type': 'application/json'
    }
});