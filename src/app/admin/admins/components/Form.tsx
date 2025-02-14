"use client";

import { getAdmin } from "@/lib/firestore/admins/read_server";
import { createNewAdmin, updateAdmin } from "@/lib/firestore/admins/write";
import { Button } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent, JSX } from "react";
import toast from "react-hot-toast";

// Define the Admin interface (adjust fields as needed)
interface Admin {
  id?: string;
  name: string;
  email: string;
  // add other properties if necessary
}

export default function Form(): JSX.Element {
  // Use Partial<Admin> to allow building the object incrementally
  const [data, setData] = useState<Partial<Admin> | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  const fetchData = async (): Promise<void> => {
    try {
      const res = await getAdmin({ id: id || "" });
      if (!res) {
        toast.error("Admin Not Found!");
      } else {
        setData(res);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  // Update the data state with a new key/value pair
  const handleData = (key: keyof Admin, value: string): void => {
    setData((prevData) => ({
      ...(prevData ?? {}),
      [key]: value,
    }));
  };

  const handleCreate = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (image) {
        await createNewAdmin({ data: data as Admin, image });
      } else {
        toast.error("Image is required");
      }
      toast.success("Successfully Created");
      setData(null);
      setImage(null);
    } catch (error: any) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const handleUpdate = async (): Promise<void> => {
    setIsLoading(true);
        try {
        if (image) {
            await createNewAdmin({ data: data as Admin, image });
            toast.success("Successfully Updated");
      } else {
        toast.error("Image is required");
      }
      toast.success("Successfully Created");
      setData(null);
      setImage(null);
      router.push(`/admin/admins`);
    } catch (error: any) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (id) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">{id ? "Update" : "Create"} Admin</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="admin-image" className="text-gray-500 text-sm">
            Image <span className="text-red-500">*</span>
          </label>
          {image && (
            <div className="flex justify-center items-center p-3">
              <img
                className="h-20"
                src={URL.createObjectURL(image)}
                alt="Admin Preview"
              />
            </div>
          )}
          <input
            onChange={handleImageChange}
            id="admin-image"
            name="admin-image"
            type="file"
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="admin-name" className="text-gray-500 text-sm">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="admin-name"
            name="admin-name"
            type="text"
            placeholder="Enter Name"
            value={data?.name ?? ""}
            onChange={(e) => handleData("name", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="admin-email" className="text-gray-500 text-sm">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="admin-email"
            name="admin-email"
            type="email"
            placeholder="Enter Email"
            value={data?.email ?? ""}
            onChange={(e) => handleData("email", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
            required
          />
        </div>
        <Button isLoading={isLoading} isDisabled={isLoading} type="submit">
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}
