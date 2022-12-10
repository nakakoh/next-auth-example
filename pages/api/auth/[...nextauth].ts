import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { randomBytes, randomUUID } from "crypto";
import { PrismaClient, Session, User } from '@prisma/client'
const prisma = new PrismaClient()

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
    async session({ session, token, user}: any) {
      console.log("session", session);
      console.log("user", user);
      if (user?.role) {
        session.user.role = user.role;
      }
      console.log("role", session.user.role)
      return session;
    },
  },
};

export default NextAuth(authOptions);
