"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { RefObject } from "react";

export default function useBasicCarousel(container: RefObject<HTMLDivElement>) {
   return useGSAP(() => {
      gsap.to(container.current, {
         left: (container.current!.clientWidth / 2) * -1,
         repeat: -1,
         duration: 20,
         ease: "none",
      });
   });
}
