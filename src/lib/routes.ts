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

export interface ItemLink {
   icon: JSX.Element;
   label: string;
   url: string;
   type: "link";
}

export interface ItemButton {
   icon: JSX.Element;
   label: string;
   action: () => any;
   type: "button";
}

export interface Group {
   icon: JSX.Element;
   label: string;
   items: (ItemButton | ItemLink)[];
   type: "group";
}
