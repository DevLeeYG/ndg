import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";

const prismaCli = new PrismaClient();

const {
  GOOGLE_ID = "",
  GOOGLE_SECRET = "",
  KAKAO_CLIENT_ID = "",
  KAKAO_CLIENT_SECRET = "",
} = process.env;
export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   clientId: GOOGLE_ID,
    //   clientSecret: GOOGLE_SECRET,
    // }),
    // KakaoProvider({
    //   clientId: KAKAO_CLIENT_ID,
    //   clientSecret: KAKAO_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      // 수정
      id: "email-password-credential",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<any, any>, req: NextApiRequest) {
        const user = await prismaCli.user.findUnique({
          where: {
            email: credentials!.email,
          },
          select: {
            email: true,
            password: true,
          },
        });
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      token.userId = 123;
      token.test = "test";
      console.log("token", token);
      return token;
    },
    async session({ session, token, user }) {
      console.log("session######################", session, user, token);
      // console.log("userOrToken", userOrToken);
      return session;
    },
  },
});
