import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { getCookie } from "../Utils/cookieUtils";
import axiosInstance from "../api/axiosInstance";
import SavedNewsItem from "./SavedNewsItem";

// Dummy data for news articles with images

function SavedArticles() {
  const [filter, setFilter] = useState("All"); // Default filter
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [fetchedNews, setFetchedNews] = useState([]);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = getCookie("jwtToken");
    if (!jwtToken) {
      // Redirect to the desired page
      navigate("/");
    }
  }, [navigate]);

  // Filter and sort the news articles based on the selected sentiment and sorting order
  useEffect(() => {
    let filteredNews =
      filter === "All"
        ? fetchedNews
        : fetchedNews.filter((news) => news.sentiment === filter);
    // Sort the filtered news based on the selected sorting order
    filteredNews = filteredNews.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setNews(filteredNews);
  }, [filter, fetchedNews, sortOrder]);

  useEffect(() => {
    // Fetch all articles when the component mounts
    async function fetchArticles() {
      try {
        const response = await axiosInstance.get("/articles/getuserarticles");
        setFetchedNews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchArticles();
  }, []);

  const onDelete = (articleId) => {
    // Update the state to remove the deleted article
    setNews((prevNews) =>
      prevNews.filter((newsItem) => newsItem._id !== articleId)
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center space-x-4 space-y-4 md:space-y-0 mb-8">
          <button></button>

          <button
            className={`sm:px-8   sm:py-2 px-4 text-sm sm:text-base py-1 border rounded-full ${
              filter === "All"
                ? "bg-indigo-500 text-white"
                : "bg-white hover:bg-green-200"
            } `}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={`sm:px-8 sm:py-2 px-4 text-sm sm:text-base py-1 border rounded-full ${
              filter === "Positive"
                ? "bg-green-500 text-white"
                : "bg-white hover:bg-green-200"
            }`}
            onClick={() => setFilter("Positive")}
          >
            Positive
          </button>
          <button
            className={`sm:px-8 sm:py-2 px-4 text-sm sm:text-base py-1 border rounded-full ${
              filter === "Neutral"
                ? "bg-gray-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => setFilter("Neutral")}
          >
            Neutral
          </button>
          <button
            className={`sm:px-8 sm:py-2 px-4 text-sm sm:text-base py-1 border rounded-full ${
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
            className="px-8 py-2 border rounded-full bg-white hover:bg-gray-200 outline-none             sm:px-8 sm:py-2 text-sm sm:text-base "
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by Date (Asc)</option>
            <option value="desc">Sort by Date (Desc)</option>
          </select>
        </div>

        {/* News articles */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {news.map((newsItem, i) => (
            <SavedNewsItem news={newsItem} key={i} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedArticles;
