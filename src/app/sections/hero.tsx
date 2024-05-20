"use client";

import Header from "@/components/ui/landing/header";
import Image from "next/image";
import {
   ArrowDown,
   InstagramLogo,
   XLogo,
   ArrowRight,
   PhoneCall,
   MapPin,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/landing/button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import TitleLabel from "@/components/ui/landing/title_label";
import { Card } from "@/components/ui/card";

interface IHero {}

export default function Hero({}: IHero) {
   const container = useRef(null);

   useGSAP(
      ctx => {
         gsap.registerPlugin(ScrollTrigger);

         gsap.to("#bg_veil", {
            top: "-=50vh",
            ease: "none",
            scrollTrigger: {
               scrub: true,
               trigger: container.current,
               start: "top top",
               end: "bottom bottom",
            },
         });
      },
      { scope: container },
   );

   return (
      <div ref={container} className="relative overflow-hidden text-white">
         <section className="to-bg_veil grid place-items-center gap-10 bg-gradient-to-b from-transparent from-20% to-80% pb-16 text-center">
            <Header />
            <div className="relative aspect-square h-72">
               <Image
                  fill
                  alt="stop falling start flying"
                  src="/title/hero_title_xs.png"
                  className="object-contain"
                  priority
               />
            </div>
            <div className="grid place-items-center gap-2">
               <p>
                  Descubre como volar sin <br /> saltar de un avión
               </p>
               <ArrowDown size={42} className="animate-jump" />
            </div>
            <div className="flex justify-center gap-6">
               <Link className="font-bold" href="#">
                  Follow us
               </Link>
               <Link className="font-bold" href="#">
                  <InstagramLogo size={24} />
               </Link>
               <Link className="font-bold" href="#">
                  <XLogo size={24} />
               </Link>
            </div>
            <div className="m-4 mt-0 grid justify-items-center gap-4">
               <h1 className="text-2xl text-primary">
                  El primer <i>túnel</i> de <br /> <i>viento</i> de COLOMBIA
               </h1>
               <p>
                  ¡Prepárate para una experiencia que te hará sentir como si
                  estuvieras volando sin alas! En nuestro túnel de viento, la
                  emoción alcanza nuevas alturas mientras te sumerges en una
                  aventura que desafía la gravedad. ¿Alguna vez has soñado con
                  la sensación de caer libremente desde el cielo, como un
                  auténtico paracaidista intrépido? Bueno, ¡aquí es donde esos
                  sueños se hacen realidad, pero sin saltar de un avión!
               </p>
            </div>
         </section>
         <section className="bg-bg_veil gap-18 grid">
            <div className="mx-4 grid justify-items-center gap-7 text-center">
               <TitleLabel>EL SEGUNDO TÚNEL DE LATINOAMÉRICA</TitleLabel>
               <h2 className="font-epilogue text-3xl font-medium">
                  Puedes hacer <br /> paracaidismo sin <br /> saltar de un avion
               </h2>
               <p>
                  ¡Prepárate para una experiencia que te hará sentir como si
                  estuvieras volando sin alas! En nuestro túnel de viento, la
                  emoción alcanza nuevas alturas mientras te sumerges en una
                  aventura que desafía la gravedad. ¿Alguna vez has soñado con
                  la sensación de caer libremente desde el cielo, como un
                  auténtico paracaidista intrépido? Bueno, ¡aquí es donde esos
                  sueños se hacen realidad, pero sin saltar de un avión!
               </p>
               <Link
                  href="#"
                  className="text-lg font-light leading-none text-secondary"
               >
                  ¿Tienes preguntas? <br />
                  <span className="font-bold">Tenemos las respuestas</span>
               </Link>
            </div>
            <div className="relative hidden aspect-[36/47] w-full">
               <Image
                  alt="encourage highlight image"
                  fill
                  src="/highlights/encourage_highlight.png"
                  className="object-cover"
               />
            </div>
         </section>
         <section className="bg-bg_veil gap-18 py-18 grid">
            <div className="relative aspect-[36/47]">
               <Image
                  alt="encourage highlight image"
                  fill
                  src="/highlights/encourage_highlight.png"
                  className="object-cover"
               />
            </div>
            <div className="mx-4 grid justify-items-center gap-7 text-center">
               <TitleLabel>ESTAMOS UBICADOS EN BOGOTÁ</TitleLabel>
               <h2 className="font-epilogue text-3xl font-medium">
                  Es un plan para toda <br /> la familia
               </h2>
               <p>
                  Ya sea que seas un novato buscando emociones nuevas o un
                  veterano en busca de tu próxima dosis de adrenalina, nuestro
                  túnel de viento es el lugar perfecto para sumergirte en la
                  emoción y la diversión. ¡Así que ven y únete a la fiesta en el
                  cielo, donde la gravedad no tiene límites y la diversión está
                  garantizada!
               </p>
               <Link
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
         <section className="bg-bg_veil box-content px-4 pb-12">
            <TitleLabel className="mb-8">
               TE ESPERAMOS CON TU FAMILIA Y AMIGOS
            </TitleLabel>
            <div className="relative mb-12 aspect-[328/624] w-80">
               <Image
                  fill
                  alt="stop falling start flying"
                  src="/title/contact_title_xs.png"
                  className="object-contain"
                  priority
               />
            </div>
            <div className="grid gap-6">
               <Card className="grid gap-6">
                  <PhoneCall size={36} />
                  <p className="font-medium leading-loose text-muted">
                     También puedes reservar telefónicamente o escribirnos por
                     Whatsapp al{" "}
                     <i className="font-bold text-white">(310) 123 4567</i>
                  </p>
                  <Button variant="muted">Abre WhatsApp</Button>
               </Card>
               <Button className="flex items-center justify-center gap-2">
                  RESERVA AHORA
                  <ArrowRight size={20} />
               </Button>
               <Card className="grid gap-6">
                  <MapPin size={36} />
                  <p className="font-medium leading-loose text-muted">
                     Estamos en la oreja del puente de la{" "}
                     <i className="font-bold text-white">calle 170</i> autonorte
                     sentido norte sur
                  </p>
                  <Button variant="muted">Abre mapa</Button>
               </Card>
            </div>
         </section>
         <div id="bg_veil" className="fixed top-0 -z-10 h-[150vh] w-full">
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
