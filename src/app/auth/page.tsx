import { type Metadata } from "next";
import LoginView from "./views/login_view";

export const metadata: Metadata = {
   title: "Iniciar sesión",
   description: "",
};

interface IPage {}

export default function Page({}: IPage) {
   return <LoginView />;
}
