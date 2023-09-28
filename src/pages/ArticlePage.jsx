import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // If using React Router
import { getCookie } from "../Utils/cookieUtils";
import { BiSolidTimeFive } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { FaSourcetree } from "react-icons/fa";
import { GrStatusCriticalSmall } from "react-icons/gr";
import db from "../../firebase";

// Dummy data for a news article

function ArticlePage() {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const [articleData, setArticleData] = useState({});
  useEffect(() => {
    const fetchArticle = async () => {
      // fetch doc corresponding to articleId from firebase
      db.collection("news")
        .doc(articleId)
        .onSnapshot((snapshot) => {
          console.log(snapshot.data());
          setArticleData(snapshot.data());
        });
    };

    fetchArticle();
  }, [articleId]);

  useEffect(() => {
    const jwtToken = getCookie("jwtToken");
    if (!jwtToken) {
      // Redirect to the desired page
      navigate("/");
    }
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto ">
        <h1 className="sm:text-5xl text-4xl sm:text-center font-bold  my-8 text-indigo-500">
          {articleData.Headline}
        </h1>
        <div className="bg-white  shadow-md text-indigo-500 p-12 rounded-md ">
          <img
            src={
              articleData.cms
                ? "https://images.pexels.com/photos/159652/table-food-book-newspaper-159652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                : articleData.Img
            }
            alt={`Image for ${articleData.Headline}`}
            className="w-full h-auto mb-4 rounded-xl max-h-[32rem] object-cover"
          />
          <div className="flex items-center justify-center ">
            <p className=" mb-4 font-semibold  flex items-center  mr-4">
              <FaSourcetree className="mr-2 " />{" "}
              <span>{articleData.Timestamp}</span>
            </p>
            <p className="mb-4 font-semibold  flex items-center mr-4">
              <BiSolidTimeFive className="mr-2 " />{" "}
              <span className="font-bold"> {articleData.Timestamp} </span>
            </p>
            <p className="mb-4 font-semibold  flex items-center mr-4">
              <MdLocationOn className="mr-2 " />{" "}
              <span className="font-bold"> {"Europe"}</span>
            </p>

            <div className="mb-4 flex justify-center items-center">
              <GrStatusCriticalSmall className="mr-2" />
              <span
                className={`font-semibold ${
                  articleData.sentiment === "Negative" &&
                  "text-red-500  bg-white rounded-full font-bold "
                }
              ${
                articleData.sentiment === "Positive" &&
                "text-green-500   bg-white rounded-full font-bold  "
              }

              ${
                articleData.sentiment === "neutral" &&
                "text-indigo-500   bg-white rounded-full font-bold  "
              }
              
              `}
              >
                {articleData.sentiment}
              </span>
            </div>
          </div>

          {/* Article content */}
          <div className="text-gray-800 md:text-xl sm:text-lg text-sm font-serif leading-7">
            {articleData.content}
          </div>
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
