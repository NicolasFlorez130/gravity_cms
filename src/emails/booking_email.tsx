import {
   Body,
   Column,
   Container,
   Font,
   Head,
   Heading,
   Html,
   Img,
   Link,
   Preview,
   Row,
   Section,
   Tailwind,
   Text,
} from "@react-email/components";
import { formatCurrency, translatePaymentMethod } from "~/lib/utils";

type IBookingEmail = {
   clientNames: string;
   clientPhoneNumber: string;
   clientEmail: string;
   totalAmount: number;
   paid: boolean;
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
   paid,
}: IBookingEmail) {
   return (
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
            {paid ? "Vuelo agendado" : "Vuelo pendiente de pago"} - Gravity
         </Preview>
         <Tailwind>
            <Body>
               <Container className="max-w-2xl bg-[#061014] px-6 py-10 text-white">
                  <Section className="mx-auto block w-max items-center justify-center">
                     <Column>
                        <Img
                           src="https://y5xkxdkbvyc13ocb.public.blob.vercel-storage.com/icons/gravity_icon-Nit1LTKm9phiO68z7NHZuwZgHhtVJ9.png"
                           alt="gravity logo"
                           className="aspect-square h-20 object-contain"
                        />
                     </Column>
                     <Column className="w-2" />
                     <Column>
                        <Text className="flex w-max items-center text-sm font-light tracking-[.5rem]">
                           <span className="text-[#00eeff]">ZERO</span>
                           <span>GRAVITY</span>
                        </Text>
                     </Column>
                  </Section>
                  <Row className="h-2">{true}</Row>
                  <Section>
                     <Heading
                        as="h1"
                        className="w-full text-center text-4xl font-light tracking-tighter"
                     >
                        BIENVENIDO A GRAVITY
                     </Heading>
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
                        {
                           label: "Número de celular",
                           value: clientPhoneNumber,
                        },
                        { label: "Correo electrónico", value: clientEmail },
                        {
                           label: "Total a pagar",
                           value: formatCurrency(totalAmount),
                        },
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
                  {!paid && (
                     <Section className="mx-auto flex w-max flex-col items-center justify-center">
                        <Row>
                           <Text className="text-center">
                              Ten en cuenta que tu reserva no será confirmada ni
                              apartada hasta que se haya realizado el pago
                              completo
                           </Text>
                        </Row>
                        <Row className="h-2">{true}</Row>
                        <Row>
                           <Link
                              href={paymentLink}
                              className="mx-auto block h-max w-max rounded-full border-3 border-solid border-[#00eeff] px-6 py-4 font-bold tracking-widest text-white !no-underline transition-all visited:!text-white hover:-translate-y-1 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:brightness-75 disabled:pointer-events-none disabled:opacity-50"
                           >
                              PAGAR AHORA
                           </Link>
                        </Row>
                     </Section>
                  )}
               </Container>
            </Body>
         </Tailwind>
      </Html>
   );
}

BookingEmail.PreviewProps = {
   clientNames: "Nicolas Florez",
   clientPhoneNumber: "3118434571",
   clientEmail: "nmflorezr@gmail.com",
   totalAmount: 100000,
   paymentMethod: "ONLINE",
   paymentLink: "https://www.google.com",
   paid: false,
} satisfies IBookingEmail;

export function getBookingEmail(props: IBookingEmail) {
   return <BookingEmail {...props} />;
}
