import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categoryRoutes = new Elysia({ prefix : "/category" })
.get("/", async () => {
    const category = await prisma.category.findMany({})

    return {
        "resultData" : category
    }
})
.post("/", async ({ body }) => {
    const category = await prisma.category.findFirst({
        where : {
            name : body.name
        }
    })

    if(category) {
        throw new Error("ชื่อประเภทโรคซ้ำ")
    }

    const newCategory = await prisma.category.create({
        data : {
            name : body.name
        }
    })
    
    if(!newCategory) {
        throw new Error("สร้างประเภทโรคไม่สำเร็จ")
    }

    return {
        "message" : "สร้างประเภทโรคสำเร็จแล้ว"
    }
})
.put("/:id", async ({ body, params }) => {
    const category = await prisma.category.findFirst({
        where : {
            id : Number(params.id)
        }
    })

    if(!category) {
        throw new Error("ไม่พบไอดีประเภทโรค")
    }

    const editCategory = await prisma.category.update({
        where : {
            id : Number(params.id),
        },
        data : {
            name : body.name
        }
    })

    if(!editCategory) {
        throw new Error("แก้ไขประเภทโรคไม่สำเร็จ")
    }

    return {
        "message" : "แก้ไขประเภทโรคสำเร็จ"
    }
})
.delete("/:id", async ({ params }) => {
    const category = await prisma.category.findFirst({
        where : {
            id : Number(params.id)
        },
    })

    if(!category) {
        throw new Error("ไม่พบประเภทโรค")
    }

    const deleteCategory = await prisma.category.delete({
        where : {
            id : Number(params.id)
        }
    })

    if(!deleteCategory) {
        throw new Error("ลบประเภทโรคไม่สำเร็จ")
    }

    return {
        "message" : "ลบประเภทโรคสำเร็จ"
    }
})
.get("/:id", async ({ params }) => {
    const category = await prisma.category.findFirst({
        where : {
            id : Number(params.id)
        }
    })

    if(!category) {
        throw new Error("ไม่สามารถเรียกข้อมูลประเภทโรคได้")
    }

    return {
        "resultData" : category
    }
})