import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // If using React Router
import { getCookie } from "../Utils/cookieUtils";

// Dummy data for a news article
const articleData = {
  title: "Lorem Ipsum News 1",
  source: "Lorem Ipsum Source 1",
  summary:
    "Summary of news article 1 goes here. It provides a brief overview of the content.",
  image:
    "https://images.indianexpress.com/2020/05/sports-stars-in-lockdown.jpg", // Replace with an actual image URL
  date: "2023-09-23",
  region: "Europe",
  sentiment: "Negative",
  content: `
    <p>
      This is the full content of the news article. It contains detailed information and paragraphs
      about the topic. You can add as much text as needed here.
      This is the full content of the news article. It contains detailed information and paragraphs
      about the topic. You can add as much text as needed here. This is the full content of the news article. It contains detailed information and paragraphs
      about the topic. You can add as much text as needed here. This is the full content of the news article. It contains detailed information and paragraphs
      about the topic. You can add as much text as needed here. This is the full content of the news article. It contains detailed information and paragraphs
      about the topic. You can add as much text as needed here.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod tincidunt nisl,
      a volutpat urna congue id. Fusce in augue sed leo viverra tempor. Morbi eu purus erat.
      This is the full content of the news article. It contains detailed information and paragraphs
      about the topic. You can add as much text as needed here. This is the full content of the news article. It contains detailed information and paragraphs
      about the topic. You can add as much text as needed here. This is the full content of the news article. It contains detailed information and paragraphs
      about the topic. You can add as much text as needed here. This is the full content of the news article. It contains detailed information and paragraphs
      about the topic. You can add as much text as needed here. This is the full content of the news article. It contains detailed information and paragraphs
      about the topic. You can add as much text as needed here.
    </p>
    <!-- Add more content here -->
  `,
};

function ArticlePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = getCookie("jwtToken");
    if (!jwtToken) {
      // Redirect to the desired page
      navigate("/login");
    }
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-8">
          {articleData.title}
        </h1>
        <div className="bg-white rounded shadow-md p-4">
          <img
            src={articleData.image}
            alt={`Image for ${articleData.title}`}
            className="w-full h-auto mb-4"
          />
          <p className="text-gray-600 mb-2">{articleData.source}</p>
          <div className="mb-2">
            <div className={`font-semibold `}>Date: {articleData.date}</div>
          </div>
          <div className="mb-2">
            <div className={`font-semibold`}>Region: {articleData.region}</div>
          </div>
          <div className="my-6">
            <span
              className={`font-semibold ${
                articleData.sentiment === "Negative"
                  ? "bg-red-500 text-white rounded-lg font-bold px-3 py-2"
                  : ""
              }`}
            >
              feed back: {articleData.sentiment}
            </span>
          </div>
          {/* Article content */}
          <div
            dangerouslySetInnerHTML={{ __html: articleData.content }}
            className="text-gray-800"
          ></div>
        </div>
        <div className="text-center mt-4">
          {/* Optional: Add a back button to return to the news summary page */}
          {/* <Link
            to="/news" // Replace with the actual route to your news summary page
            className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Back to News Summary
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
