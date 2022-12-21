"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
export default function Login() {
  const router = useRouter();
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
    console.log(response);
  };

  const { data: session } = useSession();
  console.log("@@@@@@!#!#!#!@", session);

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <form onSubmit={login}>
        <label>
          이메일 :
          <input type="email" name="email" placeholder="test@test.com" />
        </label>
        <label>
          비밀번호 :
          <input type="password" name="password" />
        </label>
        <button type="submit">로그인</button>
      </form>
    </>
  );
}
