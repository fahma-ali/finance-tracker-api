import zod from 'zod';
export const createUserSchema = zod.object({
    name: zod.string().min(1, "Name is Required"),
    email: zod.string().email("Email must be Valid"),
    password: zod.string().min(8, "password must be at least 8 characters").regex(/[A-z]/, "must include at least one Uppercase Letter").regex(/[a-z]/, "must include at least one lowercase letter").regex(/[0-9]/, "must include at least one number").regex(/[^A-Za-z0-9]/, "must include at least one special character")

});
export const loginSchema = zod.object({
    email: zod.string().trim().toLowerCase().email("Invalid email"),
    password: zod.string().min(1, "Password is required"),
});