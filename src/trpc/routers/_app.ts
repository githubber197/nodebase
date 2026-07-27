
import { inngest } from '@/inngest/client';
import {  createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { email } from 'zod';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';


export const appRouter = createTRPCRouter({
  testAI: protectedProcedure.mutation( async () => {
    await inngest.send({
      name: "execute/ai"
    });
    return { success: true, message: "Job queued"}
  }),
    getWorkflows: protectedProcedure.query(({ ctx }) => {
      return prisma.workflow.findMany();
      }),
      createWorkflow: protectedProcedure.mutation(async () => {
        await inngest.send({
          name: "test/processTask",
          data: {
            email: "rajeev@gmail.com"
          },
        });
        return { success: true, message: "Job queued"}
    }),
});
 
// export type definition of API
export type AppRouter = typeof appRouter;