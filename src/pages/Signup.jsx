import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authAxiosInstance from "../api/authAxiosInstance";
import { getCookie } from "../Utils/cookieUtils";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    department: "",
    region: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const departments = [
    "Department 1",
    "Department 2",
    "Department 3",
    // Add more department options here
  ];

  const regions = [
    "Region 1",
    "Region 2",
    "Region 3",
    // Add more region options here
  ];

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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Password validation checks
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (!hasSpecialCharacter(formData.password)) {
      alert("Password must contain at least one special character.");
      return;
    }

    if (!hasUpperCase(formData.password)) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    if (!hasLowerCase(formData.password)) {
      alert("Password must contain at least one lowercase letter.");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Invalid email address.");
      return;
    }

    if (!validatePhoneNumber(formData.contactNumber)) {
      alert("Invalid phone number.");
      return;
    }

    // You can proceed with form submission here
    console.log("Form data:", formData);

    try {
      // Make the signup API request
      const response = await authAxiosInstance.post("/users/signup", formData);

      // Handle success response (You can add your success handling logic here)
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      // Handle error response (You can add your error handling logic here)
      console.error("Signup error:", error);
    }
  };

  const hasSpecialCharacter = (password) => {
    const specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    return specialCharacterPattern.test(password);
  };

  const hasUpperCase = (password) => {
    const upperCasePattern = /[A-Z]/;
    return upperCasePattern.test(password);
  };

  const hasLowerCase = (password) => {
    const lowerCasePattern = /[a-z]/;
    return lowerCasePattern.test(password);
  };

  const validateEmail = (email) => {
    // Use a regular expression for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Use a regular expression for basic phone number validation
    const phonePattern = /^\d{10}$/; // Assumes a 10-digit phone number
    return phonePattern.test(phoneNumber);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-800 py-20">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              id="contactNumber"
              name="contactNumber"
              type="text"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <select
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="region"
            >
              Region
            </label>
            <select
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            >
              <option value="">Select Region</option>
              {regions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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

            <div className="text-xs text-gray-600">
              Password must be at least 8 characters long and contain at least
              one special character, one uppercase letter, and one lowercase
              letter.
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center">
            <button
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              type="submit"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
