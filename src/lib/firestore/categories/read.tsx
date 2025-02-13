"use client";

import { db } from "@/lib/firebase";
import { collection, onSnapshot, DocumentData, QuerySnapshot } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";
import { SWRSubscriptionOptions } from "swr/subscription";

interface Category {
  name: string;
  slug: string;
  imageUrl?: string;
}

type SubscriptionCallback = (
  key: string[],
  { next }: SWRSubscriptionOptions<Category[] | null, Error>
) => () => void;

export function useCategories() {
  const { data, error } = useSWRSubscription<Category[] | null, Error>(
    ["categories"],
    (key, { next }) => {
      const [path] = key;
      const ref = collection(db, path);
      const unsub = onSnapshot(
        ref,
        (snapshot: QuerySnapshot<DocumentData>) =>
          next(
            null,
            snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((snap) => snap.data() as Category)
          ),
        (err: Error) => next(err, null)
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