"use client";

import { Button } from "~/components/ui/landing/button";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { useMediaQuery } from "usehooks-ts";

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
      image: "https://placedog.net/400/401?random",
   },
   {
      names: "Luis Perez 2",
      opinion: `
      Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit, 
      sed do eiusmod tempor 
      incididunt ut labore et dolore 
      `,
      image: "https://placedog.net/400/402?random",
   },
   {
      names: "Luis Perez 3",
      opinion: `
      Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit, 
      sed do eiusmod tempor 
      incididunt ut labore et dolore 
      `,
      image: "https://placedog.net/400/403?random",
   },
   {
      names: "Luis Perez 4",
      opinion: `
      Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit, 
      sed do eiusmod tempor 
      incididunt ut labore et dolore 
      `,
      image: "https://placedog.net/400/404?random",
   },
   {
      names: "Luis Perez 5",
      opinion: `
      Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit, 
      sed do eiusmod tempor 
      incididunt ut labore et dolore 
      `,
      image: "https://placedog.net/400/405?random",
   },
];

export default function Opinions({}: IOpinions) {
   const isXL = useMediaQuery("(min-width: 1280px)");

   const [currentOpinion, setCurrentOpinion] = useState(
      !!opinions.length ? 0 : undefined,
   );

   const carouselContainer = useRef<HTMLDivElement>(null);
   const carouselItems = useRef([] as (HTMLDivElement | null)[]);

   const [isScrolling, startScrolling] = useTransition();

   useEffect(() => {
      gsap.registerPlugin(ScrollToPlugin);
   }, []);

   useEffect(() => {
      if (typeof currentOpinion !== "number") return;

      if (isXL) {
         startScrolling(
            () =>
               new Promise(res => {
                  gsap
                     .timeline({
                        onComplete: res,
                     })
                     .to(".opinion_text", {
                        ease: "power3.in",
                        width: 0,
                        duration: 0.3,
                     })
                     .to("#opinions_carousel_container", {
                        ease: "power3.out",
                        duration: 0.2,
                        scrollTo: {
                           x: `#opinion_${currentOpinion}`,
                        },
                     })
                     .to(`#opinion_${currentOpinion} .opinion_text`, {
                        ease: "bounce.out",
                        width: "auto",
                        duration: 0.4,
                     });
               }),
         );
      } else {
         carouselContainer.current?.scrollTo({
            left: carouselItems.current.at(currentOpinion)?.offsetLeft,
            behavior: "smooth",
         });
      }
   }, [currentOpinion, isXL]);

   return (
      <section className="grid w-full gap-6 bg-muted py-10 sm:grid-cols-[1fr_auto] xl:grid-cols-1 xl:justify-items-start xl:py-14">
         <div
            id="opinions_carousel_container"
            ref={carouselContainer}
            className="flex w-full overflow-x-hidden xl:gap-10"
         >
            {opinions.map((opinion, i) => (
               <div
                  key={i}
                  id={`opinion_${i}`}
                  ref={el => {
                     carouselItems.current[i] = el;
                  }}
                  className="opinions grid w-full flex-none items-center justify-items-center gap-6 overflow-hidden transition-all sm:grid-cols-[1fr_2fr] sm:pl-4 xl:w-auto xl:grid-cols-[1fr_auto] xl:gap-0"
               >
                  <div className="relative z-10 bg-muted">
                     <div className="relative aspect-square w-1/2 max-w-screen-sm overflow-hidden rounded-full sm:w-full xl:w-[calc(100vw/6)]">
                        <Image
                           alt={`${opinion.names} picture`}
                           src={opinion.image}
                           fill
                           className="object-cover"
                        />
                     </div>
                  </div>
                  <div className="opinion_text w-auto">
                     <div className="relative z-0 grid max-w-screen-xl place-items-center gap-6 overflow-hidden lg:w-1/2 xl:ml-10 xl:w-[calc(100vw/3)] xl:place-items-start">
                        <p className="px-8 text-center text-xl font-medium text-muted-foreground xl:px-0 xl:text-start xl:text-4xl">
                           {opinion.opinion}
                        </p>
                        <p className="text-2xl font-bold xl:text-start">
                           {opinion.names}
                        </p>
                     </div>
                  </div>
               </div>
            ))}
            <div className="relative w-[100vw] flex-none" />
         </div>
         <div className="flex justify-center sm:pr-4 xl:ml-[calc(min(26rem,100vw/6)+3.5rem)]">
            <Button
               disabled={!opinions.length || isScrolling}
               onClick={() =>
                  setCurrentOpinion(prev =>
                     prev !== undefined
                        ? prev === 0
                           ? opinions.length - 1
                           : prev - 1
                        : undefined,
                  )
               }
               className="h-max border-none p-0 disabled:text-background"
            >
               <ArrowLeft size={48} />
            </Button>
            <Button
               disabled={!opinions.length || isScrolling}
               onClick={() =>
                  setCurrentOpinion(prev =>
                     prev !== undefined
                        ? prev >= opinions.length - 1
                           ? 0
                           : prev + 1
                        : undefined,
                  )
               }
               className="h-max border-none p-0 disabled:text-background"
            >
               <ArrowRight size={48} />
            </Button>
         </div>
      </section>
   );
}
