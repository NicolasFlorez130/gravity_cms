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
               end: "bottom top",
            },
         });
      },
      { scope: container },
   );

   return (
      <div ref={container} className="relative overflow-hidden text-white">
         <section className="relative grid place-items-center gap-10 bg-gradient-to-b from-transparent from-20% to-bg_veil/80 to-80% pb-16 text-center lg:px-10">
            <Header />
            <div className="relative aspect-square h-72 sm:aspect-[389/144] sm:h-36 lg:h-64">
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
            <div className="grid place-items-center gap-2">
               <p className="text-lg">
                  Descubre como volar sin <br className="lg:hidden" /> saltar de
                  un avión
               </p>
               <ArrowDown size={42} className="animate-jump xl:hidden" />
            </div>
            <div className="flex justify-center gap-6 xl:absolute xl:bottom-36 xl:left-8 xl:vertical-rl">
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
            <div className="m-4 mt-0 grid justify-items-center gap-4 lg:w-11/12 lg:justify-self-end xl:bg-bg_veil/20 xl:px-14 xl:py-11">
               <h1 className="text-2xl text-primary xl:text-5xl">
                  El primer <i>túnel</i> de <br className="sm:hidden" />{" "}
                  <i>viento</i> de COLOMBIA
               </h1>
               <p className="text-sm xl:text-2xl">
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
         <section className="grid items-center gap-18 bg-bg_veil/80 lg:px-36 xl:grid-cols-[11fr_9fr] xl:gap-11">
            <div className="mx-4 grid justify-items-center gap-7 text-center xl:my-8 xl:h-max xl:justify-items-start xl:text-start">
               <TitleLabel>EL SEGUNDO TÚNEL DE LATINOAMÉRICA</TitleLabel>
               <h2 className="font-epilogue text-3xl font-medium xl:text-6xl">
                  Puedes hacer <br className="sm:hidden" /> paracaidismo sin{" "}
                  <br className="sm:hidden" /> saltar de un avion
               </h2>
               <p className="text-sm xl:text-lg">
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
                  ¿Tienes preguntas? <br className="sm:hidden" />
                  <span className="font-bold">Tenemos las respuestas</span>
               </Link>
            </div>
            <div className="3xl:max-h-[70vh] relative hidden aspect-[36/47] xl:block 2xl:max-h-[80vh]">
               <Image
                  alt="encourage highlight image"
                  fill
                  src="/highlights/encourage_highlight.png"
                  className="object-cover"
               />
            </div>
         </section>
         <section className="grid items-center gap-18 bg-bg_veil/80 py-18 sm:grid-cols-2 sm:gap-6 sm:px-3 lg:px-36 xl:grid-cols-[9fr_11fr] xl:gap-11 xl:pt-0">
            <div className="3xl:max-h-[70vh] relative aspect-[36/47] sm:self-center 2xl:max-h-[80vh]">
               <Image
                  alt="encourage highlight image"
                  fill
                  src="/highlights/encourage_highlight.png"
                  className="object-cover"
               />
            </div>
            <div className="mx-4 grid h-max justify-items-center gap-7 text-center xl:justify-items-start xl:text-start">
               <TitleLabel>ESTAMOS UBICADOS EN BOGOTÁ</TitleLabel>
               <h2 className="font-epilogue text-3xl font-medium xl:text-6xl">
                  Es un plan para toda <br /> la familia
               </h2>
               <p className="text-sm xl:text-lg">
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
         <section className="box-content bg-bg_veil/80 px-3 pb-12 sm:grid sm:grid-cols-2 sm:gap-6 lg:px-36 xl:grid-cols-[2fr_1fr] xl:items-center xl:px-64">
            <div>
               <TitleLabel className="mb-8">
                  TE ESPERAMOS CON TU FAMILIA Y AMIGOS
               </TitleLabel>
               <div className="relative mb-12 aspect-[328/624] w-80 xl:aspect-[468/520] xl:h-[32rem] xl:w-auto">
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
            <div className="grid h-max gap-6">
               <Card className="grid gap-6">
                  <PhoneCall size={36} />
                  <p className="font-medium leading-loose text-muted">
                     También puedes reservar telefónicamente o escribirnos por
                     Whatsapp al{" "}
                     <i className="font-bold text-white">(310) 123 4567</i>
                  </p>
                  <Button variant="muted" className="text-lg">
                     Abre WhatsApp
                  </Button>
               </Card>
               <Button className="flex items-center justify-center gap-2 text-lg">
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
                  <Button variant="muted" className="text-lg">
                     Abre mapa
                  </Button>
               </Card>
            </div>
         </section>
         <div
            id="bg_veil"
            className="max-w-screen-3xl fixed top-0 -z-10 h-[150vh] w-full"
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
