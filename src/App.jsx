import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewsSummary from "./pages/NewsSummary";
import ArticlePage from "./pages/ArticlePage";
import UserProfile from "./pages/UserProfile";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { getCookie } from "./Utils/cookieUtils";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const jwtToken = getCookie("jwtToken");
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  return (
    <div className={`${isLoggedIn && "mt-24"}`}>
      <Toaster />

      <div>
        {isLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/news" element={<NewsSummary />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
