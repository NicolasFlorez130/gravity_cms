import { useGSAP } from "@gsap/react";
import { type MutableRefObject, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { textSplitter } from "../utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export function useHeroAnimations(container: MutableRefObject<null>) {
   const veilMoveDuration = 0.3;

   const scrubHeight = "1000vh";

   const isLg = useMediaQuery("(min-width: 1024px)");
   const isXl = useMediaQuery("(min-width: 1280px)");
   const isFHD = useMediaQuery("(min-width: 1900px)");

   useEffect(() => {
      gsap.to("#veil", {
         yPercent: -100,
         duration: veilMoveDuration,
         ease: "none",
      });
   }, []);

   useGSAP(
      () => {
         gsap.registerPlugin(ScrollTrigger);

         gsap.to("#bg_image", {
            top: "-=50vh",
            ease: "none",
            scrollTrigger: {
               scrub: true,
               trigger: container.current,
               start: "top top",
               end: `${isFHD ? scrubHeight : "bottom"} top`,
            },
         });

         if (isXl) {
            //initial
            {
               gsap.to("#title", { display: "grid" });

               //header
               {
                  gsap.fromTo(
                     "#logo",
                     { delay: veilMoveDuration, x: -200, opacity: 0 },
                     {
                        x: 0,
                        opacity: 1,
                        ease: "bounce.out",
                        duration: 0.7,
                     },
                  );

                  gsap.fromTo(
                     "#header_buttons",
                     { delay: veilMoveDuration, x: 200, opacity: 0 },
                     {
                        x: 0,
                        opacity: 1,
                        ease: "bounce.out",
                        duration: 0.7,
                     },
                  );
               }

               //title
               {
                  gsap
                     .timeline({ delay: veilMoveDuration })
                     .fromTo(
                        "#title_container",
                        { height: 0 },
                        {
                           duration: 0.3,
                           height: "auto",
                           ease: "none",
                        },
                     )
                     .fromTo(
                        "#title_container",
                        { width: 0 },
                        {
                           width: "auto",
                           ease: "power3.in",
                        },
                     )
                     .to("#title_container", {
                        borderColor: "transparent",
                        duration: 0.2,
                     });
               }

               //title_text
               {
                  gsap
                     .timeline({ delay: veilMoveDuration })
                     .from("#title_text_container", {
                        opacity: 0,
                        duration: 0.2,
                        ease: "none",
                     })
                     .fromTo(
                        "#title_text span",
                        {
                           opacity: 0,
                           yPercent: 150,
                        },
                        {
                           opacity: 1,
                           stagger: 0.01,
                           duration: 1,
                           ease: "elastic.out",
                           yPercent: 0,
                        },
                     )
                     .to(
                        "#description > div",
                        {
                           delay: 0.2,
                           duration: 0.4,
                           ease: "none",
                           width: "100%",
                        },
                        "<",
                     )
                     .from(
                        "#description",
                        {
                           duration: 0.2,
                           height: 4,
                           ease: "none",
                        },
                        ">",
                     )
                     .to(
                        "#description > div",
                        {
                           duration: 0.4,
                           ease: "none",
                           width: 0,
                           left: "100%",
                        },
                        ">",
                     );
               }

               //sub_title
               {
                  textSplitter(
                     document.querySelector("#sub_title"),
                     "sub_title_letter",
                  );

                  gsap
                     .timeline({ delay: veilMoveDuration })
                     .from(".sub_title_letter", {
                        opacity: 0,
                        stagger: 0.02,
                        duration: 0.01,
                     })
                     .from("#sub_title_arrow", {
                        rotate: -180,
                        opacity: 0,
                        duration: 1,
                        ease: "elastic.out",
                     });
               }

               //social_media
               {
                  gsap.fromTo(
                     "#social_media",
                     { delay: veilMoveDuration, x: -200, opacity: 0 },
                     { x: 0, opacity: 1, ease: "sine.out" },
                  );
               }
            }
         }

         if (isFHD) {
            const about = "about_section";
            const encourage = "encourage_section";
            const contact = "contact_section";

            const tl = gsap.timeline({
               scrollTrigger: {
                  trigger: container.current,
                  scrub: 1,
                  pin: true,
                  // markers: true,
                  start: "bottom bottom",
                  end: `${scrubHeight} top`,
                  // snap: {
                  //    snapTo: 0.25,
                  //    duration: 0.02,
                  //    ease: "power1.inOut",
                  // },
               },
            });

            //title
            {
               //out
               tl.to("#title", { opacity: 0, duration: 0.1 }); //.2
               tl.to(
                  "#bg_image",
                  {
                     opacity: 0.3,
                     duration: 0.1,
                  },
                  "<",
               ); //.2
            }

            //about
            {
               //in
               tl.set("#about", { display: "grid" }); //.2-

               tl.fromTo(
                  "#section_marker",
                  {
                     duration: 0.2,
                     opacity: 0,
                     x: 100,
                     ease: "sine.out",
                  },
                  {
                     opacity: 1,
                     x: 0,
                     display: "grid",
                  },
                  about,
               ); //.2_

               tl.from(
                  "#about_image",
                  {
                     delay: 0.2,
                     duration: 0.5,
                     opacity: 0,
                     x: 200,
                     ease: "sine.out",
                  },
                  about,
               ); //.8_

               tl.from(
                  "#about_text .title_label span",
                  {
                     duration: 0.3,
                     scaleY: 0,
                     stagger: 0.015,
                  },
                  about,
               ); //.4_

               tl.fromTo(
                  "#about h2 span",
                  {
                     opacity: 0,
                     yPercent: -150,
                  },
                  {
                     duration: 0.4,
                     opacity: 1,
                     stagger: 0.01,
                     ease: "elastic.out",
                     yPercent: 0,
                  },
                  about,
               ); //.5_

               tl.to(
                  "#about_text > div > div",
                  {
                     duration: 0.1,
                     ease: "none",
                     width: "100%",
                  },
                  about,
               ) //.2
                  .from(
                     "#about_text > div",
                     {
                        duration: 0.3,
                        height: 4,
                        ease: "none",
                     },
                     ">",
                  ) //.5
                  .to(
                     "#about_text > div > div",
                     {
                        duration: 0.2,
                        ease: "none",
                        width: 0,
                        left: "100%",
                     },
                     ">",
                  ); //.7_

               tl.from(
                  "#about_text a",
                  {
                     duration: 0.2,
                     opacity: 0,
                     y: 40,
                  },
                  about,
               ); //.3_

               //out
               tl.to("#about", { opacity: 0, duration: 0.1 }, 1); //1.1

               tl.fromTo(
                  "#section_marker_slider > div",
                  { yPercent: 0 },
                  { yPercent: 100 },
                  0.9,
               ); //1.1
            }

            //encourage
            {
               //in
               tl.set("#encourage", {
                  display: "grid",
               }); //1.1-

               tl.from(
                  "#encourage_image",
                  {
                     delay: 0.2,
                     duration: 0.5,
                     opacity: 0,
                     x: -200,
                     ease: "sine.out",
                  },
                  encourage,
               ); //1.8_

               tl.from(
                  "#encourage_text .title_label span",
                  {
                     duration: 0.3,
                     scaleY: 0,
                     stagger: 0.015,
                  },
                  encourage,
               ); //1.4_

               tl.fromTo(
                  "#encourage h2 span",
                  {
                     opacity: 0,
                     yPercent: -150,
                  },
                  {
                     duration: 0.4,
                     opacity: 1,
                     stagger: 0.01,
                     ease: "elastic.out",
                     yPercent: 0,
                  },
                  encourage,
               ); //1.5_

               tl.to(
                  "#encourage_text > div > div",
                  {
                     duration: 0.1,
                     ease: "none",
                     width: "100%",
                  },
                  encourage,
               ) //1.2
                  .from(
                     "#encourage_text > div",
                     {
                        duration: 0.3,
                        height: 4,
                        ease: "none",
                     },
                     ">",
                  ) //1.5
                  .to(
                     "#encourage_text > div > div",
                     {
                        duration: 0.2,
                        ease: "none",
                        width: 0,
                        left: "100%",
                     },
                     ">",
                  ); //1.7_

               tl.fromTo(
                  "#encourage_text a",
                  {
                     opacity: 0,
                     y: 60,
                  },
                  {
                     duration: 0.2,
                     opacity: 1,
                     y: 0,
                  },
                  encourage,
               ); //1.3_

               //out
               tl.to("#encourage", { opacity: 0, duration: 0.1 }, 2.3); //2.1-

               tl.to(
                  "#section_marker",
                  {
                     duration: 0.2,
                     opacity: 0,
                     x: 100,
                     ease: "sine.out",
                  },
                  2.1,
               ); //.2_
            }

            //contact
            {
               //in
               tl.set("#contact", {
                  display: "grid",
               });

               tl.from(
                  "#contact_title .title_label span",
                  {
                     duration: 0.1,
                     scaleY: 0,
                     stagger: 0.015,
                  },
                  contact,
               ); //2.2_

               tl.fromTo(
                  "#contact_sign_container",
                  { height: 0 },
                  {
                     duration: 0.1,
                     height: "auto",
                     ease: "none",
                  },
                  contact,
               ) //2.2
                  .fromTo(
                     "#contact_sign_container",
                     { width: 0 },
                     {
                        duration: 0.2,
                        width: "auto",
                        ease: "power3.in",
                     },
                     ">",
                  ) //2.4
                  .to(
                     "#contact_sign_container",
                     {
                        borderColor: "transparent",
                        duration: 0.05,
                     },
                     ">",
                  ); //2.45_

               tl.fromTo(
                  "#contact_cards > *",
                  {
                     opacity: 0,
                     x: 100,
                  },
                  {
                     opacity: 1,
                     x: 0,
                     stagger: 0.05,
                     duration: 0.3,
                     ease: "none",
                  },
                  contact,
               );

               tl.set("#contact", {}, 3);
            }
         }
      },
      {
         scope: container,
         dependencies: [isFHD, isXl],
         revertOnUpdate: true,
      },
   );

   useGSAP(
      () => {
         if (isLg) {
            const socialMedia = document.getElementById("social_media");
            const bookButton = document.getElementById("book_button");
            const landingHeader = document.getElementById("landing_header");

            if (bookButton && landingHeader && socialMedia) {
               function hideElements() {
                  gsap.to(bookButton, {
                     y: 100,
                     autoAlpha: 0,
                     duration: 0.5,
                  });

                  gsap.to(socialMedia, {
                     x: -100,
                     autoAlpha: 0,
                     duration: 0.5,
                  });
               }

               hideElements();

               ScrollTrigger.create({
                  trigger: landingHeader,
                  start: "top top",
                  end: "bottom top",
                  onLeaveBack: hideElements,
                  onEnter: () => {
                     gsap.to(bookButton, {
                        y: 0,
                        autoAlpha: 1,
                        duration: 0.5,
                     });

                     gsap.to(socialMedia, {
                        x: 0,
                        autoAlpha: 1,
                        duration: 0.5,
                     });
                  },
               });
            }
         }
      },
      {
         scope: container,
         dependencies: [isLg],
         revertOnUpdate: true,
      },
   );
}
