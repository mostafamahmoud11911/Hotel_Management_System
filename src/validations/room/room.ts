import z from "zod";

export const roomSchema = z.object({
  roomNumber: z.string().min(1, { message: "Room number is required" }),
  price: z.number().min(1, { message: "Please enter a price" }),
  capacity: z.number().min(1, { message: "Please enter a capacity" }),
  discount: z.number().min(1, { message: "Please enter a discount" }),
  facilities: z
    .array(z.string())
    .min(1, { message: "Please select at least one facility" }),
  imgs: z.custom((value) => value instanceof FileList),
});
