import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
   "rounded-full transition-all font-dm_sans h-max focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
   {
      variants: {
         variant: {
            primary:
               "tracking-widest border-3 border-primary py-4 px-6 text-white font-bold",
            muted: "border p-3 border-muted text-muted",
            highlight:
               "tracking-widest border-3 border-primary py-4 px-6 font-bold text-black bg-white",
            outline:
               "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
         },
      },
      defaultVariants: {
         variant: "primary",
      },
   },
);

export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : "button";
      return (
         <Comp
            className={cn(buttonVariants({ variant, className }))}
            ref={ref}
            {...props}
         />
      );
   },
);
Button.displayName = "Button";

export { Button, buttonVariants };
