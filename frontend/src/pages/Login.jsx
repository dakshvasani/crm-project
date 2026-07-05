import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/api/token/", {
      username: username,
      password: password,
    });

  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
    
  console.log("Going to dashboard...");
  navigate("/dashboard");

  } catch (error) {
    if (error.response) {
        console.log(error.response.data);
    } else {
        console.log(error.message);
    }
}
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Sign in to your CRM account
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            Sign In
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;