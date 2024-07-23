"use client";

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "~/components/landing/ui/accordion";
import QuestionsTitle from "~/components/landing/ui/questions_title";

const questions = [
   {
      question: "¿Cuánto tiempo dura un vuelo?",
      answer: `
         El tiempo total de la actividad desde que llegas a Gravity es de aproximadamente 30 a 45 minutos. Primero, tendrás que registrarte y activar la póliza del día en la recepción. Una vez hecho esto, pasarás al alistamiento, donde te pondrás un traje de vuelo, casco, gafas y tapa oídos. Posteriormente, recibirás una breve capacitación sobre cómo realizar el vuelo, la posición de "belly fly", algunas señales y varios temas de seguridad. Dentro de la cámara, estarás el tiempo que desees volar.
      `,
   },
   {
      question: "¿Siempre hay un instructor presente en la cabina de vuelo?",
      answer: `
         Siempre estarás en compañía de nuestro personal. Desde el momento en que inicies la capacitación hasta que termines de volar, estarás acompañado en todo momento por un instructor calificado para brindarte seguridad. Dentro de la cámara, estarás asistido por uno de nuestros instructores, y en la parte exterior habrá otra persona controlando el túnel de viento.
      `,
   },
   {
      question: "Equipo y traje de seguridad durante el vuelo",
      answer: `
         Cuando llegues a la capacitación, debes sacar absolutamente todo lo que tengas en los bolsillos y quitarte cadenas, anillos y aretes que se puedan caer fácilmente. Recuerda que estarás volando con vientos muy poderosos, lo cual puede hacer que pierdas tus objetos. Sin embargo, entrarás con un traje de vuelo, un casco, unas gafas y tapa oídos para que vivas una gran experiencia. No olvides traer tenis; no se permite el ingreso a la cámara con zapatos que no sean de amarrar, zapatos altos, tacones, baletas o crocs.
      `,
   },
   {
      question: "¿Para cancelar una reserva?",
      answer: `
         Sabemos que podrías tener problemas para asistir el día de tu vuelo. Sin embargo, por favor, avísanos al menos un día antes de tu reserva para poder liberar el espacio y permitir que otra persona disfrute de esta mágica experiencia.
      `,
   },
   {
      question: "¿Tenemos un reglamento que debes seguir?",
      answer: `
         Somos una escuela deportiva, y nuestra misión es ayudar a desarrollar el paracaidismo en Colombia. Por ello, es importante que el día de tu vuelo te presentes con buena disposición. Se requiere no haber ingerido alcohol ni ninguna sustancia psicoactiva que impida la correcta atención a la actividad. Siempre estamos del lado de la seguridad para que puedas vivir una experiencia inolvidable.
      `,
   },
   {
      question: "Entiende el funcionamiento del túnel",
      answer: `
         Nuestro túnel funciona con dos poderosos motores que, combinados con unas hélices, actúan como motores de avión, generando vientos desde los 80 km/h hasta los 270 km/h para hacerte flotar y sentir lo que experimenta un paracaidista al caer desde un avión. Dichos motores se controlan desde la cabina de mando, donde la velocidad del viento se ajusta según tu peso.
      `,
   },
   {
      question: "¿Los niños también pueden volar?",
      answer: `
         Por supuesto que sí, desde los 4 años de edad pueden volar.
      `,
   },
   {
      question: "¿Hay alguna restricción de salud que deba tener en cuenta?",
      answer: `
         Lo ideal es que no tengas problemas a nivel cervical, de columna o de hombros, ya que los vientos son fuertes y, al tensionarte, podría llegar a no ser cómodo.
      `,
   },
   {
      question: "¿Pueden volar personas con discapacidad?",
      answer: `
         Claro que sí, nosotros revisamos el nivel de discapacidad de la persona previamente para que puedan vivir esta experiencia.
      `,
   },
   {
      question: "¿Cuál es la altura máxima que se puede alcanzar?",
      answer: `
         Una vez que hayas alcanzado las habilidades necesarias, podrás volar a una altura de… ¡6 metros! No te preocupes por nada, porque nuestros instructores te enseñarán los movimientos básicos para controlar el vuelo.
      `,
   },
   {
      question:
         "¿Es posible realizar el vuelo para principiantes con más personas?",
      answer: `
         Los principiantes solo pueden volar con su instructor, por razones de seguridad. Pero cuando llegues a un nivel experimentado...
      `,
   },
   {
      question:
         "¿Los menores de 18 años necesitan autorización para poder volar?",
      answer: `
         Sí, los menores de edad necesitan autorización de su tutor o representante legal. Además, deben venir acompañados de un adulto.
      `,
   },
   {
      question: "¿Cuál es la duración de la experiencia?",
      answer: `
         Para los principiantes recomendamos paquetes entre 2 y 5 minutos. No es aconsejable volar más de 20 minutos al día en estos casos.
      `,
   },
];

interface IQuestions {}

export default function Questions({}: IQuestions) {
   return (
      <section className="bg-bg_light py-8">
         <div className="mb-14">
            <QuestionsTitle />
         </div>
         <div className="px-3 lg:px-36">
            <Accordion type="multiple" className="grid w-full gap-3">
               {questions.map(({ question, answer }, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                     <AccordionTrigger>{question}</AccordionTrigger>
                     <AccordionContent>{answer}</AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </section>
   );
}
