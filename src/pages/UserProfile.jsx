/* eslint-disable react-hooks/exhaustive-deps */
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
    <div className="bg-gray-100 p-4 min-h-screen flex items-center justify-center">
      <div className="max-w-[32rem] sm:w-[32rem] bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          {/* User image */}
          <div className="mb-4">
            <img
              src={
                userData.profileImage ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${userData.fullName}}`
              }
              alt="User"
              className="w-24 h-24 mx-auto rounded-full object-cover"
            />
          </div>
          {/* User full name */}
          <h2 className="text-3xl font-semibold">{userData.fullName}</h2>
        </div>

        {/* User details using material 3 theme */}
        <div className="mt-8">
          <div className="border-t border-gray-200 pt-8 gap-4 flex flex-col">
            {/* User email */}
            {DetailRow("Email", userData.email)}
            {/* User contact number */}
            {DetailRow("Contact Number", userData.contactNumber)}
            {/* User department */}
            {DetailRow("Department", userData.department)}
            {/* User region */}
            {DetailRow("Region", userData.region)}
          </div>
        </div>
      </div>
    </div>
  );
}
const DetailRow = (label, value) => {
  return (
    <div className="flex justify-between gap-8">
      <div className="flex justify-between flex-col gap-2">
        <div className="text-xl text-black font-semibold">{label}</div>
        <div className="text-sm font-medium text-gray-600">{value}</div>
      </div>
      {/* edit button */}
      <button className="text-sm text-blue-500 hover:text-blue-700 mb-auto">
        Edit
      </button>
    </div>
  );
};

export default UserProfile;
