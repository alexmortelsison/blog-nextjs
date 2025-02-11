import BlogFeed from "./components/BlogFeed";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center">Welcome to My Blog</h1>
      <BlogFeed />
    </main>
  );
}
