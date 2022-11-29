"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import UserCard from "./userCard";
export default function Login() {
  const { data: session } = useSession();
  {
    /**
    get session from nextAuth
    if the user exists -> show a Sign Out button and their infomation
    if a user doesn't exist -> show a Sign In button
 */
  }

  if (session) {
    return (
      <>
        <button onClick={() => signOut()} type="button">
          Sign Out of Google
        </button>
        <UserCard user={session.user} />
      </>
    );
  } else {
    return (
      <>
        <button onClick={() => signIn()} type="button">
          Sign Out of Google
        </button>
      </>
    );
  }
}
