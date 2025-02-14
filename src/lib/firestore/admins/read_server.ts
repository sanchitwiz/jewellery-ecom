import { db } from "@/lib/firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";

interface AdminData extends DocumentData {
  id: string;
  email: string;
  name: string;
  imageURL?: string;
  role?: string;
  permissions?: string[];
}

interface GetAdminProps {
  id: string;
}

export const getAdmin = async ({ id }: GetAdminProps): Promise<AdminData | null> => {
  try {
    const data = await getDoc(doc(db, `admins/${id}`));
    if (data.exists()) {
      return data.data() as AdminData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching admin:", error);
    throw error;
  }
};