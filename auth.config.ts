import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Note: authorize logic is moved to auth.ts to avoid Node-specific imports in middleware
      async authorize() {
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
        (session.user as { role?: string }).role = token.role as string | undefined;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
