import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", formData); 
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      setFormData({ email: "", password: "" });
      navigate("/Feedback");
    } catch (error) {
      console.error("Login error:", error); 
      alert("Login failed: " + error.response?.data?.message || error.message);
    }
  };
  
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
