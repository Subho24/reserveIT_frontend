import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:4000/"
    // baseURL: "http://192.168.0.39:4000/"
    // baseURL: "https://reserveit.onrender.com/"
    baseURL: "https://reserve-it.herokuapp.com/"
})
