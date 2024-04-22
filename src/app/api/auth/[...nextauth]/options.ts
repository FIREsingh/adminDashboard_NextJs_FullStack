import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import UserModel from "@/app/model/UserModel";

export const authOptions: NextAuthOptions = {
  providers: [
    //==== credentials Provider =====
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<any> => {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [{ email: credentials?.email }],
          });
          if (!user) {
            throw new Error("No user found");
          }
          if (!user.isVerified) {
            throw new Error("Do Email verification before login");
          }
          const isPasswordValid = bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          } else {
            return user;
          }
        } catch (err: any) {
          console.log("Error cought in try-catch of auth/options:", err);
          throw new Error(err);
        }
      },
    }),
    //===== github provider ======
    //====== google provider =====
  ],
  //==== callbacks ======
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
