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

interface Brands {
  id?: string;
  name: string;
  imageURL?: string;
  timestampCreate?: Timestamp;
  timestampUpdate?: Timestamp;
}

interface BrandsInput {
  data: Brands;
  image: File | null;
}

interface DeleteBrandInput {
  id: string;
}

export const createNewBrand = async ({ data, image }: BrandsInput): Promise<void> => {
  if (!image) {
    throw new Error("Image is Required");
  }
  if (!data?.name) {
    throw new Error("Name is required");
  }

  const newId = doc(collection(db, `ids`)).id; // this will generate an random id
  const imageRef = ref(storage, `brands/${newId}`);
  await uploadBytes(imageRef, image);
  const imageURL = await getDownloadURL(imageRef);

  await setDoc(doc(db, `brands/${newId}`), {
    ...data,
    id: newId,
    imageURL: imageURL,
    timestampCreate: Timestamp.now(),
  });
};
 

export const updateBrand = async ({ data, image }: BrandsInput): Promise<void> => {
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }

  const id = data?.id;
  let imageURL = data?.imageURL;

  if (image) {
    const imageRef = ref(storage, `brands/${id}`);
    await uploadBytes(imageRef, image);
    imageURL = await getDownloadURL(imageRef);
  }

  await updateDoc(doc(db, `brands/${id}`), {
    ...data,
    imageURL: imageURL,
    timestampUpdate: Timestamp.now(),
  });
};

export const deleteBrand = async ({ id }: DeleteBrandInput): Promise<void> => {
  if (!id) {
    throw new Error("ID is required");
  }
  await deleteDoc(doc(db, `brands/${id}`));
};