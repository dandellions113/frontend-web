// NewsItem.js
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { AiFillDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { confirm } from "../components/Confirm";

export default function SavedNewsItem({ news, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

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

    const handleDelete = async () => {
        const confirmDelete = await confirm(
            "Are you sure you want to delete the article ?"
        );
        try {
            if (!confirmDelete) {
                return;
            }
            setIsDeleting(true);
            // Send a DELETE request to your backend API with the article ID
            const res = await axiosInstance.delete(`/articles/${news._id}`);
            // Notify the parent component that the article has been deleted
            toast.success("Article deleted successfully!");
            console.log(res);
            onDelete(news._id);
        } catch (error) {
            console.error("Error deleting article:", error);
            toast.error("Error deleting article.");
        } finally {
            setIsDeleting(false);
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
                        {news.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-600">
                        <span className="font-bold">
                            {news["published date"]}
                        </span>
                    </p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                    <img
                        alt="News"
                        src={
                            "https://images.pexels.com/photos/159652/table-food-book-newspaper-159652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        }
                        className="h-28 w-28 rounded-lg object-cover shadow-sm"
                    />
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm text-gray-500">
                    {news.description.length > 0 &&
                        news.description.split(" ").slice(0, 40).join(" ")}{" "}
                    <span className="text-blue-500 hover:text-blue-700">
                        Continue reading...
                    </span>
                </p>
            </div>

            <dl className="flex gap-4 sm:gap-6 mt-5">
                <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-600">
                        Sentiment
                    </dt>
                    <dd className="text-sm text-gray-500">{news.sentiment}</dd>
                </div>

                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                        {Math.round(news.description.split(" ").length / 20) +
                            1}{" "}
                        m
                    </dt>
                    <dd className="text-xs text-gray-500">Reading time</dd>
                </div>
            </dl>

            <button
                className={`absolute bottom-8 right-2 p-1 rounded-full `}
                title={"Delete this news article"}
                onClick={handleDelete}
                disabled={isDeleting}
            >
                <span className="material-icons text-2xl">
                    {isDeleting ? (
                        // Show a loading icon while deleting
                        <span className="animate-spin text-gray-400">...</span>
                    ) : (
                        // Show the delete icon
                        <AiFillDelete className="text-indigo-500" />
                    )}
                </span>
            </button>

            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
        </div>
    );
}
