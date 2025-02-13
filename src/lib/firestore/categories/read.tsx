"use client";

import { db } from "@/lib/firebase";
import { collection, onSnapshot, DocumentData, QuerySnapshot } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

interface Category {
  name: string;
  slug: string;
  imageUrl?: string;
}

export function useCategories() {
  const { data, error } = useSWRSubscription<Category[] | null, Error>(
    ["categories"],
    ([path], { next }) => {
      const ref = collection(db, path);
      const unsub = onSnapshot<DocumentData>(
        ref,
        (snapshot: QuerySnapshot<DocumentData>) => {
          try {
            const categories = snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((doc) => {
                  const data = doc.data();
                  // Validate required fields
                  if (!data.name || !data.slug) {
                    throw new Error('Invalid category document structure');
                  }
                  return data as Category;
                });
            next(null, categories);
          } catch (error) {
            next(error instanceof Error ? error : new Error('Unknown error'), null);
          }
        },
        (error) => next(error instanceof Error ? error : new Error('Unknown error'), null)
      );
      return () => unsub();
    }
  );

  return { 
    data, 
    error: error?.message, 
    isLoading: data === undefined 
  };
}