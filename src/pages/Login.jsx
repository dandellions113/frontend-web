import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authAxiosInstance from "../api/authAxiosInstance";
import { getCookie, setCookie } from "../Utils/cookieUtils";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = getCookie("jwtToken");
    if (jwtToken) {
      // Redirect to the desired page
      navigate("/news");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!validateEmail(formData.email)) {
      alert("Invalid email address.");
      return;
    }

    try {
      // Make the login API request
      const response = await authAxiosInstance.post("/users/signin", formData);

      // Handle success response
      console.log("Login successful:", response.data);

      // Redirect to the /news route on successful login
      const jwtToken = response.data.token;
      setCookie("jwtToken", jwtToken);
      console.log(jwtToken);
      navigate("/news");
    } catch (error) {
      // Handle error response (You can add your error handling logic here)
      console.error("Login error:", error);
    }
  };

  const validateEmail = (email) => {
    // Use a regular expression for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-800">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="usernameOrEmail"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              id="usernameOrEmail"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center">
            <button
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              type="submit"
            >
              Log In
            </button>
            <p className="mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
