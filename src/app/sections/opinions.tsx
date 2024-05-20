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
      <section className="grid w-full gap-6 bg-muted py-10">
         <div
            ref={carouselContainer}
            className="flex max-w-full overflow-x-hidden"
         >
            {opinions.map((opinion, i) => (
               <div
                  key={i}
                  ref={el => {
                     carouselItems.current[i] = el;
                  }}
                  className="grid w-screen flex-none justify-items-center gap-6"
               >
                  <div className="relative aspect-square w-1/2 overflow-hidden rounded-full">
                     <Image
                        alt={`${opinion.names} picture`}
                        src={opinion.image}
                        fill
                        className="object-cover"
                     />
                  </div>
                  <p className="px-8 text-center text-xl font-medium text-muted-foreground">
                     {opinion.opinion}
                  </p>
                  <p className="text-2xl font-bold">{opinion.names}</p>
               </div>
            ))}
         </div>
         <div className="flex justify-center">
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
