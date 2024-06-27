const routes = {
   landing: "/",

   login: "/login",

   bo: {
      dashboard: "/bo/dashboard",
      calendar: "/bo/calendar",
      packages: "/bo/packages",
   },
};

export default routes;

export interface Item {
   icon: JSX.Element;
   label: string;
   type: "link" | "button" | "group";
   disabled?: boolean;
}

export interface ItemLink extends Item {
   url: string;
   type: "link";
}

export interface ItemButton extends Item {
   action: () => any;
   type: "button";
}

export interface Group extends Item {
   items: (ItemButton | ItemLink)[];
   type: "group";
}
