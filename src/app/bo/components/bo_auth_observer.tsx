"use client";

import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IBoAuthObserver {
   serverSession: Session | null;
}

export default function BoAuthObserver({ serverSession }: IBoAuthObserver) {
   const router = useRouter();

   const session = useSession();

   useEffect(() => {
      router.refresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [session.status, !!serverSession]);

   return true;
}
