import { type Metadata } from "next";
import Dashboard from "./views/dashboard";

export const metadata: Metadata = {
   title: "Dashboard",
   description: "",
};

interface IPage {}

export default function Page({}: IPage) {
   return <Dashboard />;
}
