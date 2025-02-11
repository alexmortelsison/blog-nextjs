/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Loading from "./Loading";

interface Blog {
  id: string;
  title: string;
  overview: string;
  description: string;
  image: string;
  createdAt: string;
  author: {
    name: string;
    image: string;
  };
}

export default function BlogFeed() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-4">
        <Loading />
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Latest Blogs</h2>
      <div className="grid gap-6">
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-gray-600">{blog.overview}</p>
              <div className="flex items-center gap-2 mt-4">
                <img
                  src={blog.author.image || "/default-avatar.jpg"}
                  alt={blog.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-sm text-gray-700">By {blog.author.name}</p>
                <p className="text-muted-foreground text-sm">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
