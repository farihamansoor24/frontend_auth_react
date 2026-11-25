import axios from "axios";
import { getToken } from "../utils/authHelper";

// const API_URL = "http://localhost:5000/api"; // Replace with your backend API URL
export const fetchUserFromServer=async()=>{
    const token = getToken();
    if(!token) {
        return Promise.reject(new Error("No token found"));
    }
    const res= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data.user ?? res.data;
}