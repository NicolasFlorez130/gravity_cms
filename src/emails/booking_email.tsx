import {
   Column,
   Container,
   Font,
   Head,
   Heading,
   Html,
   Img,
   Preview,
   Row,
   Section,
   Tailwind,
   Text,
} from "@react-email/components";
import tailwindConfig from "tailwind.config";
import { translatePaymentMethod } from "~/lib/utils";

type IBookingEmail = {
   clientNames: string;
   clientPhoneNumber: string;
   clientEmail: string;
   totalAmount: number;
} & (
   | {
        paymentMethod: "ON_SITE" | "LANDING" | "COURTESY";
        paymentLink: undefined;
     }
   | {
        paymentMethod: "ONLINE";
        paymentLink: string;
     }
);

export default function BookingEmail({
   clientEmail,
   clientNames,
   clientPhoneNumber,
   paymentMethod,
   totalAmount,
   paymentLink,
}: IBookingEmail) {
   return (
      <Tailwind config={tailwindConfig}>
         <Html>
            <Head>
               <Font
                  fontFamily="Epilogue"
                  fallbackFontFamily="sans-serif"
                  webFont={{
                     url: "https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap",
                     format: "embedded-opentype",
                  }}
                  fontWeight={400}
                  fontStyle="normal"
               />
            </Head>
            <Preview>
               {paymentMethod === "ONLINE"
                  ? "Vuelo pendiente de pago"
                  : "Vuelo agendado"}{" "}
               - Gravity
            </Preview>
            <Container className="bg-background-black-email max-w-2xl px-6 py-10 text-white">
               <Section className="flex items-center justify-center">
                  <Column>
                     <Img
                        src="https://y5xkxdkbvyc13ocb.public.blob.vercel-storage.com/icons/gravity_icon-Nit1LTKm9phiO68z7NHZuwZgHhtVJ9.png"
                        alt="gravity logo"
                        className="aspect-square h-20 object-contain"
                     />
                  </Column>
                  <Column>
                     <Heading
                        as="h2"
                        className="flex w-max text-sm font-light tracking-[.5rem]"
                     >
                        <Text className="text-primary-email">ZERO</Text>
                        <Text>GRAVITY</Text>
                     </Heading>
                  </Column>
               </Section>
               <Section>
                  <Row>
                     <Heading
                        as="h1"
                        className="w-full text-center text-4xl font-light tracking-tighter"
                     >
                        BIENVENIDO A GRAVITY
                     </Heading>
                  </Row>
               </Section>
               <Section>
                  <Row>
                     <Text className="font-bold">
                        Hola {clientNames.split(" ").at(0)}!
                     </Text>
                     <Text>
                        Estamos felices de que puedas volar con nosotros. A
                        continuación los detalles de tu reserva:
                     </Text>
                  </Row>
                  {[
                     { label: "Cliente", value: clientNames },
                     { label: "Número de celular", value: clientPhoneNumber },
                     { label: "Correo electrónico", value: clientEmail },
                     { label: "Total a pagar", value: totalAmount },
                     {
                        label: "Método de pago",
                        value: translatePaymentMethod(paymentMethod),
                     },
                  ].map(({ label, value }, i) => (
                     <Row key={i} className="flex justify-start">
                        <Column>
                           <Text className="font-semibold">{label}: </Text>
                           <Column className="w-2" />
                        </Column>
                        <Column>
                           <Text>{value}</Text>
                        </Column>
                     </Row>
                  ))}
               </Section>
               {paymentMethod === "ONLINE" && (
                  <Section className="flex justify-center">
                     <Row>
                        <a
                           style={{
                              borderWidth: 10,
                           }}
                           href={paymentLink}
                           className="bg-muted-email h-max rounded-full border-3 px-6 py-4 font-bold tracking-widest text-white transition-all hover:-translate-y-1 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:brightness-75 disabled:pointer-events-none disabled:opacity-50"
                        >
                           Pagar ahora
                        </a>
                     </Row>
                  </Section>
               )}
            </Container>
         </Html>
      </Tailwind>
   );
}

BookingEmail.PreviewProps = {
   clientNames: "Nicolas Florez",
   clientPhoneNumber: "3118434571",
   clientEmail: "nmflorezr@gmail.com",
   totalAmount: 100000,
   paymentMethod: "ONLINE",
   paymentLink: "https://www.google.com",
} satisfies IBookingEmail;
