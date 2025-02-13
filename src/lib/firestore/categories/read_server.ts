import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// Define Category interface
interface Category {
  id?: string;
  name: string;
  slug: string;
  imageUrl?: string;
}

// Define parameter type for getCategory
interface GetCategoryParams {
  id: string;
}

export const getCategory = async ({ id }: GetCategoryParams): Promise<Category | null> => {
  const docRef = doc(db, "categories", id);
  const snapshot = await getDoc(docRef);
  
  if (snapshot.exists()) {
    return {
      id: snapshot.id,
      ...snapshot.data()
    } as Category;
  }
  return null;
};

export const getCategories = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const snapshot = await getDocs(collectionRef);
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }) as Category);
};