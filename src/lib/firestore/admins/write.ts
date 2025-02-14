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

interface AdminData {
  id: string;
  name: string;
  email: string;
  imageURL?: string;
  timestampCreate?: Timestamp;
  timestampUpdate?: Timestamp;
  [key: string]: any; // For additional flexible fields
}

interface CreateAdminInput {
  data: Omit<AdminData, 'id' | 'imageURL' | 'timestampCreate' | 'timestampUpdate'>;
  image: File;
}

interface UpdateAdminInput {
  data: AdminData;
  image?: File;
}

interface DeleteAdminInput {
  id: string;
}

export const createNewAdmin = async ({ data, image }: CreateAdminInput): Promise<void> => {
  if (!image) {
    throw new Error("Image is Required");
  }
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.email) {
    throw new Error("Email is required");
  }

  try {
    const newId = data.email;

    const imageRef = ref(storage, `admins/${newId}`);
    await uploadBytes(imageRef, image);
    const imageURL = await getDownloadURL(imageRef);

    await setDoc(doc(db, `admins/${newId}`), {
      ...data,
      id: newId,
      imageURL,
      timestampCreate: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

export const updateAdmin = async ({ data, image }: UpdateAdminInput): Promise<void> => {
  if (!data?.name) {
    throw new Error("Name is required");
  }
  if (!data?.id) {
    throw new Error("ID is required");
  }
  if (!data?.email) {
    throw new Error("Email is required");
  }

  try {
    const id = data.id;
    let imageURL = data.imageURL;

    if (image) {
      const imageRef = ref(storage, `admins/${id}`);
      await uploadBytes(imageRef, image);
      imageURL = await getDownloadURL(imageRef);
    }

    if (id === data.email) {
      await updateDoc(doc(db, `admins/${id}`), {
        ...data,
        imageURL,
        timestampUpdate: Timestamp.now(),
      });
    } else {
      const newId = data.email;

      await deleteDoc(doc(db, `admins/${id}`));

      await setDoc(doc(db, `admins/${newId}`), {
        ...data,
        id: newId,
        imageURL,
        timestampUpdate: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error;
  }
};

export const deleteAdmin = async ({ id }: DeleteAdminInput): Promise<void> => {
  if (!id) {
    throw new Error("ID is required");
  }
  
  try {
    await deleteDoc(doc(db, `admins/${id}`));
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};