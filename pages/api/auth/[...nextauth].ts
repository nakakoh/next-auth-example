import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: "secret",
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log("sign in callback");
      console.log(user, account, profile, email, credentials);
      return true;
    },
  },
};
export default NextAuth(authOptions);
