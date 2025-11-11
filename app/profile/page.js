"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const [showDialog, setShowDialog] = useState(false);

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
  const handleUpdate = async (id) => {
    try {
      setShowDialog(true);
      const updated = await axios.post("/api/POST/updatepost", {
        id: id,
        title: title,
        description: description,
      });
      if (updated.data.status == 200) {
        alert("Post Updates Successfully");
      }
      setShowDialog(false);
    } catch (error) {
      setShowDialog(false);
    }
  };
  const handleShowDialog = (id, title, description) => {
    setShowDialog(!showDialog);
    setUpdatingId(id);
    setTitle(title);
    setDescription(description);
  };
  if (showDialog) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm z-50">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 w-[350px] text-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-900">
            Update Details
          </h2>

          <div className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                placeholder="Enter title..."
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 resize-none h-24"
                placeholder="Enter description..."
              />
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(updatingId)}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all"
              >
                Update
              </button>
            </div>
          </div>
        </div>
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
                <div className="w-full flex justify-between">
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

                  <button
                    onClick={() =>
                      handleShowDialog(post.id, post.title, post.description)
                    }
                    className={`px-4 py-1 text-sm rounded-md text-white transition-colors ${
                      deletingId === post.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600"
                    }`}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
