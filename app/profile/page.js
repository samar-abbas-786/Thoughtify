"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // 1️⃣ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  // 2️⃣ Fetch posts after user is loaded
  useEffect(() => {
    if (!user?.id) return;

    const getMyPosts = async () => {
      try {
        const res = await axios.post("/api/POST/getPostById", { id: user.id });
        setMyPosts(res.data.post || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    getMyPosts();
  }, [user]);

  // 3️⃣ Handle delete
  const handleDelete = async (postId) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      setDeletingId(postId);
      const res = await axios.post("/api/POST/deletepost", { id: postId });

      if (res.status === 200) {
        setMyPosts((prev) => prev.filter((p) => p.id !== postId));
      } else {
        alert(res.data?.message || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Something went wrong while deleting the post.");
    } finally {
      setDeletingId(null);
    }
  };

  // 4️⃣ Loading state
  if (!user || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  // 5️⃣ Profile + Posts UI
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      {/* Profile Info */}
      <div className="text-center mb-8">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=0D8ABC&color=fff`}
          alt={user.name}
          className="w-20 h-20 rounded-full mx-auto mb-3 shadow-sm"
        />
        <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-400 text-sm mt-1">User ID: {user.id}</p>
      </div>

      <hr className="my-4" />

      {/* Posts Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          My Posts
        </h2>

        {myPosts.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            No posts added yet.
          </p>
        ) : (
          <div className="space-y-4">
            {myPosts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-medium text-gray-800 mb-1">
                  {post.title || "Untitled Post"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {post.description || "No description available."}
                </p>
                <p className="text-gray-400 text-xs mt-2 mb-3"></p>

                {/* 🗑 Delete Button */}
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deletingId === post.id}
                  className={`px-4 py-1 text-sm rounded-md text-white transition-colors ${
                    deletingId === post.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {deletingId === post.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
