// src/inngest/functions.ts
import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();

export const execute = inngest.createFunction(
  { id: "execute-ai", triggers: [{ event: "execute/ai" }] },
  async ({ event, step }) => {
    await step.sleep("pretend", "5s");

    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, 
      {
        model: google("gemini-3.6-flash"),
        system: "You are a helpful assistant.",
        prompt: "What is 2+2?",
        experimental_telemetry: {
          isEnabled: true,
          recordInputs: true,
          recordOutputs: true,
        },
     }); 

    return steps;
  },
);