import { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { removeCookie } from "../Utils/cookieUtils";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  let Links = [
    { name: "News", link: "/news" },
    { name: "Profile", link: "/profile" },
    { name: "third link", link: "/" },
    { name: "fourth link", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const Logout = () => {
    removeCookie("jwtToken");
    navigate("/");
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-20">
      <div className="md:flex items-center justify-between bg-indigo-500 text-white py-4 md:px-10 px-7 md:p-5">
        {/* logo section */}
        <Link
          to="/news"
          className="font-bold  text-2xl cursor-pointer flex items-center gap-1"
        >
          <span className=" font-extrabold text-white">@</span>
          <span>FingerTip</span>
        </Link>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
        {/* linke items */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-indigo-500 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in text-base ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li
              className="md:ml-8 md:my-0 my-7 font-semibold text-white"
              key={link.name}
            >
              <Link
                to={link.link}
                className=" hover:text-gray-100 duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <button
            className="inline-flex items-center bg-white text-indigo-500 font-bold border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 md:ml-8 md:my-0 my-7"
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
        </ul>
        {/* button */}
      </div>
    </div>
  );
};

export default Header;
