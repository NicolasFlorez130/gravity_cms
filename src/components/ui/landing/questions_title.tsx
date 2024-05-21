"use client";

import useBasicCarousel from "@/lib/hooks/useBasicCarousel";
import { useGSAP } from "@gsap/react";
import { Question } from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";

interface IQuestionsTitle {}

export default function QuestionsTitle({}: IQuestionsTitle) {
   const container = useRef<HTMLDivElement>(null);

   useBasicCarousel(container);

   function TextsRow() {
      return (
         <div className="flex gap-10 px-5 text-4xl text-primary">
            <Question size={40} className="text-white" />
            <p>Tienes preguntas</p>
            <p className="font-black italic">Gravity</p>
            <p>Las respuestas</p>
         </div>
      );
   }

   return (
      <section className="w-full overflow-x-hidden py-1">
         <div ref={container} className="relative left-0 flex w-max">
            <TextsRow />
            <TextsRow />
            <TextsRow />
            <TextsRow />
         </div>
      </section>
   );
}
