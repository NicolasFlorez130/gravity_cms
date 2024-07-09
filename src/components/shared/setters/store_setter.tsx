"use client";

import { useEffect } from "react";
import type { BookingPackage } from "~/lib/features/slices/cart_slice";
import { useStore } from "~/lib/features/store";
import { SAVED_CART_KEY } from "~/lib/keys";
import type { Appointment, Booking } from "~/types/appointments";
import type { IPackage } from "~/types/packages";

interface IStoreSetter {
   bookings: Booking[];
   appointments: Appointment[];
   packages: IPackage[];
}

export default function StoreSetter({
   bookings,
   appointments,
   packages,
}: IStoreSetter) {
   const setAll = useStore.use.setServicesAndAppointments();
   const setPackages = useStore.use.setPackages();

   const setCart = useStore.use.setCart();
   const cart = useStore.use.cart();

   useEffect(() => {
      setAll({
         bookings,
         appointments,
      });

      setPackages(packages);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [bookings, appointments]);

   useEffect(() => {
      const item = localStorage.getItem(SAVED_CART_KEY);

      if (item) {
         setCart(JSON.parse(item) as BookingPackage[]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      localStorage.setItem(SAVED_CART_KEY, JSON.stringify(cart));
   }, [cart]);

   return true;
}
