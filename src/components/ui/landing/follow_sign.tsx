"use client";

interface IFollowSign {}

export default function FollowSign({}: IFollowSign) {
   return (
      <div className="flex w-full items-center justify-center bg-primary px-4 py-6">
         <p className="tracking-din text-center font-din font-bold text-primary-foreground">
            SÍGUENOS EN NUESTRAS REDES SOCIALES
         </p>
      </div>
   );
}
