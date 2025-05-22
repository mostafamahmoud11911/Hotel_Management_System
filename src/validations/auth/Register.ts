import zod from "zod";


export const registerSchema = zod.object({
    userName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8).max(32),
    confirmPassword: zod.string().min(8).max(32),  
    phoneNumber: zod.string().min(11).max(11),
    country: zod.string().min(2),
    role: zod.string().optional(),
    profileImage: zod.instanceof(FileList).optional().nullable()
}).refine((data) => data.password === data.confirmPassword, { message: "Password and Confirm Password must be same", path: ["confirmPassword"] });


