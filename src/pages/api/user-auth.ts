import { NextApiRequest, NextApiResponse } from "next";
import * as argon from "argon2";
import { prisma } from "@/server";

import { LoginSchema, validateData } from "@/validations";
import { signJWT } from "@/utils/sign-jwt.util";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") res.status(404).json({ message: "Not found" });

  try {
    await validateData({ schema: LoginSchema, data: req.body });
  } catch (error) {
    res.status(400).json({ message: "Invalid input" });
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user == null) res.status(401).json({ message: "El usuario no existe" });

  const passwordIsValid = await argon.verify(user!.password, password);

  if (!passwordIsValid) {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const token = signJWT({
    userId: user!.id,
    email: user!.email,
    organizationId: user!.organizationId,
  });

  res?.setHeader("Authorization", `Bearer ${token}`);

  const clientData = {
    id: user!.id,
    email: user!.email,
    name: user!.name,
    last_name: user!.last_name,
  };

  res.status(200).json(clientData);
}
