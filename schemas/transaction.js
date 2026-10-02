import zod from "zod"
export const createTransactionSchema = zod.object({
    title: zod.string().trim().min(1, "Name is Required"),
    amount: zod.number().positive(),
    type: zod.enum(["income", "expense"]),
    category: zod.string().min(1, "Category is Required"),
    date:zod.coerce.date().optional()
});
export const updateTransactionSchema = createTransactionSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Send at least one field to update",
    });