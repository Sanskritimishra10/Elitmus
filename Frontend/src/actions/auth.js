import axios from "axios";

const API = "http://localhost:3001/register";
const API2 = "https://elitmusbackend-6bsu.onrender.com";

export const register = async (data) => {
  try {
    const res = await axios.post(`${API2}/register`, data);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message: "Registration Successful",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message: error?.response?.data?.error || "Something went wrong",
    };
  }
};

export const login = async (data) => {
  
  try {
    const res = await axios.post(`${API2}/signin`, data);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message: res.status===200?"Login Successful":res?.error,
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message: "Invalid Credentials",
    };
  }
}
