import { Link } from "react-router-dom";
import { FaHeart, FaClock } from "react-icons/fa";

const TAG_COLORS = [
  "bg-blue-200 text-blue-800",
  "bg-green-200 text-green-800",
  "bg-orange-200 text-orange-800",
  "bg-red-200 text-red-800",
  "bg-purple-200 text-purple-800",
  "bg-yellow-200 text-yellow-800",
  "bg-pink-200 text-pink-800",
  "bg-teal-200 text-teal-800",
];

let globalTagCounter = 0; // compteur global pour les couleurs

const BlogList = ({ articles, onToggleFavorite }) => {
  const getNextTagColor = () => {
    const color = TAG_COLORS[globalTagCounter % TAG_COLORS.length];
    globalTagCounter += 1;
    return color;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="flex flex-col space-y-8">
      {articles.map((blog) => {
        const created = formatDateTime(blog.createdAt);
        const updated = formatDateTime(blog.updatedAt);

        const displayDate =
          updated && updated !== created
            ? `Updated: ${updated}`
            : `Created: ${created}`;

        const hasImage = blog.image && blog.image.trim() !== "";

        return (
          <Link
            to={`/blog/${blog.slug}`}
            key={blog.id}
            className="relative flex flex-col md:flex-row-reverse bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 md:h-48"
          >
            {hasImage && (
              <div className="md:w-1/4 h-full flex-shrink-0 overflow-hidden rounded-r-xl">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => e.currentTarget.parentElement.remove()}
                />
              </div>
            )}

            <div
              className={`p-6 flex flex-col justify-between ${
                hasImage ? "md:w-3/4" : "w-full"
              }`}
            >
              <div>
                <h2 className="text-2xl font-bold mb-2 line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-gray-700 mb-2 line-clamp-3">
                  {blog.description ||
                    (blog.body ? blog.body.substring(0, 120) + "..." : "")}
                </p>

                <div className="flex items-center text-gray-500 text-sm mb-4 gap-1">
                  <FaClock className="text-gray-400" />
                  <span>{displayDate}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {blog.tagList?.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-block px-3 py-1 text-xs rounded-full border ${getNextTagColor()}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              onClick={(e) => onToggleFavorite(e, blog)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 shadow cursor-pointer"
            >
              <FaHeart
                className={`transition ${
                  blog.favorited ? "text-red-500" : "text-gray-400"
                }`}
              />
              <span className="font-semibold text-gray-700">
                {blog.favoritesCount}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
