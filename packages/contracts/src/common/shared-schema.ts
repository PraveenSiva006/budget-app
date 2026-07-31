import * as z from "zod";

export const moneySchema = z.string().regex(/^-?\d+(\.\d{1,2})?$/);
