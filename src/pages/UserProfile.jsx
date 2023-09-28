import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { getCookie } from "../Utils/cookieUtils";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
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

  const handleEditClick = () => {
    // Enable edit mode and initialize the updatedUser object with current data
    setEditMode(true);
    setUpdatedUser(userData);
  };

  const handleInputChange = (e) => {
    // Update the updatedUser object when input fields change
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleSaveClick = () => {
    // Make an API request to save the updated user data
    axiosInstance.put("/users/updateProfile", updatedUser).then((response) => {
      // Update the userData with the saved data
      setUserData(response.data.user);
      console.log(response.data);
      // Disable edit mode
      setEditMode(false);
    });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-blue-200 to-purple-200 p-4 min-h-screen flex items-center justify-center">
      <div className="max-w-[32rem] sm:w-[32rem] bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          {/* User image */}
          <div className="mb-4">
            <img
              src={
                userData.profileImage ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${userData.fullName}`
              }
              alt="User"
              className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-500"
            />
          </div>
          {/* User full name */}
          <h2 className="text-3xl font-semibold text-purple-800">
            {userData.fullName}
          </h2>
        </div>

        {/* User details using material 3 theme */}
        <div className="mt-8">
          <div className="border-t border-gray-200 pt-8 gap-4 flex flex-col">
            {/* User email */}
            {editMode ? (
              <input
                type="text"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                className="text-xl text-purple-800 font-semibold bg-blue-100 p-2 rounded-lg focus:outline-none"
              />
            ) : (
              DetailRow("Email", userData.email)
            )}

            {/* User contact number */}
            {editMode ? (
              <input
                type="text"
                name="contactNumber"
                value={updatedUser.contactNumber}
                onChange={handleInputChange}
                className="text-xl text-purple-800 font-semibold bg-blue-100 p-2 rounded-lg focus:outline-none"
              />
            ) : (
              DetailRow("Contact Number", userData.contactNumber)
            )}

            {/* User department */}
            {editMode ? (
              <input
                type="text"
                name="department"
                value={updatedUser.department}
                onChange={handleInputChange}
                className="text-xl text-purple-800 font-semibold bg-blue-100 p-2 rounded-lg focus:outline-none"
              />
            ) : (
              DetailRow("Department", userData.department)
            )}

            {/* User region */}
            {editMode ? (
              <input
                type="text"
                name="region"
                value={updatedUser.region}
                onChange={handleInputChange}
                className="text-xl text-purple-800 font-semibold bg-blue-100 p-2 rounded-lg focus:outline-none"
              />
            ) : (
              DetailRow("Region", userData.region)
            )}
          </div>
        </div>

        {/* Edit and Save buttons */}
        {editMode ? (
          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 ml-2 text-sm font-medium text-green-600 bg-green-100 rounded-lg hover:bg-green-200"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="mt-4 text-right">
            <button
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
              onClick={handleEditClick}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const DetailRow = (label, value) => {
  return (
    <div className="flex justify-between gap-8">
      <div className="flex justify-between flex-col gap-2">
        <div className="text-xl text-purple-800 font-semibold">{label}</div>
        <div className="text-sm font-medium text-gray-600">{value}</div>
      </div>
    </div>
  );
};

export default UserProfile;
