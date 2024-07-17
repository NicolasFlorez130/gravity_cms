"use server";

import { Resend } from "resend";
import { env } from "~/env";

const resend = new Resend(env.RESEND_KEY);

export async function sendEmail(
   props: Parameters<typeof resend.emails.send>[0],
) {
   await resend.emails.send(props);
}
