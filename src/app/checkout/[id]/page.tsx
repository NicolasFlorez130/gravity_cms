import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import CheckoutView from "./views/checkout_view";

export const metadata: Metadata = {
   title: "Checkout",
   description: "",
};

export default async function Page({ params }: { params: { id: string } }) {
   try {
      const appointment = await api.appointments.getById(params.id);

      if (!!appointment) {
         return <CheckoutView appointment={appointment} />;
      } else {
         notFound();
      }
   } catch (error) {
      notFound();
   }
}
