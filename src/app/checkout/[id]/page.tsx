import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import CheckoutView from "./views/checkout_view";
import Script from "next/script";
import { env } from "~/env";

export const metadata: Metadata = {
   title: "Checkout",
   description: "",
};

export default async function Page({ params }: { params: { id: string } }) {
   try {
      const appointment = await api.appointments.getById(params.id);

      if (!!appointment && !appointment.appointment_confirmation) {
         const nestedString = `${appointment.booking.id}${appointment.booking.totalAmount}COP${env.BOLD_SECRET_KEY}`;

         const encondedText = new TextEncoder().encode(nestedString);
         const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
         const hashArray = Array.from(new Uint8Array(hashBuffer));
         const hashHex = hashArray
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");

         return (
            <>
               <Script src="https://checkout.bold.co/library/boldPaymentButton.js" />
               <CheckoutView appointment={appointment} hashHex={hashHex} />
            </>
         );
      } else {
         notFound();
      }
   } catch (error) {
      notFound();
   }
}
