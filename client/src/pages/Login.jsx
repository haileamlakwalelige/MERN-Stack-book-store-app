import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = ({setRoles}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clear previous messages
    setError("");
    setSuccess("");
  
    try {
      const response = await axios.post("http://localhost:3000/auth/login", { username, password, role });
      console.log(response);
      
      // Check if response contains success message
      if (response.data && response.data.login) {
        setSuccess("Login successful");
        // Redirect user to dashboard or handle successful login
        if(response.data.login && response.data.role === 'admin'){
          setRoles("admin");
          navigate("/dashboard");
        }else if(response.data.login && response.data.role === 'student'){
          setRoles("student");
          navigate("/");
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };
  

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-full p-10 rounded-xl mx-auto bg-slate-800"
      >
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mb-3 text-center">{success}</p>
        )}
        <p className="text-white text-[30px] text-center font-bold">
          Login Page
        </p>

        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-white dark:text-white"
          >
            Your name
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field min-w-[400px] py-2 rounded outline-none focus:outline-none active:outline-none"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field min-w-[400px] py-2 rounded outline-none focus:outline-none active:outline-none"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-white dark:text-white"
          >
            Your Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-[400px] text-start font-semibold py-3 rounded outline-none focus:outline-none active:outline-none"
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="flex justify-between items-center text-white px-4 py-3">
          <p>Don't Have an account before?</p>{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="submit-button bg-blue-500 px-6 py-2 text-gray-100 shadow-inherit mt-6"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
