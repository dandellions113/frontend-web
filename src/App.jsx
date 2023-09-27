import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewsSummary from "./pages/NewsSummary";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/news" element={<NewsSummary />} />
          <Route path="/article" element={<ArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
