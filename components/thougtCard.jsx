import { motion } from "framer-motion";
import Link from "next/link";

const ThoughtCard = ({ title, description, authorName, id }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        rotate: -1,
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="max-w-md mx-auto bg-gradient-to-br from-white via-gray-100 to-gray-50 rounded-3xl shadow-md overflow-hidden md:max-w-2xl m-6 p-6 border border-gray-200 hover:border-indigo-400 transition-all duration-300"
    >
      {title && (
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 leading-tight">
          {title}
        </h2>
      )}

      <p className="text-gray-600 text-base whitespace-pre-line mb-8">
        {description}
      </p>

      <Link href={"/"} className="flex items-center">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg ring-2 ring-indigo-300">
            {authorName.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-semibold text-gray-900">{authorName}</p>
          <p className="text-xs text-gray-500">Contributor</p>
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
