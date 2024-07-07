"use client";

import Image from "next/image";
import PackageCard from "~/components/landing/ui/package_card";
import { useStore } from "~/lib/features/store";

interface IPackages {}

export default function Packages({}: IPackages) {
   const packages = useStore.use.packages();

   return (
      <section className="relative xl:grid xl:grid-cols-[2fr_5fr] xl:bg-bg_veil/80 xl:p-36">
         <div className="relative grid aspect-square w-full place-items-center bg-bg_veil/80 sm:aspect-[744/344] lg:aspect-[1024/344] xl:static xl:aspect-auto xl:bg-transparent">
            <h2 className="text-center font-epilogue text-5xl font-light text-white">
               Reserva tu <br className="hidden sm:block" /> vuelo aquí
            </h2>
            <Image
               alt="booking background"
               fill
               src="/backgrounds/packages_background.png"
               className="-z-10 object-cover"
            />
         </div>
         <div className="grid h-max gap-5 bg-background-dark px-3 py-10 sm:grid-cols-2 lg:px-36 xl:gap-14 xl:bg-transparent xl:px-0">
            {packages.map(
               pkg => pkg.active && <PackageCard key={pkg.id} pkg={pkg} />,
            )}
         </div>
      </section>
   );
}
