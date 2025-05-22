import zod from "zod"



const forgetSchema = zod.object({
    email: zod.string().email(),
})

export default forgetSchema;