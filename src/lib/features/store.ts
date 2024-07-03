import { create } from "zustand";
import {
   type AppointmentsSlice,
   appointmentsSlice,
} from "./slices/appointments_slice";
import { type CartSlice, cartSlice } from "./slices/cart_slice";
import type { StoreApi, UseBoundStore } from "zustand";

type WithSelectors<S> = S extends { getState: () => infer T }
   ? S & { use: { [K in keyof T]: () => T[K] } }
   : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
   _store: S,
) => {
   const store = _store as WithSelectors<typeof _store>;
   store.use = {};
   for (const k of Object.keys(store.getState())) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (store.use as any)[k] = () => store(s => s[k as keyof typeof s]);
   }

   return store;
};

export const store = create<AppointmentsSlice & CartSlice>((...a) => ({
   ...appointmentsSlice(...a),
   ...cartSlice(...a),
}));

export const useStore = createSelectors(store);
