import { type StateCreator } from "zustand";
import type { IPackage } from "~/types/packages";

export interface PackagesSlice {
   packages: IPackage[];
   setPackages: (arr: IPackage[]) => any;
}

export const packagesSlice: StateCreator<PackagesSlice> = set => ({
   packages: [],
   setPackages: arr => set(state => ({ ...state, packages: arr })),
});
