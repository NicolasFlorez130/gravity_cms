"use client";

import { Button } from "~/components/landing/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Card } from "~/components/landing/ui/card";
import Logo from "~/components/landing/ui/logo";

interface IPage {}

export default function Page({}: IPage) {
   return (
      <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center gap-24">
         <Logo className="scale-150" />
         <Card className="z-10 grid w-1/3 justify-items-center gap-12 border-bg_accordion bg-bg_accordion p-12">
            <div className="grid justify-items-center gap-4 font-din font-bold">
               <h1 className="text-4xl text-primary">Bienvenido de nuevo</h1>
               <p className="text-2xl text-gray-300">
                  Inicia sesión con tu cuenta de Google
               </p>
            </div>
            <Button
               className="w-max border-muted bg-muted px-18"
               onClick={() => signIn("google")}
            >
               LOGIN
            </Button>
         </Card>
         <div className="fixed aspect-square h-screen opacity-5">
            <Image
               src="/backgrounds/login_background.png"
               alt="auth background"
               fill
            />
         </div>
      </div>
   );
}
