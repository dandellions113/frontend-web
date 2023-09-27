/* eslint-disable react/prop-types */
export default function NewsItem({ news }) {
    const getBorder = () => {
        if (news.sentiment == "Negative") {
            return " bg-red-50 ";
        }
        if (news.sentiment == "Positive") {
            return " bg-green-50";
        }
        if (news.sentiment == "Neutral") {
            return " bg-blue-50";
        }
    };
    // bg-gradient-to-r from-green-300 via-blue-500 to-purple-600
    return (
        <div
            className={`relative overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 h-full flex-col shadow-xl ${getBorder()} hover:scale-105 transition-all duration-300`}
        >
            <span className="absolute inset-x-0 bottom-0 h-2 "></span>

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
                            news.image
                                ? news.image
                                : "https://images.pexels.com/photos/159652/table-food-book-newspaper-159652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        }
                        className="h-28 w-28 rounded-lg object-cover shadow-sm"
                    />
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm text-gray-500">
                    {news.Description.split(" ").slice(0, 30).join(" ")}{" "}
                    <a
                        href={news.Link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Continue reading...
                    </a>
                </p>
            </div>

            <dl className="flex gap-4 sm:gap-6 mt-5">
                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                        {news.sentiment.charAt(0).toUpperCase() +
                            news.sentiment.slice(1)}
                    </dt>
                    <dd className="text-sm text-gray-500">Sentiment</dd>
                </div>

                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                        {Math.round(news.Description.split(" ").length / 20) +
                            1}{" "}
                        m
                    </dt>
                    <dd className="text-xs text-gray-500">Reading time</dd>
                </div>
            </dl>

            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
        </div>
    );
}
