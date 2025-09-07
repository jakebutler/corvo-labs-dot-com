import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      // Blog posts (MDX)
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blog",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "string", name: "excerpt", label: "Excerpt" },
          { type: "string", name: "author", label: "Author" },
          { type: "string", name: "tags", label: "Tags", list: true },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
            description: "Optional cover image for listings and headers. Uploads go to public/ by default.",
          },
          { 
            type: "boolean", 
            name: "published", 
            label: "Published", 
            description: "Set to true to publish this post, false to keep as draft",
            ui: {
              component: "toggle"
            }
          },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
      },
      // Project metadata (JSON)
      {
        name: "project_metadata",
        label: "Project Metadata",
        path: "src/content/projects",
        format: "json",
        match: {
          exclude: "projects.json"
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "slug", label: "Slug" },
          { type: "string", name: "category", label: "Category" },
          { type: "string", name: "status", label: "Status" },
          { type: "string", name: "tech", label: "Tech Stack", list: true },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "string", name: "description", label: "Description" },
          { type: "number", name: "priority", label: "Priority" },
          { type: "string", name: "heroImage", label: "Hero Image" },
          { type: "string", name: "links", label: "Links", list: true },
        ],
      },
      // Project MDX content
      {
        name: "project_content",
        label: "Project Content",
        path: "src/content/projects",
        format: "mdx",
        match: {
          exclude: "projects.json"
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
        ui: {
          router: ({ document }) => `/projects/${document._sys.filename}`,
        },
      },
    ],
  },
});
