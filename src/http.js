import axios from "axios";

export default axios.create({
    baseURL: "https://wedding-management-server.onrender.com/api",
    headers: {
        "Content-type": "application/json"
    }
});
