import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authAxiosInstance from "../api/authAxiosInstance";
import { getCookie } from "../Utils/cookieUtils";
import toast from "react-hot-toast";
import Navbar from "../components/Header";

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
      toast.success("Registered Successfully !");
      navigate("/");
    } catch (error) {
      // Handle error response (You can add your error handling logic here)
      console.error("Signup error:", error);
      toast.error("Something went wrong", {
        duration: 4000,
        position: "top-right",
      });
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

  const backgroundImageUrl1 =
    "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80";

  return (
    <div
      className="flex justify-center items-center min-h-screen  py-20 bg-no-repeat bg-cover relative"
      style={{ backgroundImage: `url(${backgroundImageUrl1})` }}
    >
      <div className="absolute  opacity-60 inset-0 z-0 h-full"></div>
      <div className="w-full max-w-xl p-4 sm:p-7  rounded-lg z-10 bg-slate-200">
        <h1 className="my-6 text-center">
          <svg viewBox="0 0 247 31" className="w-auto h-7 sm:h-8 inline-flex">
            <path
              fill="rgba(99,102,241, .8)"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
              //fill="#06B6D4"
            ></path>
            <path
              //fill="#fff"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z"
              fill="#000"
            ></path>
          </svg>
        </h1>

        <h2 className="text-2xl font-bold  my-8 ">Create New Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 sm:mb-7">
            <label
              className="block  text-sm font-bold mb-2 "
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="w-full px-3 py-2   focus:outline-none     sm:p-4  text-gray-700 border-2 rounded"
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 sm:mb-7">
            <label className="block  text-sm font-bold mb-2 " htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full px-3 py-2    focus:outline-none text-gray-700 border-2 rounded     sm:p-4 "
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 sm:mb-7">
            <label
              className="block  text-sm font-bold mb-2 "
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              className="w-full px-3 py-2   focus:outline-none     sm:p-4 text-gray-700 border-2 rounded "
              id="contactNumber"
              name="contactNumber"
              type="text"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 sm:mb-7">
            <label
              className="block  text-sm font-bold mb-2 "
              htmlFor="department"
            >
              Department
            </label>
            <select
              className="w-full px-3 py-2 text-gray-700 border-2 rounded focus:outline-none     sm:p-4"
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
          <div className="mb-4 sm:mb-7">
            <label className="block  text-sm font-bold mb-2 " htmlFor="region">
              Region
            </label>
            <select
              className="w-full px-3 py-2 text-gray-700 border-2 rounded focus:outline-none     sm:p-4   "
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
          <div className="mb-4 sm:mb-7">
            <label
              className="block  text-sm font-bold mb-2 "
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2   focus:outline-none    sm:p-4 text-gray-700 border-2 rounded"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="text-xs text-gray-700">
              Password must be at least 8 characters long and contain at least
              one special character, one uppercase letter, and one lowercase
              letter.
            </div>
          </div>
          <div className="mb-4 sm:mb-7">
            <label
              className="block  text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2    focus:outline-none    sm:p-4 text-gray-700 border-2 rounded"
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
              className="w-full px-4 py-2   rounded    bg-indigo-500 hover:bg-indigo-600 focus:outline-none text-white"
              type="submit"
            >
              Sign Up
            </button>
          </div>

          <p className="text-center mt-4 ">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
