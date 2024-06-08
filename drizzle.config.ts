import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
   schema: "./src/server/db/schemas/_index.ts",
   dialect: "postgresql",
   dbCredentials: {
      url: env.POSTGRES_URL,
   },
   tablesFilter: ["gravity_*"],
} satisfies Config;
