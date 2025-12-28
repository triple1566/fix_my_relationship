import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080", // your Go API gateway
  withCredentials: true,            // if you use cookies / auth
});