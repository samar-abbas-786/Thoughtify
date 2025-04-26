"use client";
import ThoughtCard from "@components/thougtCard";
import { useState, useEffect } from "react";

const ShowPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPost() {
      try {
        const response = await fetch("/api/POST/getpost");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data.post || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getPost();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Recent Thoughts</h1>
        <p>Loading thoughts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Recent Thoughts</h1>
        <p className="text-red-500">Error loading thoughts: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Recent Thoughts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <ThoughtCard
              key={post.id}
              title={post.title}
              description={post.description}
              authorName={post.user?.name || "Anonymous"}
              id={post.user?.id || 1}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">
              No thoughts found. Be the first to share!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowPost;
