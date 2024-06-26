"use server";

import { RedirectType, redirect } from "next/navigation";

export async function redirectToAuth() {
   return redirect("/auth", RedirectType.replace);
}
