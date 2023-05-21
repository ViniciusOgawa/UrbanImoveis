import { hashSync } from "bcryptjs"
import { z } from "zod"

const userSchema = z.object({
    name: z.string().max(45),
    email: z.string().max(45).email(),
    admin: z.boolean().optional().default(false),
    password: z.string().max(120)
});

const returnUserSchema = userSchema.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
}).omit({
    password: true
})

const userUpdateSchema = userSchema.partial().omit({
    admin: true
});

const returnArrayUserSchema = returnUserSchema.array();

export { userSchema, returnUserSchema, returnArrayUserSchema, userUpdateSchema }