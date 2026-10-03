import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const requestSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(1).max(160),
  useCase: z.string().trim().min(1).max(100),
  volume: z.string().trim().min(1).max(100),
});

export const submitEarlyAccessRequest = createServerFn({ method: "POST" })
  .validator((input: z.infer<typeof requestSchema>) => requestSchema.parse(input))
  .handler(async ({ data }) => {
    const { enqueueEarlyAccessRequest } = await import("@/lib/early-access.server");
    return enqueueEarlyAccessRequest(data);
  });
