"use client";

interface IVeil {}

export default function Veil({}: IVeil) {
   return <div id="veil" className="fixed z-50 h-full w-full bg-background-dark" />;
}
