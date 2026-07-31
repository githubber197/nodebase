import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db"
import { tr } from "date-fns/locale";
//import { PrismaClient } from "@/generated/prisma/client";
import { polarClient } from "./polar";

export const auth = betterAuth({
    database: prismaAdapter(prisma, { provider: "postgresql", }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "24cbfe21-4d9c-4b5a-84be-606110600fc4",
                            slug: "pro",
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true,
                }),
                portal()
            ],
        })
    ]
});
