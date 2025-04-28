import { motion } from "motion/react";
import Link from "next/link";

const ThoughtCard = ({ title, description, authorName, id }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        rotate: -0.5,
        boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 250 }}
      className="max-w-md mx-auto bg-white rounded-3xl shadow-md overflow-hidden md:max-w-2xl m-6 p-5 border border-gray-200 hover:border-indigo-400 transition-all duration-300"
    >
      {title && (
        <h2 className="text-xl font-bold text-gray-800 mb-3 leading-tight tracking-tight hover:text-indigo-600 transition-colors duration-300">
          {title}
        </h2>
      )}

      <p className="text-gray-600 text-sm whitespace-pre-line mb-6 leading-relaxed">
        {description.length > 200
          ? description.substring(0, 200) + "..."
          : description}
      </p>

      <Link href={`/profile/${id}`} className="flex items-center group">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-md ring-2 ring-indigo-300 group-hover:ring-indigo-500 transition-all duration-300">
            {authorName.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="ml-3">
          <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
            {authorName}
          </p>
          <p className="text-xs text-gray-400">Contributor</p>
        </div>
      </Link>
    </motion.div>
  );
};

ThoughtCard.defaultProps = {
  title: "",
  description: "No description provided",
  authorName: "Anonymous",
};

export default ThoughtCard;
