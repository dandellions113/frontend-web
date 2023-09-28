import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authAxiosInstance from "../api/authAxiosInstance";
import { getCookie } from "../Utils/cookieUtils";
import toast from "react-hot-toast";

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
        { value: "defence", text: "Ministry of Defence" },
        { value: "education", text: "Ministry of Education of India" },
        { value: "finance", text: "Ministry of Finance of India" },
        {
            value: "health",
            text: "Ministry of Health and Family Welfare, Government of India",
        },
        { value: "railway", text: "Ministry of Railways of India" },
        // Add more department options here
    ];

    const regions = [
        { value: "en", text: "english" },
        { value: "hi", text: "hindi" },
        { value: "pa", text: "punjabi" },
        { value: "te", text: "telugu" },
        { value: "ta", text: "tamil" },
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
            const response = await authAxiosInstance.post(
                "/users/signup",
                formData
            );

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
                <h1 className="my-6 font-bold text-4xl font-serif text-indigo-500 text-center">
                    @fingerTips
                </h1>

                <h2 className="text-2xl font-bold  my-8 ">
                    Create New Account
                </h2>
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
                        <label
                            className="block  text-sm font-bold mb-2 "
                            htmlFor="email"
                        >
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
                            {departments.map(({ value, text }) => (
                                <option key={value} value={value}>
                                    {text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 sm:mb-7">
                        <label
                            className="block  text-sm font-bold mb-2 "
                            htmlFor="region"
                        >
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
                            {regions.map(({ value, text }) => (
                                <option key={value} value={value}>
                                    {text}
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
                            Password must be at least 8 characters long and
                            contain at least one special character, one
                            uppercase letter, and one lowercase letter.
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
