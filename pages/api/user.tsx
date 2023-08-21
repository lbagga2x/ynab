import prisma from "../../lib/db";

export default async function handler(req: any, res: any) {
  const users = await prisma.user.findMany();

    res.status(200).json(users)
  }