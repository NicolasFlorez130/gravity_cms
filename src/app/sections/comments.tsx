"use client";

import Image from "next/image";
import Link from "next/link";

interface IComments {}

const comments = [
   {
      name: "semana",
      image: "/comments/semana_comment.png",
      text: "Así es volar en el primer túnel del viento en Colombia",
      url: "https://www.semana.com/semana-tv/articulo/asi-es-volar-en-el-primer-tunel-del-viento-en-colombia/202406/",
   },
   {
      name: "el espectador",
      image: "/comments/el_espectador_comment.png",
      text: "Gravity Túnel, una nueva forma de hacer volar la imaginación en Bogotá",
      url: "https://www.elespectador.com/deportes/mas-deportes/gravity-tunel-una-nueva-forma-de-hacer-volar-la-imaginacion-en-bogota-noticias-hoy/",
   },
   {
      name: "uno",
      image: "/comments/canal_trece_comment.webp",
      text: "¿Alguna vez has querido experimentar la sensación de saltar desde un avión?",
      url: "https://www.instagram.com/reel/C02fralLCGD/?igsh=MTVpMXVpdjg3dnpjeg==",
   },
];

export default function Comments({}: IComments) {
   return (
      <section className="flex flex-col gap-8 bg-bg_light py-10 sm:flex-row sm:px-3 lg:gap-12 lg:px-36 xl:gap-20">
         {comments.map((comment, i) => (
            <div key={i} className="grid place-items-center">
               <Link
                  href={comment.url}
                  aria-label={`${comment.name} comment`}
                  className="relative aspect-video w-2/3 sm:w-full"
                  target="_blank"
               >
                  <Image
                     alt={comment.name}
                     src={comment.image}
                     fill
                     className="object-contain"
                  />
               </Link>
               <p className="w-2/3 text-center text-lg text-primary sm:w-full">
                  {comment.text}
               </p>
            </div>
         ))}
      </section>
   );
}
