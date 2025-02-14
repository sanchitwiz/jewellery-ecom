"use client";

import { db } from "@/lib/firebase";
import { collection, doc, onSnapshot, DocumentData } from "firebase/firestore";
import useSWRSubscription from "swr/subscription";

interface AdminData extends DocumentData {
  email: string;
  name?: string;
  role?: string;
  permissions?: string[];
}

// Type for the subscription handler return
type SubscriptionReturn = {
  data: AdminData[] | null;
  error: string | undefined;
  isLoading: boolean;
};

type SingleAdminReturn = {
  data: AdminData | null;
  error: string | undefined;
  isLoading: boolean;
};

export function useAdmins(): SubscriptionReturn {
  const { data, error } = useSWRSubscription(
    ["admins"],
    ([path]: [string], { next }: { next: (error: Error | null, data: AdminData[] | null) => void }) => {
      const ref = collection(db, path);
      
      const unsub = onSnapshot(
        ref,
        (snapshot) => {
          next(
            null,
            snapshot.docs.length === 0
              ? null
              : snapshot.docs.map((snap) => snap.data() as AdminData)
          );
        },
        (err: Error) => next(err, null)
      );

      return () => unsub();
    }
  );

  return {
    data: data as AdminData[] | null,
    error: error?.message,
    isLoading: data === undefined,
  };
}

interface UseAdminProps {
  email: string;
}

export function useAdmin({ email }: UseAdminProps): SingleAdminReturn {
  const { data, error } = useSWRSubscription(
    ["admins", email],
    ([path, email]: [string, string], { next }: { next: (error: Error | null, data: AdminData | null) => void }) => {
      const ref = doc(db, `admins/${email}`);
      
      const unsub = onSnapshot(
        ref,
        (snapshot) => {
          next(null, snapshot.exists() ? (snapshot.data() as AdminData) : null);
        },
        (err: Error) => next(err, null)
      );

      return () => unsub();
    }
  );

  return {
    data: data as AdminData | null,
    error: error?.message,
    isLoading: data === undefined,
  };
}