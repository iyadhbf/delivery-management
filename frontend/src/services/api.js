import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const login = (data) => API.post("/api/users/login", data);
export const register = (data) => API.post("/api/users/register", data);
