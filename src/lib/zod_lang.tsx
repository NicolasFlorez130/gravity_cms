import i18next from "i18next";
import { type ZodObject, type ZodRawShape, z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
// Import your language translation files
import es from "zod-i18n-map/locales/es/zod.json";

// lng and resources key depend on your locale.
void i18next.init({
   lng: "es",
   resources: {
      es: { zod: es },
   },
});

z.setErrorMap(zodI18nMap);

// export configured zod instance
export { z };

export function withId<T extends ZodRawShape>(schema: ZodObject<T>) {
   return schema.extend({ id: z.string() });
}
