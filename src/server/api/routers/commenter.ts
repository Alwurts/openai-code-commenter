import { Configuration, OpenAIApi } from "openai";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const commenterRouter = createTRPCRouter({
  commentCode: publicProcedure
    .input(z.object({ code: z.string().min(1).max(250) }))
    .mutation(async ({ input }) => {
      return { commentedCode: input.code };
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      try {
        const response = await openai.createCompletion({
          model: "code-davinci-002",
          prompt:
            "Use JavaScript comments to explain the relevant lines of the following code:\n\n'" +
            input.code +
            "'\n\nHere is explicitily only the original code plus the comments without any new parts:\n",
          // prompt: input.code + '\n\n"""\nHere\'s what the above code is doing:\n',
          temperature: 0,
          max_tokens: 150,
          top_p: 0.2,
          frequency_penalty: 1,
          presence_penalty: -1,
          stop: ['"""'],
        });
        if (!response.data) return null;
        console.log(response.data);
        return {
          commentedCode: response.data,
        };
      } catch (error: any) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
    }),
});
