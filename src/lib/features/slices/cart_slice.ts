import { type StateCreator } from "zustand";

export interface BookingPackage {
   id: string;
   packageId: string;
}

export interface CartSlice {
   cart: BookingPackage[];
   setCart: (arr: BookingPackage[]) => any;
   addPackageToCart: (arr: BookingPackage[]) => any;
   removeFromCart: (index: number) => any;
}

export const cartSlice: StateCreator<CartSlice> = set => ({
   cart: [],
   setCart: arr => set(state => ({ ...state, cart: arr })),
   addPackageToCart: arr => set(state => ({ cart: [...state.cart, ...arr] })),
   removeFromCart: index =>
      set(state => ({
         cart: state.cart.filter((_, i) => i !== index),
      })),
});
