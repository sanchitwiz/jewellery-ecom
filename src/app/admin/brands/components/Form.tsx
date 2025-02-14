"use client";

import { getBrand } from "@/lib/firestore/brands/read_server";
import { createNewBrand, updateBrand } from "@/lib/firestore/brands/write";
import { Button } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface Brand {
  id?: string;
  name: string;
  imageUrl?: string;
  // Add other brand properties as needed
}

export default function Form() {
  const [data, setData] = useState<Partial<Brand> | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const fetchData = async () => {
    if (!id) return;
    
    try {
      const res = await getBrand({ id });
      if (!res) {
        toast.error("Brand Not Found!");
      } else {
        setData(res);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleData = <K extends keyof Brand>(key: K, value: Brand[K]) => {
    setData((prevData) => ({
      ...(prevData ?? {}),
      [key]: value,
    }));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      if (!data) throw new Error("No data provided");
      await createNewBrand({ data: data as Brand, image });
      toast.success("Successfully Created");
      setData(null);
      setImage(null);
    } catch (error) {
      toast.error((error as Error).message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      if (!data?.id) throw new Error("No brand ID provided");
      await updateBrand({ data: data as Brand, image });
      toast.success("Successfully Updated");
      setData(null);
      setImage(null);
      router.push(`/admin/brands`);
    } catch (error) {
      toast.error((error as Error).message);
    }
    setIsLoading(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    id ? handleUpdate() : handleCreate();
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">{id ? "Update" : "Create"} Brand</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="brand-name" className="text-gray-500 text-sm">
            Image <span className="text-red-500">*</span>
          </label>
          {image && (
            <div className="flex justify-center items-center p-3">
              <img className="h-20" src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
          <input
            onChange={handleFileChange}
            id="brand-image"
            name="brand-image"
            type="file"
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="brand-name" className="text-gray-500 text-sm">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="brand-name"
            name="brand-name"
            type="text"
            placeholder="Enter Name"
            value={data?.name ?? ""}
            onChange={(e) => handleData("name", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>
        <Button isLoading={isLoading} isDisabled={isLoading} type="submit">
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}