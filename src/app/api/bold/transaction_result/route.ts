import { createHmac } from "crypto";
import { headers } from "next/headers";
import { env } from "~/env";
import { db } from "~/server/db";
import { appointmentConfirmations } from "~/server/db/schemas/appointments";

function verifySignature(
   bodyString: string,
   headerSignature: string,
   secretKey: string,
) {
   // Convertir el cuerpo a formato Base64
   const bodyBase64 = Buffer.from(bodyString).toString("base64");

   // Cifrar el cuerpo en Base64 utilizando HMAC-SHA256
   const hmac = createHmac("sha256", secretKey);
   hmac.update(bodyBase64);
   const generatedSignature = hmac.digest("hex");

   // Comparar el resultado obtenido con el valor del encabezado
   return generatedSignature === headerSignature;
}

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
   const headersList = headers();

   const bodyString = await req.text();

   const signature = headersList.get("x-bold-signature") ?? "";

   const body = JSON.parse(bodyString) as TransactionResult;

   const isValidRequest = verifySignature(
      bodyString,
      signature,
      env.BOLD_SECRET_KEY,
   );

   if (isValidRequest) {
      if (body.type === "SALE_APPROVED") {
         try {
            const insertResponse = await db
               .insert(appointmentConfirmations)
               .values({
                  bookingId: body.data.metadata.reference as string,
                  paymentReference: body.data.payment_id,
               })
               .returning({ id: appointmentConfirmations.id });

            Response.json(insertResponse, { status: 200 });
         } catch (error) {
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
