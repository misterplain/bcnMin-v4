import axios from "axios";

export default axios.create({
  // baseURL: "https://activeserver.onrender.com/bcnmin",
  baseURL: "http://localhost:5000/bcnmin",
});

