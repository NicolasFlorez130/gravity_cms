"use client";

import useBasicCarousel from "@/lib/hooks/useBasicCarousel";
import Image from "next/image";
import { Fragment, useRef } from "react";

const images = [
   "https://placedog.net/400/400?random",
   "https://placedog.net/300/300?random",
   "https://placedog.net/500/500?random",
   "https://placedog.net/600/600?random",
   "https://placedog.net/700/700?random",
   "https://placedog.net/800/800?random",
   "https://placedog.net/900/900?random",
   "https://placedog.net/1000/1000?random",
];

interface IIgCarousel {}

export default function IgCarousel({}: IIgCarousel) {
   const container = useRef<HTMLDivElement>(null);

   useBasicCarousel(container);

   function ImagesRow() {
      return (
         <div className="flex flex-1 gap-10 px-5 sm:gap-6 sm:px-3">
            {images.map((img, i) => (
               <Fragment key={i}>
                  <div className="relative aspect-square w-screen flex-none sm:w-[calc(100vw/4)]">
                     <Image
                        alt={`carousel image ${i + 1}`}
                        fill
                        src={img}
                        className="object-cover"
                     />
                  </div>
                  {i % 2 === 0 && (
                     <p className="vertical-rl font-din_alt rotate-180 text-center text-4xl font-bold text-black sm:text-2xl">
                        @gravitytunnel
                     </p>
                  )}
               </Fragment>
            ))}
         </div>
      );
   }

   return (
      <section className="w-full overflow-hidden bg-primary py-10 sm:py-6">
         <div ref={container} className="relative left-0 flex w-max">
            <ImagesRow />
            <ImagesRow />
            <ImagesRow />
            <ImagesRow />
         </div>
      </section>
   );
}
