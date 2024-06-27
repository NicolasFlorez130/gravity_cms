"use client";

import { type PropsWithChildren } from "react";
import { Separator } from "~/components/bo/ui/separator";
import Sidebar from "~/components/bo/ui/sidebar";
import routes, {
   type Group,
   type ItemButton,
   type ItemLink,
} from "~/lib/routes";
import {
   CalendarBlank,
   CodaLogo,
   Dot,
   FolderSimple,
   User,
} from "@phosphor-icons/react/dist/ssr";
import { usePathname } from "next/navigation";
import Header from "~/components/bo/ui/header";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouterRefresh } from "~/lib/hooks/useRouterRefresh";

interface IBoLayout extends PropsWithChildren {}

export default function BoLayout({ children }: IBoLayout) {
   const pathname = usePathname();

   const { refresh } = useRouterRefresh();

   const { mutate, isPending } = useMutation({
      mutationFn: () => signOut(),
      onSuccess: () => refresh(),
   });

   const navButtons: (ItemLink | ItemButton | Group)[] = [
      {
         url: routes.bo.dashboard,
         icon: <FolderSimple size={14} />,
         label: "Principal",
         type: "link",
      },
      {
         url: routes.bo.calendar,
         icon: <CalendarBlank size={14} />,
         label: "Calendar",
         type: "link",
      },
      {
         url: routes.bo.packages,
         icon: <CodaLogo size={14} />,
         label: "Gestión de paquetes",
         type: "link",
      },
      !isPending
         ? {
              icon: <User size={14} />,
              label: "Cuenta",
              type: "group",
              items: [
                 {
                    action: mutate,
                    icon: <Dot className="invisible" size={14} />,
                    label: "Cerrar sesión",
                    type: "button",
                 },
                 {
                    action: () => true,
                    icon: <Dot className="invisible" size={14} />,
                    label: "Cambiar contraseña",
                    type: "button",
                 },
              ],
           }
         : {
              icon: <User size={14} />,
              label: "Cerrando sesión...",
              type: "button",
              action: () => true,
              disabled: isPending,
           },
   ];

   return (
      <div className="grid min-h-screen grid-cols-[auto_auto_1fr] bg-white text-black">
         <Sidebar navButtons={navButtons} />
         <Separator orientation="vertical" />
         <div className="grid grid-rows-[auto_auto_1fr]">
            <Header
               title={
                  navButtons.find(
                     el => el.type === "link" && el.url === pathname,
                  )?.label ?? "_"
               }
            />
            <Separator />
            <div>{children}</div>
         </div>
      </div>
   );
}
