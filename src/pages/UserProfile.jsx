import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { getCookie } from "../Utils/cookieUtils";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = getCookie("jwtToken");
    if (!jwtToken) {
      // Redirect to the desired page
      navigate("/");
    }
  }, []);

  useEffect(() => {
    // Make an API request to fetch user profile data
    axiosInstance.get("/users/profile").then((response) => {
      setUserData(response.data);
    });
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          {/* User image */}
          <div className="mb-4">
            <img
              src={userData.profileImage || "/default-user-image.png"}
              alt="User"
              className="w-24 h-24 mx-auto rounded-full object-cover"
            />
          </div>
          {/* User full name */}
          <h2 className="text-2xl font-semibold">{userData.fullName}</h2>
        </div>

        {/* User details */}
        <div className="mt-4">
          <div className="mb-2">
            <span className="font-semibold">Email:</span> {userData.email}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Contact Number:</span>{" "}
            {userData.contactNumber}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Department:</span>{" "}
            {userData.department}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Region:</span> {userData.region}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
