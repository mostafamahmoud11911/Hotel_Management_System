import zod from "zod";


const resetSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8).max(32),
    confirmPassword: zod.string().min(8).max(32),
    seed: zod.string().min(3).max(32),
})


export default resetSchema;