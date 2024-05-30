"use client";

import useBasicCarousel from "~/lib/hooks/useBasicCarousel";
import Image from "next/image";
import { useRef } from "react";
import { type IImage } from "~/types/images";

interface IGalleryCarousel {
   images: IImage[];
}

export default function GalleryCarousel({ images }: IGalleryCarousel) {
   const container = useRef<HTMLDivElement>(null);

   useBasicCarousel(container);

   function ImagesRow() {
      return (
         <div className="flex">
            {images.map(({ id, url }) => (
               <div
                  key={id}
                  className="relative aspect-[35/27] w-screen flex-none sm:w-[calc(100vw/4)]"
               >
                  <Image
                     alt={`carousel image ${id}`}
                     fill
                     src={url}
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
            <ImagesRow />
            <ImagesRow />
         </div>
      </section>
   );
}
