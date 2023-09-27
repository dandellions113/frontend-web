import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import { getCookie } from "../Utils/cookieUtils";

// Dummy data for news articles with images
const newsData = [
  {
    id: 1,
    title: "Lorem Ipsum News 1",
    source: "Lorem Ipsum Source 1",
    summary:
      "Summary of news article 1 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-1",
    region: "Europe",
    sentiment: "Neutral",
  },
  {
    id: 2,
    title: "Lorem Ipsum News 2",
    source: "Lorem Ipsum Source 2",
    summary:
      "Summary of news article 2 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-2",
    region: "Europe",
    sentiment: "Positive",
  },
  {
    id: 3,
    title: "Lorem Ipsum News 3",
    source: "Lorem Ipsum Source 3",
    summary:
      "Summary of news article 3 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-3",
    region: "Europe",
    sentiment: "Negative",
  },

  {
    id: 1,
    title: "Lorem Ipsum News 1",
    source: "Lorem Ipsum Source 1",
    summary:
      "Summary of news article 1 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-4",
    region: "Europe",
    sentiment: "Neutral",
  },
  {
    id: 2,
    title: "Lorem Ipsum News 2",
    source: "Lorem Ipsum Source 2",
    summary:
      "Summary of news article 2 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-5",
    region: "Europe",
    sentiment: "Positive",
  },
  {
    id: 3,
    title: "Lorem Ipsum News 3",
    source: "Lorem Ipsum Source 3",
    summary:
      "Summary of news article 3 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-6",
    region: "Europe",
    sentiment: "Negative",
  },
  {
    id: 1,
    title: "Lorem Ipsum News 1",
    source: "Lorem Ipsum Source 1",
    summary:
      "Summary of news article 1 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-7",
    region: "Europe",
    sentiment: "Neutral",
  },
  {
    id: 2,
    title: "Lorem Ipsum News 2",
    source: "Lorem Ipsum Source 2",
    summary:
      "Summary of news article 2 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-8",
    region: "Europe",
    sentiment: "Positive",
  },
  {
    id: 1,
    title: "Lorem Ipsum News 1",
    source: "Lorem Ipsum Source 1",
    summary:
      "Summary of news article 1 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-9",
    region: "Europe",
    sentiment: "Neutral",
  },
  {
    id: 2,
    title: "Lorem Ipsum News 2",
    source: "Lorem Ipsum Source 2",
    summary:
      "Summary of news article 2 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-10",
    region: "Europe",
    sentiment: "Positive",
  },
  {
    id: 1,
    title: "Lorem Ipsum News 1",
    source: "Lorem Ipsum Source 1",
    summary:
      "Summary of news article 1 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-11",
    region: "Europe",
    sentiment: "Neutral",
  },
  {
    id: 2,
    title: "Lorem Ipsum News 2",
    source: "Lorem Ipsum Source 2",
    summary:
      "Summary of news article 2 goes here. It provides a brief overview of the content.",
    image:
      "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with actual image URLs
    date: "2023-09-12",
    region: "Europe",
    sentiment: "Positive",
  },
];

function NewsSummary() {
  const [filter, setFilter] = useState("All"); // Default filter
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [news, setNews] = useState(newsData);

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = getCookie("jwtToken");
    if (!jwtToken) {
      // Redirect to the desired page
      navigate("/login");
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8">
          News Summary
        </h1>
        {/* Filter buttons */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 border rounded ${
              filter === "All"
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-blue-200"
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 border rounded ${
              filter === "Positive"
                ? "bg-green-500 text-white"
                : "bg-white hover:bg-green-200"
            }`}
            onClick={() => setFilter("Positive")}
          >
            Positive
          </button>
          <button
            className={`px-4 py-2 border rounded ${
              filter === "Neutral"
                ? "bg-gray-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => setFilter("Neutral")}
          >
            Neutral
          </button>
          <button
            className={`px-4 py-2 border rounded ${
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
            className="px-4 py-2 border rounded bg-white hover:bg-gray-200 outline-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Sort by Date (Asc)</option>
            <option value="desc">Sort by Date (Desc)</option>
          </select>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {news.map((news, i) => (
            <Link
              to={`/article`} // Specify the article route (replace with your route structure)
              key={i}
              className="hover:no-underline"
            >
              <div
                key={i}
                className={`bg-white rounded shadow-md p-4 transition-transform transform hover:scale-105 ${
                  news.sentiment === "Negative" && "bg-red-300"
                }   ${news.sentiment === "Positive" && "bg-green-300"}`}
              >
                <div className="mb-2">
                  <img
                    src={news.image}
                    alt={`Image for ${news.title}`}
                    className="w-full h-auto"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
                <p className="text-gray-600 mb-2">{news.source}</p>
                <div className="mb-2">
                  <div
                    className={`font-semibold ${
                      news.sentiment === "Negative"
                        ? "bg-red-500 text-white"
                        : ""
                    }`}
                  >
                    Date: {news.date}
                  </div>
                </div>
                <div className="mb-2">
                  <div
                    className={`font-semibold ${
                      news.sentiment === "Positive"
                        ? "bg-green-500 text-white"
                        : ""
                    }`}
                  >
                    Region: {news.region}
                  </div>
                </div>
                <div className="mb-2">
                  <span
                    className={`font-semibold ${
                      news.sentiment === "Negative"
                        ? "bg-red-500 text-white"
                        : ""
                    }`}
                  >
                    Sentiment: {news.sentiment}
                  </span>
                </div>
                <p className="text-gray-800">{news.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsSummary;
