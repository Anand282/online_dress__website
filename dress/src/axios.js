// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://online-dress-website.onrender.com",
  withCredentials: true, // optional
});

export default instance;
