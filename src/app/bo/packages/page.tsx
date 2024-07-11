import Notes from "../components/common/notes";
import Activity from "../components/common/activity";
import Packages from "./views/packages";
import { BoPackagesContextProvider } from "./hocs/bo_packages_context";
import { type Metadata } from "next";

export const metadata: Metadata = {
   title: "Paquetes",
   description: "",
};

interface IPage {}

export default function Page({}: IPage) {
   return (
      <BoPackagesContextProvider>
         <div className="grid grid-cols-[1fr_auto] gap-8 px-12 py-10">
            <Packages />
            <div className="box-content grid h-max w-72 gap-5 border border-bo-card-border px-5 py-7">
               <Activity />
               <Notes />
            </div>
         </div>
      </BoPackagesContextProvider>
   );
}
