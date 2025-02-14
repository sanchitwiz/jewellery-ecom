import { db, storage } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface Category {
  id?: string;
  name: string;
  slug: string;
  imageURL?: string;
  timestampCreate?: Timestamp;
  timestampUpdate?: Timestamp;
}

interface CategoryInput {
  data: Category;
  image: File | null;
}

interface DeleteCategoryInput {
  id: string;
}

export const createNewCategory = async ({ data, image }: CategoryInput): Promise<void> => {
  if (!image) {
    throw new Error("Image is Required");
  }
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.slug) {
    throw new Error("Slug is required");
  }

  const newId = doc(collection(db, `ids`)).id; // this will generate an random id
  const imageRef = ref(storage, `categories/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);

  await setDoc(doc(db, `categories/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
};

export const updateCategory = async ({ data, image }: CategoryInput): Promise<void> => {
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.slug) {
    throw new Error("Slug is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  const id = data?.id;
  let imageURL = data?.imageURL;

  if (image) {
    const imageRef = ref(storage, `categories/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  await updateDoc(doc(db, `categories/${id}`), {
    ...data,
    imageURL: imageURL,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteCategory = async ({ id }: DeleteCategoryInput): Promise<void> => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `categories/${id}`));
};