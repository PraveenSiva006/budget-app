import * as z from "zod";

export const accountFormSchema = z.object({
  accName: z
    .string({ error: "This field is required" })
    .min(1, "This field is required"),
  accType: z.string().min(1, "Please select an item"),
  accNum: z.string().optional(),
});
