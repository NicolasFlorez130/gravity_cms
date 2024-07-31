"use client";

import { useEffect } from "react";
import type { BookingPackage } from "~/lib/features/slices/cart_slice";
import { useStore } from "~/lib/features/store";
import { SAVED_CART_KEY } from "~/lib/keys";
import type { Appointment, Booking } from "~/types/appointments";
import type { DisabledDate } from "~/types/disabled_dates";
import type { IHour } from "~/types/hours";
import type { IPackage } from "~/types/packages";

interface IStoreSetter {
   bookings: Booking[];
   appointments: Appointment[];
   packages: IPackage[];
   disabledDates: DisabledDate[];
   hours: IHour[];
}

export default function StoreSetter({
   bookings,
   appointments,
   packages,
   disabledDates,
   hours,
}: IStoreSetter) {
   const setAll = useStore.use.setServicesAndAppointments();
   const setPackages = useStore.use.setPackages();

   const setCart = useStore.use.setCart();
   const cart = useStore.use.cart();

   const setDisabledDays = useStore.use.setDisabledDays();

   const setHours = useStore.use.setHours();

   useEffect(() => {
      setAll({
         bookings,
         appointments,
      });

      setPackages(packages);

      setDisabledDays(disabledDates);

      setHours(hours);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [bookings, appointments, disabledDates, hours]);

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
