import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
   getServerSession,
   type DefaultSession,
   type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import { db } from "~/server/db/index";
import {
   accounts,
   sessions,
   users,
   verificationTokens,
} from "~/server/db/schemas/_index";
import Google from "next-auth/providers/google";
import { env } from "~/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
   interface Session extends DefaultSession {
      user: {
         id: string;
         // ...other properties
         // role: UserRole;
      } & DefaultSession["user"];
   }

   // interface User {
   //   // ...other properties
   //   // role: UserRole;
   // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
   callbacks: {
      session: ({ session, user }) => ({
         ...session,
         user: {
            ...session.user,
            id: user.id,
         },
      }),
      async signIn(data) {
         if (data.user.email === "nmflorezr@gmail.com") {
            return true;
         }
         return false;
      },
      
   },
   adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
   }) as Adapter,
   providers: [
      Google({
         clientId: env.AUTH_GOOGLE_ID,
         clientSecret: env.AUTH_GOOGLE_SECRET,
      }),
   ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

export const {} = authOptions;
