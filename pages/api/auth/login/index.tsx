import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("reqreq", req.body);
  const { email, password } = req.body;
  if (req.method === "POST") {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
      },
    });
    console.log("true?", user?.email === email && user?.password === password);
    if (user?.email === email && user?.password === password) {
      res.status(200).send({ email });
    } else {
      res.status(401).send("정보가 없습니다");
    }
  }
}

export default handler;
