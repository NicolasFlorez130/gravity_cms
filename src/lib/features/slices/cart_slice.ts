import { type StateCreator } from "zustand";

interface BookingPackage {
   packageId: number;
   date: Date | null;
}

export interface CartSlice {
   packages: BookingPackage[];
   setCart: (arr: BookingPackage[]) => any;
   addPackageToCart: (arr: BookingPackage[]) => any;
   removeFromCart: (index: number) => any;
}

export const cartSlice: StateCreator<CartSlice> = set => ({
   packages: [],
   setCart: arr => set(state => ({ ...state, packages: arr })),
   addPackageToCart: arr =>
      set(state => ({ packages: [...state.packages, ...arr] })),
   removeFromCart: index =>
      set(state => ({
         packages: state.packages.filter((_, i) => i !== index),
      })),
});
