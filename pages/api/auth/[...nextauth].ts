import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest } from "next";
import axios from "axios";

const {
  GOOGLE_ID = "",
  GOOGLE_SECRET = "",
  KAKAO_CLIENT_ID = "",
  KAKAO_CLIENT_SECRET = "",
} = process.env;
export default NextAuth({
  providers: [
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
        const user = await axios.post(`http://localhost:3000/api/auth/login`, {
          email: credentials.email,
          password: credentials.password,
        });

        return credentials;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, isNewUser, user }) {
      // Persist the OAuth access_token to the token right after signin
      console.log("!@$@$!$!@$!$!@$!", token);
      console.log("!@$@$!$!@$!$!@$!", account);
      console.log("!@$@$!$!@$!$!@$!", isNewUser);
      console.log("!@$@$!$!@$!$!@$!", user);
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      return session;
    },
  },
});
// GoogleProvider({
//   clientId: GOOGLE_ID,
//   clientSecret: GOOGLE_SECRET,
// }),
// KakaoProvider({
//   clientId: KAKAO_CLIENT_ID,
//   clientSecret: KAKAO_CLIENT_SECRET,
// }),
