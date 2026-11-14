import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createFarmer, getFarmerByEmail } from "../_services/apiFarmers.mjs";

// console.log(process.env.AUTH_GOOGLE_CLIENT_SECRET);

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getFarmerByEmail(user.email);

        if (existingGuest === null)
          await createFarmer({
            email: user.email,
            name: user.name,
            image: user.image,
          });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const farmer = await getFarmerByEmail(session.user.email);
      session.user.farmerId = farmer.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
