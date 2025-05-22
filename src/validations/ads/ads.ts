import zod from "zod";

const AdsSchema = zod.object({
  room: zod.string().min(1, { message: "Please select a room" }),
  discount: zod.number().min(1, { message: "Please select a discount" }),
  isActive: zod.string(),
});

export default AdsSchema;
