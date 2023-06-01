import axios from "axios";

export default axios.create({
    
    baseURL: "http://localhost:4000/"
    // baseURL: "http://192.168.0.32:4000/"
    //baseURL: "https://reserve-it.herokuapp.com/"
})
