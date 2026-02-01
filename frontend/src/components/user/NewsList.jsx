import { useEffect, useState, useRef } from "react";
import { FaClock } from "react-icons/fa";

const API_KEY = "pub_403e0578e5f24acdb3f519f9e65b1105";
const BASE_URL = "https://newsdata.io/api/1/latest";

// mots-clés tech
const KEYWORDS_FILTER = [
  "devops",
  "cloud",
  "ai",
  "ml",
  "blockchain",
  "cyber",
  "crypto",
  "data science",
];

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const nextPageRef = useRef(null);

  const fetchBatch = async () => {
    setLoading(true);
    try {
      const url = new URL(BASE_URL);
      url.searchParams.set("apikey", API_KEY);
      url.searchParams.set("category", "technology");
      url.searchParams.set("language", "en");
      url.searchParams.set("size", "10"); // prendre plus pour garantir 4 après filtrage

      if (nextPageRef.current) {
        url.searchParams.set("page", nextPageRef.current);
      }

      const res = await fetch(url.toString());
      const data = await res.json();
      const results = Array.isArray(data.results) ? data.results : [];

      // filtrage flexible
      const filtered = results.filter((article) =>
        KEYWORDS_FILTER.some((keyword) => {
          const lowerKeyword = keyword.toLowerCase();
          const title = article.title?.toLowerCase() || "";
          const description = article.description?.toLowerCase() || "";
          return (
            title.includes(lowerKeyword) || description.includes(lowerKeyword)
          );
        })
      );

      // Garantir au moins 4 articles
      let finalArticles = filtered;
      if ((filtered.length = 4)) {
        // compléter avec les articles non filtrés
        const remaining = results.filter((a) => !filtered.includes(a));
        finalArticles = [...filtered, ...remaining].slice(0, 4);
      }

      setArticles(finalArticles);
      nextPageRef.current = data.nextPage || null;
    } catch (err) {
      console.error("Erreur récupération news:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch();
    const interval = setInterval(fetchBatch, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const truncateTitle = (title) => {
    if (!title) return "";
    return title.length > 70 ? title.slice(0, 70) + "..." : title;
  };

  if (loading && articles.length === 0)
    return <p className="text-gray-500 animate-pulse">Loading news...</p>;

  if (articles.length === 0)
    return <p className="text-gray-500">No news found.</p>;

  return (
    <div
      className="fixed top-1/2 right-4 transform -translate-y-1/2 w-80 bg-white rounded-xl shadow-md overflow-y-auto p-3"
      style={{ maxHeight: "80vh" }}
    >
      <h3 className="text-lg font-bold mb-3 text-center">Tech News</h3>

      {articles.map((item) => (
        <a
          key={item.article_id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-3 items-start border-b last:border-b-0 pb-2 mb-2 hover:bg-gray-50 transition"
        >
          {/* IMAGE (masquée si erreur) */}
          {item.image_url && (
            <img
              src={item.image_url}
              alt=""
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
            />
          )}

          <div className="flex flex-col gap-1">
            {/* TITRE COURT */}
            <p className="font-semibold text-sm leading-snug">
              {truncateTitle(item.title)}
            </p>

            {/* DATE + SOURCE */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FaClock className="text-gray-400" />
              <span>{formatDateTime(item.pubDate)}</span>
              <span>•</span>
              <span>{item.source_id || "Source"}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default NewsList;
