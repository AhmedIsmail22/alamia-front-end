import axios from "axios";

export default axios.create({
    baseURL: "http://localhost/alamia/API/public/api/",
    withCredentials: true,
});