import jwt from "jsonwebtoken";

export const signJWT = ({
  userId,
  email,
  organizationId: organizationId,
}: {
  userId: number;
  email: string;
  organizationId?: number;
}) => {
  return jwt.sign(
    {
      id: userId,
      email: email,
      type: organizationId ? "USER" : "CLIENT",
      organizationId: organizationId,
    },
    process.env.JWT_SECRET as string
  );
};
