import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewsSummary from "./pages/NewsSummary";
import ArticlePage from "./pages/ArticlePage";
import UserProfile from "./pages/UserProfile";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/news" element={<NewsSummary />} />
            <Route path="/article" element={<ArticlePage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
