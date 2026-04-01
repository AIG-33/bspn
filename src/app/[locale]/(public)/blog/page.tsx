import { PageHeader } from "@/components/sections/page-header";
import { getBlogPosts } from "@/lib/queries/blog";
import { BlogClient } from "./blog-client";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHeader
        title="Блог"
        description="Экспертные статьи, аналитика и практические руководства от специалистов БСПН"
      />
      <BlogClient initialData={posts} />
    </>
  );
}
