"use client";

import { useCategories } from "@/lib/firestore/categories/read";
import { deleteCategory } from "@/lib/firestore/categories/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
  imageURL: string;
}

export default function ListView(): JSX.Element {
  const { data: categories, error, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }
  
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex-1 flex flex-col gap-3 md:pr-5 md:px-0 px-5 rounded-xl">
      <h1 className="text-xl font-semibold">Categories</h1>
      <table className="border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="font-semibold border-y bg-white px-3 py-2 border-l rounded-l-lg">SN</th>
            <th className="font-semibold border-y bg-white px-3 py-2">Image</th>
            <th className="font-semibold border-y bg-white px-3 py-2 text-left">Name</th>
            <th className="font-semibold border-y bg-white px-3 py-2 border-r rounded-r-lg text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item: Category, index: number) => (
            <Row key={item.id} item={item} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface RowProps {
  item: Category;
  index: number;
}

function Row({ item, index }: RowProps): JSX.Element {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    setIsDeleting(true);
    try {
      await deleteCategory({ id: item.id });
      toast.success("Successfully Deleted");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = () => {
    router.push(`/admin/categories?id=${item.id}`);
  };

  return (
    <tr>
      <td className="border-y bg-white px-3 py-2 border-l rounded-l-lg text-center">
        {index + 1}
      </td>
      <td className="border-y bg-white px-3 py-2 text-center">
        <div className="flex justify-center">
          <img className="h-10 w-10 object-cover rounded-md" src={item.imageURL} alt={item.name} />
        </div>
      </td>
      <td className="border-y bg-white px-3 py-2">{item.name}</td>
      <td className="border-y bg-white px-3 py-2 border-r rounded-r-lg">
        <div className="flex gap-2 items-center">
          <Button
            onClick={handleUpdate}
            isDisabled={isDeleting}
            isIconOnly
            size="sm"
          >
            <Edit2 size={13} />
          </Button>
          <Button
            onClick={handleDelete}
            isLoading={isDeleting}
            isDisabled={isDeleting}
            isIconOnly
            size="sm"
            color="danger"
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
