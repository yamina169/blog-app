// src/services/article.service.js
import { api } from "./api";

const ArticleService = {
  // Récupérer tous les articles avec filtres, recherche et pagination
  getArticles: async (params = {}) => {
    // params peut contenir : limit, offset, tag, author, favorited, search
    // limit et offset sont dynamiques et envoyés depuis le front
    const response = await api.get("/articles", { params });
    return response.data; // { articles, articlesCount }
  },

  // Récupérer un article par slug
  getArticle: async (slug) => {
    const response = await api.get(`/articles/${slug}`);
    return response.data.article;
  },

  // Créer un nouvel article avec ou sans image
  createArticle: async (articleData, file) => {
    const formData = new FormData();

    formData.append("article[title]", articleData.title);
    formData.append("article[description]", articleData.description);
    formData.append("article[body]", articleData.body);

    if (articleData.tagList && articleData.tagList.length > 0) {
      articleData.tagList.forEach((tag) => {
        formData.append("article[tagList][]", tag);
      });
    }

    if (file) {
      formData.append("image", file); // fichier image
    }

    const token = localStorage.getItem("token");

    const response = await api.post("/articles", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.article;
  },

  // Mettre à jour un article existant
  updateArticle: async (slug, data) => {
    const token = localStorage.getItem("token");

    const response = await api.put(
      `/articles/${slug}`,
      { article: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.article;
  },

  // Supprimer un article
  deleteArticle: async (slug) => {
    const token = localStorage.getItem("token");

    const response = await api.delete(`/articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  // Ajouter un article aux favoris
  addToFavorites: async (slug) => {
    const token = localStorage.getItem("token");

    const response = await api.post(
      `/articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.article;
  },

  // Retirer un article des favoris
  removeFromFavorites: async (slug) => {
    const token = localStorage.getItem("token");

    const response = await api.delete(`/articles/${slug}/favorite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.article;
  },
};

export default ArticleService;
