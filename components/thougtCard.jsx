import React from "react";

const ThoughtCard = ({ title, description, authorName }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 hover:shadow-lg transition-shadow duration-300">
      <div className="p-8">
        {title && (
          <h2 className="block mt-1 text-xl leading-tight font-medium text-gray-900">
            {title}
          </h2>
        )}

        <p className="mt-3 text-gray-600 whitespace-pre-line">{description}</p>

        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
              {authorName.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{authorName}</p>
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="mt-4 flex space-x-4">
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Like
          </button>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Comment
          </button>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

ThoughtCard.defaultProps = {
  title: "",
  description: "No description provided",
  authorName: "Anonymous",
  createdAt: new Date().toISOString(),
};

export default ThoughtCard;
