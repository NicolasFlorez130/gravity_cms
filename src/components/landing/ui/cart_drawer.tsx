import { Button } from "./button";
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerDescription,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "./drawer";

export function DrawerDemo() {
   return (
      <Drawer>
         <DrawerTrigger asChild>
            <Button variant="primary" className="w-max">
               RESERVA AQUÍ
            </Button>
         </DrawerTrigger>
         <DrawerContent>
            <DrawerHeader>
               <DrawerTitle>Move Goal</DrawerTitle>
               <DrawerDescription>
                  Set your daily activity goal.
               </DrawerDescription>
            </DrawerHeader>
            <div></div>
            <DrawerFooter>
               <Button>Submit</Button>
               <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
               </DrawerClose>
            </DrawerFooter>
         </DrawerContent>
      </Drawer>
   );
}
