"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

export default function signUp() {
  const router = useRouter();
  const signup = async (e: any) => {
    // 원래 실행되는 이벤트 취소
    e.preventDefault();
    // Form 안에서 이메일, 패스워드 가져오기
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await axios.post("http://api.localhost:3000/api/signup", {
      email,
      password,
    });
    console.log("@@@###", response);
  };

  return (
    <>
      <form onSubmit={signup}>
        <label>
          이메일 :
          <input type="email" name="email" placeholder="test@test.com" />
        </label>
        <label>
          비밀번호 :
          <input type="password" name="password" />
        </label>
        <button type="submit">회원가입</button>
      </form>
    </>
  );
}
