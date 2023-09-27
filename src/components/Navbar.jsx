import { Link, useNavigate } from "react-router-dom";
import { removeCookie } from "../Utils/cookieUtils";

const Navbar = () => {
  const navigate = useNavigate();

  const Logout = () => {
    removeCookie("jwtToken");
    navigate("/");
  };
  return (
    <div>
      <header className="font-semibold body-font bg-indigo-500 text-white fixed left-0 right-0 top-0 z-20">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl text-white font-bold">FingerTip</span>
          </a>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to="/news" className="mr-5 hover:text-gray-300">
              News
            </Link>
            <Link to="/profile" className="mr-5 hover:text-gray-300">
              Profile
            </Link>
            <Link to="/" className="mr-5 hover:text-gray-300">
              Third Link
            </Link>
            <Link to="/" className="mr-5 hover:text-gray-300">
              Fourth Link
            </Link>
          </nav>
          <button
            className="inline-flex items-center bg-white text-indigo-500 font-bold border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            onClick={Logout}
          >
            Logout
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
