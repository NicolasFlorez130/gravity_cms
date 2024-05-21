"use client";

import useBasicCarousel from "@/lib/hooks/useBasicCarousel";
import Image from "next/image";
import { useRef } from "react";

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

interface IGalleryCarousel {}

export default function GalleryCarousel({}: IGalleryCarousel) {
   const container = useRef<HTMLDivElement>(null);

   useBasicCarousel(container);

   function ImagesRow() {
      return (
         <div className="flex">
            {images.map((img, i) => (
               <div
                  key={i}
                  className="relative aspect-[35/27] w-screen flex-none sm:w-[calc(100vw/3)]"
               >
                  <Image
                     alt={`carousel image ${i + 1}`}
                     fill
                     src={img}
                     className="object-cover"
                  />
               </div>
            ))}
         </div>
      );
   }

   return (
      <section className="w-full overflow-hidden">
         <div ref={container} className="relative left-0 flex w-max">
            <ImagesRow />
            <ImagesRow />
         </div>
      </section>
   );
}
