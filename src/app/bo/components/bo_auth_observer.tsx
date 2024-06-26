"use client";

import type { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IBoAuthObserver {
   user: User | null;
}

export default function BoAuthObserver({ user }: IBoAuthObserver) {
   const router = useRouter();

   const session = useSession();

   useEffect(() => {
      router.refresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [session.status, !!user]);

   return true;
}
