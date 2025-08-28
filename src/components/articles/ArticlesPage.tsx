import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import ArticleEditor from "./admin/ArticleEditor";
import ArticleManagement from "./admin/ArticleManagement";
import ArticleViewer from "./user/ArticleViewer";
import ArticleNavigation from "./user/ArticleNavigation";
import { Article } from "@/types/article";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  toggleArticleStatus,
} from "@/services/articleServices";

const ArticlesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [_, setIsLoading] = useState(true);

  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  const view = searchParams.get("view") || "list";
  const articleId = searchParams.get("article");
  const editId = searchParams.get("edit");

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    if (view === "viewer" && articleId) {
      loadArticle(articleId);
    } else if (view === "editor" && editId) {
      if (editId && editId != "new") {
        loadArticle(editId);
      }
    }
  }, [view, articleId, editId]);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const articlesRes = await getArticles();
      console.log(articlesRes.articles);
      setArticles(articlesRes.articles as Article[]);
    } catch (error) {
      console.error("Error loading articles:", error);
      toast.error("Failed to load articles");
    } finally {
      setIsLoading(false);
    }
  };

  const loadArticle = async (id: string) => {
    try {
      const article = await getArticleById(id);
      setCurrentArticle(article);
    } catch (error) {
      toast.error("Failed to load article");
    }
  };

  const handleSaveArticle = async (articleData: any) => {
    try {
      if (editId && editId != "new") {
        const promise = updateArticle({ id: editId, ...articleData });
        toast.promise(promise, {
          loading: "Updating article...",
          success: "Article updated successfully",
          error: "Failed to update article",
        });
      } else {
        const promise = createArticle(articleData);
        toast.promise(promise, {
          loading: "Creating article...",
          success: "Article created successfully",
          error: "Failed to create article",
        });
      }
      await loadArticles();
      setSearchParams({ view: "list" });
    } catch (error) {
      toast.error("Failed to save article");
    }
  };

  const handlePublishArticle = async (articleData: any) => {
    try {
      if (editId && editId != "new") {
        const promise = updateArticle({
          id: editId,
          ...articleData,
          status: "published",
        });
        toast.promise(promise, {
          loading: "Publishing article...",
          success: "Article published successfully",
          error: "Failed to publish article",
        });
      } else {
        const promise = createArticle({ ...articleData, status: "published" });
        toast.promise(promise, {
          loading: "Publishing article...",
          success: "Article published successfully",
          error: "Failed to publish article",
        });
      }
      await loadArticles();
      setSearchParams({ view: "list" });
    } catch (error) {
      toast.error("Failed to publish article");
    }
  };

  const handleEditArticle = (id: string) => {
    setSearchParams({ view: "editor", edit: id });
  };

  const handleViewArticle = (id: string) => {
    setSearchParams({ view: "viewer", article: id });
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteArticle(id);
      toast.success("Article deleted successfully");
      await loadArticles();
    } catch (error) {
      toast.error("Failed to delete article");
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const article = articles.find((a) => a.id === id);
      if (article) {
        const newStatus =
          article.status === "published" ? "draft" : "published";
        await toggleArticleStatus(id, newStatus);
        toast.success(`Article ${newStatus} successfully`);
        await loadArticles();
      }
    } catch (error) {
      toast.error("Failed to update article status");
    }
  };

  const handleBackToList = () => {
    setSearchParams({ view: "list" });
    setCurrentArticle(null);
  };

  // Render based on current view
  if (view === "editor") {
    return (
      <div className="container overflow-y-hidden mx-auto p-6">
        <ArticleEditor
          articleId={currentArticle?.id ?? ""}
          onSave={handleSaveArticle}
          onPublish={handlePublishArticle}
        />
      </div>
    );
  }

  if (view === "viewer" && currentArticle) {
    return (
      <div className="container mx-auto p-6">
        <ArticleViewer
          article={currentArticle}
          onBackToList={handleBackToList}
        />
        <div className="mt-12">
          <ArticleNavigation
            currentArticle={currentArticle}
            onNavigate={handleViewArticle}
            onBackToList={handleBackToList}
          />
        </div>
      </div>
    );
  }

  // Default list view
  return (
    <div className="container mx-auto p-6">
      <ArticleManagement
        articles={articles}
        onEdit={handleEditArticle}
        onDelete={handleDeleteArticle}
        onTogglePublish={handleTogglePublish}
        onRefresh={loadArticles}
      />
    </div>
  );
};

export default ArticlesPage;
