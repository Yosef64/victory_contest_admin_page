import React, { useState, useEffect, useCallback, useRef } from "react";

import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import Color from "@tiptap/extension-color";

import Highlight from "@tiptap/extension-highlight";

import Image from "@tiptap/extension-image";

import Youtube from "@tiptap/extension-youtube";

import Underline from "@tiptap/extension-underline";

import TextAlign from "@tiptap/extension-text-align";

import Link from "@tiptap/extension-link";

import { TextStyle } from "@tiptap/extension-text-style";

import BulletList from "@tiptap/extension-bullet-list";

import HardBreak from "@tiptap/extension-hard-break";

import { Article } from "@/types/article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import EditorToolbar from "../editor/EditorToolbar";
import ImagesDrawer from "./ImagesDrawer";
import { getArticleById } from "@/services/articleServices";
import { Eye, Save, Send } from "lucide-react";

interface ArticleEditorProps {
  articleId: string;
  onSave: (article: Article) => void;
  onPublish: (article: Article) => void;
  isLoading?: boolean; // This prop now represents submitting state (e.g., saving/publishing)
}

// Initial state for the form data
const initialArticleState: Article = {
  id: "",
  title: "",
  content: "<p></p>", // Default empty content for the editor
  excerpt: "",
  author: { id: "", name: "", avatar: "" }, // Assuming Author type {id, name, avatar}
  status: "draft",
  publishedAt: undefined,
  createdAt: new Date(),
  updatedAt: new Date(),
  tags: [],
  thumbnail: "",
  readTime: 0,
  viewCount: 0,
  likeCount: 0,
};

const ArticleEditor: React.FC<ArticleEditorProps> = ({
  articleId,
  onSave,
  onPublish,
  isLoading = false,
}) => {
  // ## 1. CONSOLIDATED STATE & ASYNC HANDLING ##
  // Original article data from the server
  const [article, setArticle] = useState<Article | null>(null);
  // Form data that the user can edit
  const [formData, setFormData] = useState<Article>(initialArticleState);
  // State for the tag input field
  const [tagInput, setTagInput] = useState("");
  // UI-specific states
  const [isPreview, setIsPreview] = useState(false);
  const [showImages, setShowImages] = useState(false);
  // States for handling the initial data fetch
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // ## 2. SAFE EDITOR CONTENT INITIALIZATION ##
  // Ref to track if the editor's content has been set from fetched data
  const isContentLoaded = useRef(false);

  // Effect to fetch the article data when the component mounts or articleId changes
  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId || articleId === "new") {
        setIsFetching(false);
        return;
      }
      setIsFetching(true);
      setFetchError(null);
      try {
        const data = await getArticleById(articleId);
        setArticle(data);
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setFetchError("Could not load the article. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchArticle();
  }, [articleId]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,

        hardBreak: false,
      }),

      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            "Shift-Enter": () =>
              this.editor.chain().setHardBreak().setHardBreak().run(),
          };
        },
      }),

      BulletList.extend({
        addAttributes() {
          return {
            class: {
              default: null,

              renderHTML: (attributes) => {
                if (!attributes.class) return {};

                return { class: attributes.class };
              },
            },
          };
        },
      }),

      Underline,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),

      TextStyle,

      Color.configure({
        types: ["textStyle"],
      }),

      Highlight.configure({
        multicolor: true,
      }),

      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg mx-auto block",
        },
      }),

      Youtube.configure({
        width: 640,

        height: 480,

        HTMLAttributes: {
          class: "rounded-lg mx-auto block",
        },
      }),

      Link.configure({
        openOnClick: false,

        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline",
        },
      }),
    ],

    content: article?.content ?? "<p>Start writing your article...</p>",

    editorProps: {
      attributes: {
        class:
          "tiptap prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  // Effect to populate the form and editor ONCE after data is fetched
  useEffect(() => {
    // Check if we have data, the editor is ready, and we haven't already loaded content
    if (article && editor && !isContentLoaded.current) {
      editor.commands.setContent(article.content);
      setFormData(article); // Set the entire fetched article object into formData
      isContentLoaded.current = true;
    }
  }, [article, editor]);

  // ## 3. OPTIMIZED EVENT HANDLERS ##
  // A single, reusable handler for all form input changes
  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  // Use useCallback to memoize functions and prevent unnecessary re-renders
  const buildArticlePayload = useCallback(
    (status: "draft" | "published"): Article => ({
      id: article?.id || "",
      title: formData.title,
      content: editor ? editor.getHTML() : article?.content || "",
      excerpt: formData.excerpt,
      tags: formData.tags,
      status,
      author: {
        id: article?.author?.id || "1",
        name: formData.author.name || "Admin User",
        avatar: formData.author.avatar || "",
      },
      publishedAt:
        status === "published"
          ? article?.publishedAt || new Date()
          : article?.publishedAt,
      createdAt: article?.createdAt || new Date(),
      updatedAt: new Date(),
      thumbnail: formData?.thumbnail,
      readTime: article?.readTime || 0,
      viewCount: article?.viewCount || 0,
      likeCount: article?.likeCount || 0,
    }),
    [article, editor, formData]
  );

  const handleSave = useCallback(() => {
    if (!editor) return;
    onSave(buildArticlePayload("draft"));
  }, [editor, onSave, buildArticlePayload]);

  const handlePublish = useCallback(() => {
    if (!editor) return;
    onPublish(buildArticlePayload("published"));
  }, [editor, onPublish, buildArticlePayload]);

  const addTag = useCallback(() => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
      setTagInput("");
    }
  }, [tagInput, formData.tags]);

  const removeTag = useCallback((tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag();
      }
    },
    [addTag]
  );

  // Handle loading and error states for the initial fetch
  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading article...</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        <div className="text-lg">{fetchError}</div>
      </div>
    );
  }

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Initializing editor...</div>
      </div>
    );
  }

  return (
    <div className="article-editor max-w-6xl space-y-6">
      {/* Header (No changes needed here, just ensure props are correct) */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {article ? "Edit Article" : "Create New Article"}
        </h1>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowImages(true)}
            disabled={isLoading}
          >
            Images
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
            disabled={isLoading}
          >
            <Eye className="w-4 h-4 mr-2" />

            {isPreview ? "Edit" : "Preview"}
          </Button>

          <Button
            variant="outline"
            onClick={handleSave}
            disabled={isLoading || !article?.title.trim()}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>

          <Button
            onClick={handlePublish}
            disabled={
              isLoading || !article?.title.trim() || !editor.getText().trim()
            }
          >
            <Send className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <Separator />

      {/* Article Metadata Card - Updated with consolidated state */}
      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Enter article title..."
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Excerpt</label>
            <Input
              name="excerpt"
              value={formData.excerpt}
              onChange={handleFormChange}
              placeholder="Brief description of the article..."
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Author Name
              </label>
              <Input
                name="authorName"
                value={formData.author.name}
                onChange={handleFormChange}
                placeholder="e.g., Jane Doe"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Author Avatar URL
              </label>
              <Input
                name="authorAvatar"
                value={formData.author.avatar}
                onChange={handleFormChange}
                placeholder="https://..."
                disabled={isLoading}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail</label>
            <Input
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleFormChange}
              placeholder="Put thumbnail image url"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                disabled={!tagInput.trim() || isLoading}
              >
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ImagesDrawer
        open={showImages}
        onOpenChange={setShowImages}
        folder="articles"
      />

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          {isPreview ? (
            <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto min-h-[400px] p-4 border rounded-lg">
              <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
            </div>
          ) : (
            <div className="border rounded-lg">
              <EditorToolbar editor={editor} />
              <EditorContent editor={editor} />
              {/* ## 4. CSS BEST PRACTICES NOTE ## */}
              {/*
                Best Practice Note:
                Embedding CSS with a <style> tag is generally discouraged.
                Consider moving these styles to a global CSS file or configuring
                the Tailwind Typography plugin (`prose`) in `tailwind.config.js`
                to apply these styles to the editor's output automatically.
              */}
              <style>{/* ... (your styles) */}</style>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ... (Status Information Card) */}
    </div>
  );
};

export default ArticleEditor;
