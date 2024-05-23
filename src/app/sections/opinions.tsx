"use client";

import { Button } from "@/components/ui/landing/button";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface IOpinions {}

const opinions = [
   {
      names: "Luis Perez",
      opinion: `
      Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit, 
      sed do eiusmod tempor 
      incididunt ut labore et dolore 
      `,
      image: "https://placedog.net/400/400?random",
   },
   {
      names: "Luis Perez 2",
      opinion: `
      Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit, 
      sed do eiusmod tempor 
      incididunt ut labore et dolore 
      `,
      image: "https://placedog.net/400/400?random",
   },
   {
      names: "Luis Perez 3",
      opinion: `
      Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit, 
      sed do eiusmod tempor 
      incididunt ut labore et dolore 
      `,
      image: "https://placedog.net/400/400?random",
   },
   {
      names: "Luis Perez 4",
      opinion: `
      Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit, 
      sed do eiusmod tempor 
      incididunt ut labore et dolore 
      `,
      image: "https://placedog.net/400/400?random",
   },
   {
      names: "Luis Perez 5",
      opinion: `
      Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit, 
      sed do eiusmod tempor 
      incididunt ut labore et dolore 
      `,
      image: "https://placedog.net/400/400?random",
   },
];

export default function Opinions({}: IOpinions) {
   const [currentOpinion, setCurrentOpinion] = useState(
      !!opinions.length ? 0 : undefined,
   );

   const carouselContainer = useRef<HTMLDivElement>(null);
   const carouselItems = useRef([] as (HTMLDivElement | null)[]);

   useEffect(() => {
      if (typeof currentOpinion !== "number") return;

      carouselContainer.current?.scrollTo({
         left: carouselItems.current.at(currentOpinion)?.offsetLeft,
         behavior: "smooth",
      });
   }, [currentOpinion]);

   return (
      <section className="grid w-full gap-6 bg-muted py-10 sm:grid-cols-[1fr_auto] xl:grid-cols-1 xl:justify-items-start xl:py-14">
         <div
            ref={carouselContainer}
            className="flex w-full overflow-x-hidden xl:gap-10"
         >
            {opinions.map((opinion, i) => (
               <div
                  key={i}
                  ref={el => {
                     carouselItems.current[i] = el;
                  }}
                  className="grid w-full flex-none items-center justify-items-center gap-6 sm:grid-cols-[1fr_2fr] sm:pl-4 xl:w-auto xl:grid-cols-[1fr_0px]"
               >
                  <div className="relative aspect-square w-1/2 overflow-hidden rounded-full sm:w-full xl:w-[calc(100vw/4)]">
                     <Image
                        alt={`${opinion.names} picture`}
                        src={opinion.image}
                        fill
                        className="object-cover"
                     />
                  </div>
                  <div className="grid place-items-center gap-6 overflow-hidden lg:w-1/2">
                     <p className="px-8 text-center text-xl font-medium text-muted-foreground xl:px-0 xl:text-start xl:text-4xl">
                        {opinion.opinion}
                     </p>
                     <p className="text-2xl font-bold xl:text-start">
                        {opinion.names}
                     </p>
                  </div>
               </div>
            ))}
            <div className="relative w-[100vw] flex-none" />
         </div>
         <div className="flex justify-center sm:pr-4 xl:pl-6">
            <Button
               disabled={currentOpinion === 0 || !opinions.length}
               onClick={() =>
                  setCurrentOpinion(prev =>
                     prev !== undefined ? prev - 1 : undefined,
                  )
               }
               className="h-max border-none p-0"
            >
               <ArrowLeft size={48} />
            </Button>
            <Button
               disabled={
                  (currentOpinion && currentOpinion >= opinions.length - 1) ||
                  !opinions.length
               }
               onClick={() =>
                  setCurrentOpinion(prev =>
                     prev !== undefined ? prev + 1 : undefined,
                  )
               }
               className="h-max border-none p-0"
            >
               <ArrowRight size={48} />
            </Button>
         </div>
      </section>
   );
}
