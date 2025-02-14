"use client";

import { db } from "@/lib/firebase";
import { collection, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

export function useBrands() {
  const { data, error } = useSWRSubscription<DocumentData[] | null>(
    ["brands"],
    (key: string, { next }: { next: (error: Error | null, data: DocumentData[] | null) => void }) => {
      const path = "brands";
      const ref = collection(db, path);
      const unsub = onSnapshot(
        ref,
        (snapshot: QuerySnapshot<DocumentData>) =>
          next(
            null,
            snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((snap) => snap.data())
          ),
        (err) => next(err, null)
      );
      return () => unsub();
    }
  );

  return { data, error: error?.message, isLoading: data === undefined };
}