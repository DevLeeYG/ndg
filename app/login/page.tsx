"use client";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Login() {
  const params = {
    key: process.env.KAKAO_CLIENT_ID,
  };

  console.log(params.key);

  const login = async (e: any) => {
    // 원래 실행되는 이벤트 취소
    e.preventDefault();
    // Form 안에서 이메일, 패스워드 가져오기
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await signIn("email-password-credential", {
      email,
      password,
      redirect: false,
    });
    console.log("1414141", response);
  };

  async function getData() {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`
    );

    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
  }
  const { data: session } = useSession();
  console.log("1231312313", session);
  if (session) {
    return (
      <>
        안녕하세요 {session?.user?.name} 님
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <form onSubmit={login}>
        <div onClick={getData}>asdf</div>
        {/* <label>
          <input type="email" name="email" placeholder="test@test.com" />
        </label>
        <label>
          비밀번호 :
          <input type="password" name="password" />
        </label>
        <button type="submit">로그인</button> */}
        <button type="button" onClick={() => signIn("google")}>
          Google
        </button>
        <button type="button" onClick={() => signIn("kakao")}>
          kakao
        </button>
      </form>
    </>
  );
}
