"use client";

import { getCategory } from "@/lib/firestore/categories/read_server.jsx";
import { createNewCategory, updateCategory } from "@/lib/firestore/categories/write.jsx";
import { Button } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Category {
  name: string;
  slug: string;
}

const initialCategory: Category = {
  name: "",
  slug: "",
};

export default function Form(): JSX.Element {
  const [data, setData] = useState<Category>(initialCategory);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || undefined;

  const fetchData = async () => {
    try {
      const res = await getCategory({ id: id ?? "" });
      if (!res) {
        toast.error("Category Not Found!");
      } else {
        setData(res);
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleData = (key: keyof Category, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      await createNewCategory({ data, image });
      toast.success("Successfully Created");
      setData(initialCategory);
      setImage(null);
    } catch (error: any) {
      toast.error(error?.message || "Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await updateCategory({ data, image });
      toast.success("Successfully Updated");
      setData(initialCategory);
      setImage(null);
      router.push(`/admin/categories`);
    } catch (error: any) {
      toast.error(error?.message || "Failed to update category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">{id ? "Update" : "Create"} Category</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          id ? handleUpdate() : handleCreate();
        }}
        className="flex flex-col gap-3"
      >
        {/* Image Upload */}
        <div className="flex flex-col gap-1">
          <label htmlFor="category-image" className="text-gray-500 text-sm">
            Image <span className="text-red-500">*</span>
          </label>
          {image && (
            <div className="flex justify-center items-center p-3">
              <img className="h-20" src={URL.createObjectURL(image)} alt="Category" />
            </div>
          )}
          <input
            id="category-image"
            name="category-image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>

        {/* Name Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="category-name" className="text-gray-500 text-sm">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="category-name"
            name="category-name"
            type="text"
            placeholder="Enter Name"
            value={data.name}
            onChange={(e) => handleData("name", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>

        {/* Slug Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="category-slug" className="text-gray-500 text-sm">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            id="category-slug"
            name="category-slug"
            type="text"
            placeholder="Enter Slug"
            value={data.slug}
            onChange={(e) => handleData("slug", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <Button isLoading={isLoading} isDisabled={isLoading} type="submit">
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}