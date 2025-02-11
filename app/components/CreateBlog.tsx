"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea"; // ✅ Added for description
import { toast } from "sonner";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fixed: Each function updates the correct state
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleOverviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOverview(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!title || !overview || !description || !image) {
      toast.error("All fields are required!");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("overview", overview);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        toast.success("Blog created successfully!");
        setTitle("");
        setOverview("");
        setDescription("");
        setImage(null);
      } else {
        toast.error("Failed to create blog.");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="font-semibold">Create a blog +</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex justify-center items-center font-bold text-xl pb-4">
          Write your blog
        </DialogHeader>
        <Separator />
        <DialogTitle>
          <p className="pb-4">Title</p>
          <Input value={title} onChange={handleTitleChange} />
        </DialogTitle>
        <DialogTitle className="pt-4">
          <p className="pb-4">Overview</p>
          <Input value={overview} onChange={handleOverviewChange} />
        </DialogTitle>
        <DialogTitle className="pt-4">
          <p className="pb-4">Description</p>
          <Textarea
            className="h-[150px] w-full"
            value={description}
            onChange={handleDescriptionChange}
          />
        </DialogTitle>
        <DialogTitle className="pt-4">
          <p className="pb-4">Image</p>
          <Input type="file" onChange={handleImageChange} />
        </DialogTitle>

        {/* ✅ Fixed: Calls handleSubmit on click */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="font-semibold"
          >
            {loading ? "Publishing..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
