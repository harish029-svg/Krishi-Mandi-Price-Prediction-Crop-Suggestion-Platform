import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { createFarmer, getFarmerByEmail } from "../_services/apiFarmers.mjs";

// console.log(process.env.AUTH_GOOGLE_CLIENT_SECRET);

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = String(credentials?.email ?? "")
            .trim()
            .toLowerCase();
          const password = String(credentials?.password ?? "");
          if (!email || !password) return null;

          const user = await getFarmerByEmail(email);
          console.log("INSIDE AUTH.JS");
          console.log(user);

          // No such user, or a Google-only account (no password set)
          if (!user?.password_hash) return null;

          const valid = await bcrypt.compare(password, user.password_hash);
          if (!valid) return null;

          // Never return password_hash here
          return { id: String(user.id), name: user.name, email: user.email };
        } catch (err) {
          console.error("authorize failed:", err);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") return true;
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
