import { type StateCreator } from "zustand";
import type { DisabledDate } from "~/types/disabled_dates";

export interface DisabledDatesSlice {
   disabledDays: DisabledDate[];
   setDisabledDays: (arr: DisabledDate[]) => any;
}

export const disabledDates: StateCreator<DisabledDatesSlice> = set => ({
   disabledDays: [],
   setDisabledDays: arr => set(state => ({ ...state, disabledDays: arr })),
});
