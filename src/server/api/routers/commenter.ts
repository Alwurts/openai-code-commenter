import { TRPCError } from "@trpc/server";
import { Configuration, OpenAIApi } from "openai";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const commenterRouter = createTRPCRouter({
  commentCode: publicProcedure
    .input(
      z.object({ code: z.string().min(1).max(1000), userId: z.string().min(1) })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      let aiResponse;
      try {
        aiResponse = await openai.createCompletion({
          model: "code-davinci-002",
          prompt:
            "Use JavaScript comments to explain the relevant lines of the following code:\n\n'" +
            input.code +
            "'\n\nHere is explicitily only the original code plus the comments without any new parts:\n",
          temperature: 0.1,
          max_tokens: 350,
          top_p: 0,
          frequency_penalty: 1.5,
          presence_penalty: -1.1,
          stop: ['"""'],
        });
        console.log("aiResponse");
        console.log(aiResponse);
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
          cause: error,
        });
      }
      if (!aiResponse?.data.choices[0]?.text) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred, please try again later.",
        });
      }

      try {
        const prismaCreate = await prisma.commentRequest.create({
          data: {
            userId: input.userId,
            originalCode: input.code,
            commentedCode: aiResponse.data.choices[0].text,
          },
        });
      } catch (error) {
        console.log(error);
      }

      return {
        commentedCode: aiResponse.data.choices[0].text,
      };
    }),
});
