"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import UserCard from "../userCard";
export default function Login() {
  {
    /**
    get session from nextAuth
    if the user exists -> show a Sign Out button and their infomation
    if a user doesn't exist -> show a Sign In button
 */
  }
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        반갑습니다 {session.user?.name}님<br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn("kakao")}>Kakao</button>
      <button onClick={() => signIn("google")}>Google</button>
    </>
  );
}
