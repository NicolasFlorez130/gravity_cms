"use client";

import { Button } from "~/components/landing/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

interface IPage {}

export default function Page({}: IPage) {
   const session = useSession();

   return (
      <div>
         {session.data?.user ? (
            <Button onClick={() => signOut()}>Sign Out</Button>
         ) : (
            <Button onClick={() => signIn("google")}>Sign In</Button>
         )}

         <div>
            <h1>{JSON.stringify(session.data)}</h1>
         </div>
      </div>
   );
}
