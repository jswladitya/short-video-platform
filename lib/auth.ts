// next-auth options
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./db";
import UserModel from "../models/User";

export const authOptions: NextAuthOptions = {
//step 1
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

    //   sign-in code
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          await connectToDatabase();
          const user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email please register");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };

        } catch (error) {
        //   console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],

//step 2
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session; //Now this session has the user inforamation so, it can be used anywhere
    },
  },

//step 3
  pages: {
    signIn: "/login",
    error: "/login",
  },

//step 4
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

//step 5
  secret: process.env.NEXTAUTH_SECRET,
};