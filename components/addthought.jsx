"use client";
import React, { useState } from "react";
import { motion } from "motion/react";

const AddThought = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const user_id = JSON.parse(localStorage.getItem("user_id"));
      const res = await fetch("/api/POST/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, user_id }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Thought added successfully!");
        setTitle("");
        setDescription("");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error submitting thought");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-3xl p-8 max-w-lg w-full"
      >
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
          Share Your Thought
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter a short title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
              placeholder="Share your detailed thought..."
              rows={5}
              required
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            {loading ? "Posting..." : "Post Thought"}
          </motion.button>
          {message && (
            <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default AddThought;
