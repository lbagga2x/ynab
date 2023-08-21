/*
 * @Author: Lalit Bagga 
 * @Date: 2023-08-18 17:28:08 
 * @Last Modified by: Lalit Bagga
 * @Last Modified time: 2023-08-20 21:28:04
 */
import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}
const prisma = new PrismaClient()

if (process.env.NODE_ENV === 'development') {
  if (!global.cachedPrisma) {
    global.cachedPrisma = prisma;
  }
}

export default prisma