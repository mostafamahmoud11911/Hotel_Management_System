import z from "zod"


const changeSchema = z.object({
    oldPassword: z.string().min(8).max(32),
    newPassword: z.string().min(8).max(32),
    confirmPassword: z.string().min(8).max(32),
}).refine((data) => data.newPassword === data.confirmPassword, { message: "Password and Confirm Password must be same", path: ["confirmPassword"] });

export default changeSchema