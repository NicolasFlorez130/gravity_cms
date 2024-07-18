import { db } from "~/server/db";
import { appointmentConfirmations } from "~/server/db/schemas/appointments";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
   // const headersList = headers();

   // const signature = headersList.get("x-bold-signature") ?? "";

   const body = (await req.json()) as TransactionResult;

   // const strMessage = JSON.stringify(body);

   // const encoded = Buffer.from(strMessage).toString("base64");

   // const hashed = createHmac("sha256", env.BOLD_SECRET_KEY)
   //    .update(encoded)
   //    .digest("hex");

   // const isValidRequest = timingSafeEqual(
   //    Buffer.from(hashed),
   //    Buffer.from(signature),
   // );

   // console.log("isValidRequest:", isValidRequest);

   console.log("owo");

   //TODO: toggle this
   // if (isValidRequest) {
   if (true) {
      if (body.type === "SALE_APPROVED") {
         console.log("body request:", body);

         try {
            const insertResponse = await db
               .insert(appointmentConfirmations)
               .values({
                  bookingId: body.data.metadata.reference as string,
                  paymentReference: body.data.payment_id,
               })
               .returning({ id: appointmentConfirmations.id });

            console.log("insertResponse:", insertResponse);

            Response.json(insertResponse, { status: 200 });
         } catch (error) {
            console.error(error);
            return new Response(null, {
               status: 500,
            });
         }
      }
      return new Response(null, {
         status: 200,
      });
   } else {
      return new Response("Invalid signature", {
         status: 400,
      });
   }
}
