import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// Define Category interface
interface Brands {
  id?: string;
  name: string;
  imageUrl?: string;
}

// Define parameter type for getCategory
interface GetBrandParams {
  id: string;
}

export const getBrand = async ({ id }: GetBrandParams): Promise<Brands | null> => {
  const docRef = doc(db, "brands", id);
  const snapshot = await getDoc(docRef);
  
  if (snapshot.exists()) {
    return {
      id: snapshot.id,
      ...snapshot.data()
    } as Brands;
  }
  return null;
};


export const getBrands = async (): Promise<Brands[]> => {
  const collectionRef = collection(db, "brands");
  const snapshot = await getDocs(collectionRef);
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }) as Brands);
};