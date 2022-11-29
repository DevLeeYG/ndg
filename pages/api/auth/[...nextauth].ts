import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
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
  ],
});
