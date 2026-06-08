import axios from "axios";

const backendUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"       // local dev
    : window.location.protocol === "http:"
        ? "http://129.151.221.35:8080" // any http
        : "/api"; // targetting for https://www.aruna.lt

// const backendUrl =
// window.location.hostname === "localhost"
// ? "http://localhost:8080"       // local dev
// : "/api"; // targetting for https://www.aruna.lt


export default axios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});