import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db"
import { tr } from "date-fns/locale";
//import { PrismaClient } from "@/generated/prisma/client";

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql", }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
});
