import NextAuth from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";

const prismaCli = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const user = await prismaCli.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        email: true,
        password: true,
      },
    });
    if (!user) {
      await prismaCli.user.create({
        data: {
          email: req.body.email,
          password: req.body.email,
        },
      });
      res.status(200).send("회원가입성공");
    } else {
      res.status(500).send("실패");
    }
  }
}

export default handler;

// console.log(req.body.email);
