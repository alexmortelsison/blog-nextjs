/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Blog {
  id: string;
  title: string;
  overview: string;
  description: string;
  imageUrl: string;
}

export default function BlogFeed({ refresh }: { refresh: boolean }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    setBlogs(await res.json());
  };

  useEffect(() => {
    fetchBlogs();
  }, [refresh]); // Re-fetch when `refresh` changes

  return (
    <div className="max-w-4xl mx-auto mt-6">
      {blogs.length ? (
        blogs.map((blog) => (
          <Card key={blog.id} className="border border-gray-700 bg-gray-900">
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{blog.overview}</p>
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover mt-2 rounded-lg"
              />
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-400">No blogs available.</p>
      )}
    </div>
  );
}
