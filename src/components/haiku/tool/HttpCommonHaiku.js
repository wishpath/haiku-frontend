import axios from "axios";

const backendUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"       // local dev
    //: "http://129.151.221.35:8080"; // server deployment (the problem with this is that when site is https, it requires https backend)
    : "/api"; //nginx config will redirect this to backend, which is in relation to nginx — "http://localhost:8080". Solves HTTPS mixed-content

export default axios.create({
    baseURL: backendUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});