import zod from "zod";

const facilitySchema = zod.object({
  name: zod.string().min(3).max(32),
});

export default facilitySchema;
