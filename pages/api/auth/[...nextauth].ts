import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("sign in callback");
      console.log(user, account, profile, email, credentials);
      return true;
    },
    async session({ session, user}) {
      console.log("session", session);
      console.log("user", user);
      if (session?.user && user?.role) {
        session.user.role = user.role;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
