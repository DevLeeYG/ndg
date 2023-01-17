import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { URLSearchParams } from "url";

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

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      // Initial sign in
      if (account && user) {
        console.log("refresh", token);
        return {
          accessToken: account?.access_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account?.id_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token?.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

// CredentialsProvider({
//   // 수정
//   id: "email-password-credential",
//   name: "Credentials",
//   type: "credentials",
//   credentials: {
//     email: { label: "Email", type: "email", placeholder: "test@test.com" },
//     password: { label: "Password", type: "password" },
//   },
//   async authorize(credentials: Record<any, any>, req: NextApiRequest) {
//     const user = await axios.post(
//       `${process.env.NEXTAUTH_URL}/api/auth/login`,
//       {
//         email: credentials.email,
//         password: credentials.password,
//       }
//     );
//     console.log("ACCESS", user.data.access_token);
//     const email = user.data;
//     const status = user.status;
//     if (email === credentials.email || status == 200) return credentials;
//     else "로그인 실패";
//   },
// }),

// async function refreshAccessToken(token: any) {
//   console.log("UPDATE");
//   const refresh = await axios
//     .post("/token/refresh/", {
//       refresh: token.refreshToken,
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   if (refresh && refresh.status === 200 && refresh.data.access) {
//     return {
//       ...token,
//       accessToken: refresh.data.access,
//       expiresAt: Date.now() + 10 * 1000,
//     };
//   }
//   return {
//     ...token,
//     error: "RefreshAccessTokenError",
//   };
// }

// http://localhost:3000/api/auth/session?update
