"use client";

import useBasicCarousel from "~/lib/hooks/useBasicCarousel";
import Image from "next/image";
import { Fragment, useRef } from "react";
import type { IImage } from "~/types/images";

interface IIgCarousel {
   images: IImage[];
}

export default function IgCarousel({ images }: IIgCarousel) {
   const container = useRef<HTMLDivElement>(null);

   useBasicCarousel(container);

   function ImagesRow() {
      return (
         <div className="flex flex-1 gap-10 px-5 sm:gap-6 sm:px-3">
            {images.map(({ id, url }, i) => (
               <Fragment key={id}>
                  <div className="relative aspect-square w-screen flex-none sm:w-[calc(100vw/4)]">
                     <Image
                        alt={`instagram carousel image ${i + 1}`}
                        fill
                        src={url}
                        className="object-cover"
                     />
                  </div>
                  {i % 2 === 0 && (
                     <p className="rotate-180 text-center font-din_alt text-4xl font-bold text-black vertical-rl sm:text-2xl">
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
