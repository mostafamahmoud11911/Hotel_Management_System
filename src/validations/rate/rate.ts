import z from "zod";

export const roomReviewSchema = z.object({
  roomId: z
    .string()
    .min(1, { message: "Room ID is required" })
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid room ID format" }),
  rating: z
    .number()
    .int({ message: "Rating must be an integer" })
    .min(1)
    .max(5),
  review: z
    .string()
    .min(10, { message: "Review should be at least 10 characters" })
    .max(500)
    .trim(),
});

