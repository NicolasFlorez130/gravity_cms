"use client";

interface IFollowSign {}

export default function FollowSign({}: IFollowSign) {
   return (
      <div className="hidden lg:flex w-full items-center justify-center bg-primary px-4 py-5">
         <p className="text-center font-din font-bold tracking-din text-primary-foreground xl:text-2xl">
            Síguenos IG: @gravitytunnel - FB: gravitytunnel -
            TikTok:gravity.tunnel
         </p>
      </div>
   );
}
