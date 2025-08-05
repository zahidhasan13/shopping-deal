import User from "@/models/userModel";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const authOption = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email!");
        }
        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isMatch) {
          throw new Error("Incorrect Password!");
        }
        return {
          id: user._id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user: authUser, account }) {
  if (!account) {
    return true; // Early return if no account
  }

  console.log("signIn callback triggered:", authUser, account);

  try {
    await dbConnect();

    const { providerAccountId, provider } = account;
    const { name, email: user_email, image } = authUser;

    const payload = {
      providerAccountId,
      provider,
      name,
      email: user_email,
      image,
    };
    console.log("User payload:", payload);

    const existingUser = await User.findOne({ providerAccountId });

    if (!existingUser) {
      const newUser = await User.create(payload);
      console.log("New user created:", newUser);
    } else {
      console.log("User already exists:", existingUser);
    }

    return true;
  } catch (error) {
    console.error("SignIn error:", error);
    return false;
  }
},

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user._id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
