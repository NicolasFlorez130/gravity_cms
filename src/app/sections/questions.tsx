"use client";

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import QuestionsTitle from "@/components/ui/landing/questions_title";

const questions = [
   {
      question: "Cuánto tiempo dura un vuelo",
      answer: `
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident nam
         iure ad minus pariatur voluptatem vel, possimus error perferendis vero
         quo magnam. Id veniam ad maxime! Quia optio explicabo itaque!
      `,
   },
   {
      question: "Siempre hay un instructor presente en la cabina de vuelo",
      answer: `
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident nam
         iure ad minus pariatur voluptatem vel, possimus error perferendis vero
         quo magnam. Id veniam ad maxime! Quia optio explicabo itaque!
      `,
   },
   {
      question: "Equipo y traje de seguridad durante el vuelo",
      answer: `
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident nam
         iure ad minus pariatur voluptatem vel, possimus error perferendis vero
         quo magnam. Id veniam ad maxime! Quia optio explicabo itaque!
      `,
   },
   {
      question: "Para cancelar una reserva",
      answer: `
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident nam
         iure ad minus pariatur voluptatem vel, possimus error perferendis vero
         quo magnam. Id veniam ad maxime! Quia optio explicabo itaque!
      `,
   },
   {
      question: "Tenemos un reglamento que debes seguir",
      answer: `
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident nam
         iure ad minus pariatur voluptatem vel, possimus error perferendis vero
         quo magnam. Id veniam ad maxime! Quia optio explicabo itaque!
      `,
   },
   {
      question: "Entiende el funcionamiento del túnel",
      answer: `
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident nam
         iure ad minus pariatur voluptatem vel, possimus error perferendis vero
         quo magnam. Id veniam ad maxime! Quia optio explicabo itaque!
      `,
   },
   {
      question: "Los niños también pueden volar",
      answer: `
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident nam
         iure ad minus pariatur voluptatem vel, possimus error perferendis vero
         quo magnam. Id veniam ad maxime! Quia optio explicabo itaque!
      `,
   },
];

interface IQuestions {}

export default function Questions({}: IQuestions) {
   return (
      <section className="bg-bg_light py-8">
         <div className="mb-14">
            <QuestionsTitle />
         </div>
         <div className="px-3">
            <Accordion type="multiple" className="grid w-full gap-3">
               {questions.map(({ question, answer }, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                     <AccordionTrigger>{question}</AccordionTrigger>
                     <AccordionContent>{answer}</AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </section>
   );
}
