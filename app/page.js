import ThoughtCard from "@components/thougtCard";
const Home = async () => {
  try {
    const response = await fetch("/api/POST/getpost");
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Recent Thoughts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <ThoughtCard
                key={post.id}
                title={post.title}
                description={post.content || post.description}
                authorName={post.user?.name || "Anonymous"}
                createdAt={post.createdAt || 0 / 0 / 0}
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
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Recent Thoughts</h1>
        <p className="text-red-500">Error loading thoughts: {error.message}</p>
      </div>
    );
  }
};

export default Home;
