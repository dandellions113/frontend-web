// NewsItem.js
import { useState } from "react";
import PropTypes from "prop-types";
import { BsBookmarkFill } from "react-icons/bs";
import axiosInstance from "../api/axiosInstance";

export default function NewsItem({ news }) {
  // Define state to track whether the news article is saved or not
  const [isSaved, setIsSaved] = useState(false);

  const getStyles = () => {
    if (news.sentiment === "negative") {
      return "bg-red-200";
    }
    if (news.sentiment === "positive") {
      return "bg-green-200";
    }
    if (news.sentiment === "neutral") {
      return "bg-blue-50";
    }
  };

  // Function to handle saving/un-saving the news article
  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleSaveArticle = async (article) => {
    try {
      if (isSaved) {
        // If already saved
        //show toast that it is aleready saved
      } else {
        // Implement logic to save the article
        const res = await axiosInstance.post("/articles", article);
        console.log("Response from saving article:", res);
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error saving/unsaving article:", error);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 h-full flex-col shadow-xl ${getStyles()} hover:scale-105 transition-all duration-300`}
    >
      <span className="absolute inset-x-0 bottom-0 h-2"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {news.Headline}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">
            <span className="font-bold">{news.Timestamp}</span>
          </p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <img
            alt="News"
            src={
              news.cms
                ? "https://images.pexels.com/photos/159652/table-food-book-newspaper-159652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                : news.Img
            }
            className="h-28 w-28 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">
          {news.Description.length > 0 &&
            news.Description.split(" ").slice(0, 40).join(" ")}{" "}
          <span className="text-blue-500 hover:text-blue-700">
            Continue reading...
          </span>
        </p>
      </div>

      <dl className="flex gap-4 sm:gap-6 mt-5">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Neutral</dt>
          <dd className="text-sm text-gray-500">Sentiment</dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">
            {Math.round(news.Description.split(" ").length / 20) + 1} m
          </dt>
          <dd className="text-xs text-gray-500">Reading time</dd>
        </div>
      </dl>

      {/* Save button/icon */}
      <button
        className={`absolute bottom-8 right-2 p-1 rounded-full `}
        onClick={toggleSave}
        title={!isSaved && "Save this news article"}
      >
        <span className="material-icons text-2xl">
          {!isSaved && (
            <BsBookmarkFill
              onClick={() => {
                handleSaveArticle(news);
              }}
            />
          )}
        </span>
      </button>

      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
    </div>
  );
}

NewsItem.propTypes = {
  news: PropTypes.object.isRequired,
};
