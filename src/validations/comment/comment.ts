import z from "zod";

export const roomCommentSchema = z.object({
  roomId: z
    .string()
    .min(1, { message: "Room ID is required" })
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid room ID format" }),
  comment: z
    .string()
    .min(10, { message: "Comment should be at least 10 characters" })
});

