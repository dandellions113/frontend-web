/* eslint-disable react/prop-types */
export default function NewsItem({ news }) {
    return (
        <div className="relative overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 h-full flex-col shadow-xl">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {news.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-600">
                        Unknown
                        <span className="font-bold"> ({news.source})</span>
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
                <p className="max-w-[40ch] text-sm text-gray-500">
                    {news.summary}
                    <a
                        href={"#"}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        Continue reading...
                    </a>
                </p>
            </div>

            <dl className="flex gap-4 sm:gap-6 mt-5">
                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                        Publishing date
                    </dt>
                    <dd className="text-xs text-gray-500">{news.date}</dd>
                </div>

                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                        Reading time
                    </dt>
                    <dd className="text-xs text-gray-500">1m</dd>
                </div>
            </dl>

            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
        </div>
    );
}
