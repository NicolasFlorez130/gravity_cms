"use client";

import { Bell } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./button";
import BookAppointmentDialog from "~/app/bo/components/dialogs/book_appointment_dialog";

interface IHeader {
   title: string;
}

export default function Header({ title }: IHeader) {
   return (
      <header className="flex items-center justify-between px-4 py-3">
         <h1 className="font-medium">{title}</h1>
         <div className="flex gap-2">
            <Button variant="link">
               <Bell size={20} />
            </Button>
            <BookAppointmentDialog />
         </div>
      </header>
   );
}
