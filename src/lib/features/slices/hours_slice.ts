import { type StateCreator } from "zustand";
import type { IHour } from "~/types/hours";

export interface HoursSlice {
   hours: IHour[];
   setHours: (arr: IHour[]) => any;
}

export const hoursSlice: StateCreator<HoursSlice> = set => ({
   hours: [],
   setHours: arr => set(state => ({ ...state, hours: arr })),
});
