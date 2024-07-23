"use client";

import Image from "next/image";
import {
   ArrowDown,
   ArrowRight,
   PhoneCall,
   MapPin,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { cn, printAsSpans } from "~/lib/utils";
import { Button, buttonVariants } from "~/components/landing/ui/button";
import { useRef } from "react";
import TitleLabel from "~/components/landing/ui/title_label";
import { useHeroAnimations } from "~/lib/hooks/useHeroAnimations";
import { Card } from "~/components/landing/ui/card";
import Header from "~/components/landing/ui/header";

interface IHero {}

export default function Hero({}: IHero) {
   const container = useRef(null);

   useHeroAnimations(container);

   return (
      <div
         ref={container}
         className="relative overflow-hidden text-white fhd:min-h-screen"
      >
         <div className="z-10">
            <div
               id="section_marker"
               className="absolute bottom-0 right-8 top-0 my-auto hidden h-max w-max grid-cols-2 grid-rows-2 place-content-center gap-6 font-din text-2xl"
            >
               <div className="col-start-1 col-end-2 row-start-1 row-end-2 font-light">
                  01
               </div>
               <div className="col-start-1 col-end-2 row-start-2 row-end-3">
                  02
               </div>
               <div
                  id="section_marker_slider"
                  className="col-start-2 col-end-3 row-start-1 row-end-3 h-full w-1 rounded-full bg-stone-300"
               >
                  <div className="relative h-1/2 w-full bg-white" />
               </div>
            </div>
            <section
               id="title"
               className="relative bg-gradient-to-b from-transparent from-20% to-bg_veil/80 to-80% pb-16 text-center lg:px-10 fhd:absolute fhd:hidden fhd:h-screen fhd:bg-transparent fhd:pb-10"
            >
               <Header />
               <div className="grid h-max place-items-center gap-10">
                  <div
                     id="title_container"
                     className="overflow-hidden border-white xl:border-r-4"
                  >
                     <div className="relative aspect-square h-72 sm:aspect-[389/144] sm:h-36 lg:h-64 fhd:h-80">
                        <Image
                           fill
                           alt="stop falling start flying"
                           src="/title/hero_title_xs.png"
                           className="object-contain sm:hidden"
                           priority
                        />
                        <Image
                           fill
                           alt="stop falling start flying"
                           src="/title/hero_title_sm.png"
                           className="hidden object-contain sm:block"
                           priority
                        />
                     </div>
                  </div>
                  <div className="grid place-items-center gap-2">
                     <div className="flex items-center gap-2">
                        <p
                           id="sub_title"
                           className="sub_title text-lg xl:text-2xl"
                        >
                           Descubre como volar sin <br className="lg:hidden" />{" "}
                           saltar de un avión
                        </p>
                        <ArrowRight
                           id="sub_title_arrow"
                           size={20}
                           className="hidden xl:inline"
                        />
                     </div>
                     <ArrowDown size={42} className="animate-jump xl:hidden" />
                  </div>
                  <div
                     id="title_text_container"
                     className="m-4 mt-0 grid justify-items-center gap-4 lg:w-11/12 lg:justify-self-end xl:bg-bg_veil/20 xl:px-14 xl:py-11"
                  >
                     <h1
                        id="title_text"
                        className="text-2xl text-primary xl:text-5xl"
                     >
                        {printAsSpans("El primer túnel de")}
                        <br className="sm:hidden" />
                        {printAsSpans(" viento de COLOMBIA")}
                     </h1>
                     <div id="description" className="relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 hidden h-0 w-0 border-b-4 border-white xl:block" />
                        <p className="relative top-0 text-sm xl:py-4 xl:text-2xl">
                           ¡Prepárate para una experiencia que te hará sentir
                           como si estuvieras volando sin alas! En nuestro túnel
                           de viento, la emoción alcanza nuevas alturas mientras
                           te sumerges en una aventura que desafía la gravedad.
                           ¿Alguna vez has soñado con la sensación de caer
                           libremente desde el cielo, como un auténtico
                           paracaidista intrépido? Bueno, ¡aquí es donde esos
                           sueños se hacen realidad, pero sin saltar de un
                           avión!
                        </p>
                     </div>
                  </div>
               </div>
            </section>
            <section
               id="about"
               className="grid items-center gap-18 bg-bg_veil/80 lg:px-36 xl:grid-cols-[11fr_9fr] xl:gap-11 fhd:absolute fhd:hidden fhd:h-screen fhd:bg-transparent"
            >
               <div
                  id="about_text"
                  className="mx-4 grid h-max justify-items-center gap-7 text-center xl:my-8 xl:h-max xl:justify-items-start xl:text-start"
               >
                  <h2 className="whitespace-nowrap font-epilogue text-3xl font-medium xl:text-6xl">
                     {printAsSpans("Puedes hacer ")}
                     <br className="sm:hidden" />{" "}
                     {printAsSpans(" paracaidismo sin ")}
                     <br className="sm:hidden" />{" "}
                     {printAsSpans(" saltar de un avion")}
                  </h2>
                  <div className="relative overflow-hidden">
                     <div className="absolute bottom-0 left-0 hidden h-0 w-0 border-b-4 border-white xl:block" />
                     <p className="text-justify text-sm xl:text-lg fhd:mb-4">
                        ¡Prepárate para una experiencia que te hará sentir como
                        si estuvieras volando sin alas! En nuestro túnel de
                        viento, la emoción alcanza nuevas alturas mientras te
                        sumerges en una aventura que desafía la gravedad.
                        ¿Alguna vez has soñado con la sensación de caer
                        libremente desde el cielo, como un auténtico
                        paracaidista intrépido? Bueno, ¡aquí es donde esos
                        sueños se hacen realidad, pero sin saltar de un avión!
                     </p>
                  </div>
                  <Link
                     href="#"
                     className="text-lg font-light leading-none text-secondary"
                  >
                     ¿Tienes preguntas? <br className="sm:hidden" />
                     <span className="font-bold">Tenemos las respuestas</span>
                  </Link>
               </div>
               <div
                  id="about_image"
                  className="relative hidden aspect-[36/47] xl:block fhd:max-h-[80vh] 3xl:max-h-[70vh]"
               >
                  <Image
                     alt="encourage highlight image"
                     fill
                     src="/highlights/encourage_highlight.png"
                     className="object-cover"
                  />
               </div>
            </section>
            <section
               id="encourage"
               className="grid items-center gap-18 bg-bg_veil/80 py-18 sm:grid-cols-2 sm:gap-6 sm:px-3 lg:px-36 xl:grid-cols-[9fr_11fr] xl:gap-11 xl:pt-0 fhd:absolute fhd:hidden fhd:h-screen fhd:bg-transparent fhd:pb-0"
            >
               <div
                  id="encourage_image"
                  className="relative aspect-[36/47] sm:self-center fhd:max-h-[80vh] 3xl:max-h-[70vh]"
               >
                  <Image
                     alt="encourage highlight image"
                     fill
                     src="/highlights/encourage_highlight.png"
                     className="object-cover"
                  />
               </div>
               <div
                  id="encourage_text"
                  className="mx-4 grid h-max justify-items-center gap-7 text-center xl:justify-items-start xl:text-start"
               >
                  <TitleLabel>
                     {printAsSpans("ESTAMOS UBICADOS EN BOGOTÁ")}
                  </TitleLabel>
                  <h2 className="whitespace-nowrap font-epilogue text-3xl font-medium xl:text-6xl">
                     {printAsSpans("Es un plan para toda ")}
                     <br />
                     {printAsSpans(" la familia")}
                  </h2>
                  <div className="relative overflow-hidden">
                     <div className="absolute bottom-0 left-0 hidden h-0 w-0 border-b-4 border-white xl:block" />
                     <p className="text-justify text-sm xl:text-lg fhd:mb-4">
                        Ya sea que seas un novato buscando emociones nuevas o un
                        veterano en busca de tu próxima dosis de adrenalina,
                        nuestro túnel de viento es el lugar perfecto para
                        sumergirte en la emoción y la diversión. ¡Así que ven y
                        únete a la fiesta en el cielo, donde la gravedad no
                        tiene límites y la diversión está garantizada!
                     </p>
                  </div>
                  <Link
                     id="uwu"
                     href="#"
                     className={cn(
                        buttonVariants({ variant: "primary" }),
                        "flex items-center gap-2",
                     )}
                  >
                     RESERVA AHORA
                     <ArrowRight size={20} />
                  </Link>
               </div>
            </section>
            <section
               id="contact"
               className="box-content bg-bg_veil/80 px-3 pb-12 sm:grid sm:grid-cols-2 sm:gap-6 lg:px-36 xl:grid-cols-[2fr_1fr] xl:items-center xl:px-64 fhd:absolute fhd:hidden fhd:h-screen fhd:bg-transparent"
            >
               <div id="contact_title" className="w-max">
                  <TitleLabel className="mb-8">
                     {printAsSpans("TE ESPERAMOS CON TU FAMILIA Y AMIGOS")}
                  </TitleLabel>
                  <div
                     id="contact_sign_container"
                     className="w-auto overflow-hidden border-white fhd:border-r-4"
                  >
                     <div className="relative mb-12 aspect-[328/624] w-80 xl:mb-0 xl:aspect-[468/520] xl:h-[32rem] xl:w-auto fhd:h-[40rem]">
                        <Image
                           fill
                           alt="stop falling start flying"
                           src="/title/contact_title_xs.png"
                           className="object-contain xl:hidden"
                           priority
                        />
                        <Image
                           fill
                           alt="stop falling start flying"
                           src="/title/contact_title_xl.png"
                           className="hidden object-contain xl:block"
                           priority
                        />
                     </div>
                  </div>
               </div>
               <div id="contact_cards" className="grid h-max gap-6">
                  <Card className="grid gap-6">
                     <PhoneCall size={36} />
                     <p className="font-medium leading-loose text-muted">
                        También puedes reservar telefónicamente o escribirnos
                        por Whatsapp al{" "}
                        <i className="font-bold text-white">350 555 0920</i>
                     </p>
                     <Link
                        className={cn(
                           buttonVariants({ variant: "muted" }),
                           "text-center text-lg",
                        )}
                        href="https://wa.me/573505550920"
                        target="_blank"
                     >
                        Abre WhatsApp
                     </Link>
                  </Card>
                  <Button className="flex items-center justify-center gap-2 text-lg">
                     RESERVA AHORA
                     <ArrowRight size={20} />
                  </Button>
                  <Card className="grid gap-6">
                     <MapPin size={36} />
                     <p className="font-medium leading-loose text-muted">
                        Estamos en la{" "}
                        <i className="font-bold text-white">
                           Carrera 45 #169 - 81,{" "}
                        </i>
                        oreja sur occidental de la autopista norte
                     </p>
                     <Button variant="muted" className="text-lg">
                        Abre mapa
                     </Button>
                  </Card>
               </div>
            </section>
         </div>
         <div
            id="bg_image"
            className="fixed top-0 -z-10 h-[150vh] w-full max-w-screen-3xl"
         >
            <Image
               fill
               alt="hero background"
               src="/backgrounds/hero_background.jpg"
               className="scale-x-[-1] object-cover object-center"
            />
         </div>
      </div>
   );
}
