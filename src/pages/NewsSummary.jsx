import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { getCookie } from "../Utils/cookieUtils";
import NewsItem from "./NewsItem";
import { newsData } from "../assets/newsData";
import Navbar from "../components/Navbar";

// Dummy data for news articles with images

function NewsSummary() {
  const [filter, setFilter] = useState("All"); // Default filter
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [news, setNews] = useState(newsData);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = getCookie("jwtToken");
    if (!jwtToken) {
      // Redirect to the desired page
      navigate("/");
    }
  }, []);

  // Filter and sort the news articles based on the selected sentiment and sorting order
  useEffect(() => {
    let filteredNews =
      filter === "All"
        ? newsData
        : newsData.filter((news) => news.sentiment === filter);

    // Sort the filtered news based on the selected sorting order
    filteredNews = filteredNews.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setNews(filteredNews);
  }, [filter, sortOrder]);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        {/* Filter buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-8 py-2 border rounded-full ${
              filter === "All"
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-blue-200"
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`px-8 py-2 border rounded-full ${
              filter === "Positive"
                ? "bg-green-500 text-white"
                : "bg-white hover:bg-green-200"
            }`}
            onClick={() => setFilter("Positive")}
          >
            Positive
          </button>
          <button
            className={`px-8 py-2 border rounded-full ${
              filter === "Neutral"
                ? "bg-gray-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => setFilter("Neutral")}
          >
            Neutral
          </button>
          <button
            className={`px-8 py-2 border rounded-full ${
              filter === "Negative"
                ? "bg-red-500 text-white"
                : "bg-white hover:bg-red-200"
            }`}
            onClick={() => setFilter("Negative")}
          >
            Negative
          </button>

          {/* Sorting dropdown */}
          <select
            className="px-8 py-2 border rounded-full bg-white hover:bg-gray-200 outline-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by Date (Asc)</option>
            <option value="desc">Sort by Date (Desc)</option>
          </select>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {news.map((news, i) => (
            <Link
              to={`/article`} // Specify the article route (replace with your route structure)
              key={i}
              className="hover:no-underline"
            >
              <NewsItem news={news} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsSummary;
