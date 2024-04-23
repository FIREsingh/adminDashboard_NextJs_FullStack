import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import UserModel from "@/app/model/UserModel";

export const authOptions: NextAuthOptions = {
  providers: [
    //==== credentials Provider( from input field) =====
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<any> => {
        //connect to database
        await dbConnect();

        //check user exists or not
        try {
          const user = await UserModel.findOne({
            $or: [{ email: credentials?.email }],
          });
          if (!user) {
            throw new Error("No user found");
          }

          //check user's mail is verified or not using otp.
          if (!user.isVerified) {
            throw new Error("Do Email verification before login");
          }

          //check password is valid or not
          const isPasswordValid = bcrypt.compare(
            credentials?.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          } else {
            //if everything is good then return user (user's data).
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
