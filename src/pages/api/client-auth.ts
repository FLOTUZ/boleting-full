import { NextApiRequest, NextApiResponse } from "next";
import * as argon from "argon2";
import { prisma } from "@/server";

import jwt from "jsonwebtoken";
import { LoginClientSchema, validateData } from "@/validations";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") res.status(404).json({ message: "Not found" });

  try {
    await validateData({ schema: LoginClientSchema, data: req.body });
  } catch (error) {
    res.status(400).json({ message: "Invalid input" });
  }
  const { email, password } = req.body;

  const client = await prisma.userClient.findUnique({
    where: { email },
  });

  if (client == null) res.status(401).json({ message: "El usuario no existe" });

  const passwordIsValid = await argon.verify(client!.password, password);

  if (!passwordIsValid) {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const token = jwt.sign(
    {
      id: client!.id,
      email: client!.email,
    },
    process.env.JWT_SECRET as string
  );

  res?.setHeader("Authorization", `Bearer ${token}`);

  const clientData = {
    id: client!.id,
    email: client!.email,
    name: client!.name,
    last_name: client!.last_name,
  };

  res.status(200).json(clientData);
}
