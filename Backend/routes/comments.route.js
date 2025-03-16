import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const commentRoutes = new Elysia({ prefix : "/comments" })
.post("/", async ({ body }) => {
    const comment = await prisma.comments.create({
        data : {
            value : body.value
        }
    })

    if(!comment) {
        throw new Error("ไม่สามารถส่งข้อความ")
    }

    return {
        "message" : "ส่งข้อความสำเร็จ"
    }
})
.get("/", async ({ body }) => {
    const comments = await prisma.comments.findMany({
        orderBy: {
            created_at: 'desc'
        }
    })

    if(!comments) {
        throw new Error("ไม่สามารถเรียกข้อความทั้งหมดได้")
    }

    return {
        "resultData" : comments
    }
})