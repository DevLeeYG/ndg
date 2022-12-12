import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest } from "next";
const {
  GOOGLE_ID = "",
  GOOGLE_SECRET = "",
  KAKAO_CLIENT_ID = "",
  KAKAO_CLIENT_SECRET = "",
} = process.env;
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
    KakaoProvider({
      clientId: KAKAO_CLIENT_ID,
      clientSecret: KAKAO_CLIENT_SECRET,
    }),
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
        return credentials;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
