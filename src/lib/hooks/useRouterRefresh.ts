import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function useRouterRefresh() {
   const router = useRouter();
   const [isPending, startTransition] = useTransition();

   const [resolve, setResolve] = useState<((value: unknown) => void) | null>(
      null,
   );
   const [isRefreshing, setIsRefreshing] = useState(false);

   const refresh = () =>
      new Promise(res => {
         setResolve(() => res);
         startTransition(() => {
            router.refresh();
         });
      });

   useEffect(() => {
      if (isRefreshing && !isPending) {
         if (resolve) {
            resolve(null);

            setIsRefreshing(false);
            setResolve(null);
         }
      }
      if (isPending) {
         setIsRefreshing(true);
      }
   }, [isRefreshing, isPending, resolve]);

   return { refresh, isRefreshing };
}
