import * as z from "zod";

export const apiErrorSchema = z.object({
  statusCode: z.number(),
  code: z.string(),
  message: z.string(),
  timestamp: z.string(),
  path: z.string(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
export class ApiResponse<T> {
  constructor(
    public readonly data: T,
    public readonly meta?: unknown,
  ) {}
}
