import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleService from "../services/article.service";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0); // pour la pagination
  const limit = 6; // nombre d'articles par appel
  const [totalArticles, setTotalArticles] = useState(0);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await ArticleService.getArticles({ limit, offset });
      setArticles((prev) => [...prev, ...data.articles]); // ajouter à la liste existante
      setTotalArticles(data.articlesCount);
      setOffset((prev) => prev + limit); // préparer l'offset suivant
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen px-5 pt-10 bg-gray-50">
      {/* Dashboard Button */}
      {user && (
        <div className="flex justify-center mb-8">
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold"
          >
            Go to Dashboard
          </Link>
        </div>
      )}

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
        Recent Blogs
      </h1>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {articles.map((blog) => (
          <Link
            to={`/blog/${blog.slug}`}
            key={blog.id}
            className="w-80 shadow-lg rounded-2xl overflow-hidden transform transition-transform hover:scale-105"
          >
            {blog.image ? (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div className="p-4 bg-white">
              <p className="font-semibold text-lg mb-2">{blog.title}</p>
              <span className="inline-block px-3 py-1 text-xs rounded-full border border-gray-300">
                {blog.tagList?.[0] || "Uncategorized"}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bouton Load More */}
      {offset < totalArticles && (
        <div className="flex justify-center mt-8">
          <button
            onClick={fetchArticles}
            disabled={loading}
            className="px-6 py-3 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
