import BlogFeed from "./components/BlogFeed";
import CreateBlog from "./components/CreateBlog";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center">Welcome to My Blog</h1>
      <div className="flex justify-end mt-4">
        <CreateBlog />
      </div>
      <BlogFeed />
    </main>
  );
}
