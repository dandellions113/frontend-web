import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authAxiosInstance from "../api/authAxiosInstance";
import { getCookie, setCookie } from "../Utils/cookieUtils";
import toast from "react-hot-toast";

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
            const response = await authAxiosInstance.post(
                "/users/signin",
                formData
            );

            // Handle success response
            console.log("Login successful:", response.data);

            // Redirect to the /news route on successful login
            const jwtToken = response.data.token;
            setCookie("jwtToken", jwtToken);
            console.log(jwtToken);
            toast.success("Logged In Successfully");
            navigate("/news");
        } catch (error) {
            // Handle error response (You can add your error handling logic here)
            console.error("Login error:", error);
            toast.error("Something went wrong", {
                duration: 4000,
                position: "top-right",
            });
        }
    };

    const validateEmail = (email) => {
        // Use a regular expression for basic email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const backgroundImageUrl1 =
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80";

    const backgroundImageUrl2 =
        "https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80";

    return (
        <>
            <section className="min-h-screen flex items-stretch ">
                <div
                    className="lg:flex w-1/2 hidden  bg-no-repeat bg-cover relative items-center"
                    style={{ backgroundImage: `url(${backgroundImageUrl1})` }}
                >
                    <div className="absolute opacity-60 inset-0 z-0 bg-black"></div>
                    <div className="w-full px-24 z-10 text-white">
                        <h1 className="text-5xl font-bold text-left tracking-wide">
                            Stay informed, stay connected
                        </h1>
                        <p className="text-3xl my-4 ">
                            Join the feedback revolution, log in now!
                        </p>
                    </div>
                </div>
                <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0  bg-slate-200">
                    <div
                        className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
                        style={{
                            backgroundImage: `url(${backgroundImageUrl2})`,
                        }}
                    ></div>
                    <div className="w-full py-6 z-20">
                        <h1 className="my-6 font-bold text-4xl font-serif text-indigo-500">
                            @fingerTips
                        </h1>

                        <form
                            onSubmit={handleSubmit}
                            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
                        >
                            <div className="pb-2 pt-4">
                                <input
                                    id="usernameOrEmail"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="block w-full p-4 text-lg outline-none text-gray-700 border-2 rounded"
                                />
                            </div>
                            <div className="pb-2 pt-4">
                                <input
                                    className="block w-full p-4 text-lg text-gray-700 border  rounded  outline-none"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="px-4 pb-2 pt-4">
                                <button
                                    className="uppercase block w-full sm:p-4 p-3 sm:text-lg text-base rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none text-white"
                                    type="submit"
                                >
                                    sign in
                                </button>

                                <p className="my-4 sm:text-black text-white ">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/signup"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
