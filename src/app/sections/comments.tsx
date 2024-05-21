"use client";

import Image from "next/image";

interface IComments {}

const comments = [
   {
      name: "semana",
      image: "/comments/semana_comment.png",
      text: "Así es volar en el primer túnel del viento en Colombia",
   },
   {
      name: "el espectador",
      image: "/comments/el_espectador_comment.png",
      text: "Gravity Túnel, una nueva forma de hacer volar la imaginación en Bogotá",
   },
   {
      name: "uno",
      image: "/comments/uno_comment.png",
      text: "Así es volar en el primer túnel del viento en Colombia",
   },
];

export default function Comments({}: IComments) {
   return (
      <section className="bg-bg_light flex flex-col gap-8 py-10">
         {comments.map((comment, i) => (
            <div key={i} className="grid place-items-center">
               <div className="relative aspect-video w-2/3">
                  <Image
                     alt={comment.name}
                     src={comment.image}
                     fill
                     className="object-contain"
                  />
               </div>
               <p className="w-2/3 text-center text-primary">{comment.text}</p>
            </div>
         ))}
      </section>
   );
}
