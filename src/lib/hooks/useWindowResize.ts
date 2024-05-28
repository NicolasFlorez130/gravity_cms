import { useEffect, useState } from "react";

export default function useWindowResize() {
   const [width, setWidth] = useState<number>();
   const [height, setHeight] = useState<number>();

   function setSizes() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
   }

   useEffect(() => {
      window.addEventListener("resize", setSizes);

      return () => {
         window.removeEventListener("resize", setSizes);
      };
   }, []);

   return {
      width,
      height,
   };
}
