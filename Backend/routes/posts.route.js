import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const postRoutes = new Elysia({ prefix: "/posts" })
.post("/", async ({ body }) => {
    const post = await prisma.posts.findFirst({
        where : {
            title : body.title
        }
    })

    if(post) {
        throw new Error("มีข้อมูลนี้แล้ว")
    }

    const newPost = await prisma.posts.create({
        data : {
            title : body.title,
            category_id : Number(body.category_id),
            cover_image_url : body.cover_image_url,
            video_link : body.video_link,
            content : body.content,
            isActive : body.isActive
        }
    })

    if(!newPost) {
        throw new Error("เพิ่มข้อมูลไม่สำเร็จ")
    }

    return {
        "message" : "เพิ่มข้อมูลสำเร็จแล้ว"
    }
})
.get("/", async () => {
    const posts = await prisma.posts.findMany({
        where : {
            isActive : true
        },
        include : {
            category : true
        }
    })

    if(!posts) {
        throw new Error("ไม่สามารถเรียกข้อมูลได้")
    }

    return {
        "resultData" : posts
    }
})
.get("/admin", async () => {
    const posts = await prisma.posts.findMany({
        include : {
            category : true
        }
    })

    if(!posts) {
        throw new Error("ไม่สามารถเรียกข้อมูลได้")
    }

    return {
        "resultData" : posts
    }
})
.patch("/change-status/:id", async ({ body, params }) => {
    const post = await prisma.posts.findFirst({
        where : {
            id : Number(params.id)
        }
    })

    if(!post) {
        throw new Error("ไม่เจอข้อมูล")
    }

    const updatePost = await prisma.posts.update({
        data : {
            isActive : body.isActive,
            updated_at : new Date()
        },
        where : {
            id : Number(params.id)
        }
    })

    if(!updatePost) {
        throw new Error("ไม่สามารถเปลี่ยนแปลงสถานะการเผยแพร่ได้")
    }

    return {
        "message" : "เปลี่ยนสถานะสำเร็จ"
    }

})
.delete("/:id", async ({ params }) => {
    const post = await prisma.posts.findFirst({
        where : {
            id : Number(params.id)
        }
    })

    if(!post) {
        throw new Error("ไม่เจอข้อมูล")
    }

    const deletePost = await prisma.posts.delete({
        where : {
            id : Number(params.id)
        }
    })

    if(!deletePost) {
        throw new Error("ไม่สามารถลบข้อมูลได้")
    }

    return {
        "message" : "ลบข้อมูลสำเร็จ"
    }
})
.get("/:id", async ({ params }) => {
    const post = await prisma.posts.findFirst({
        where : {
            id : Number(params.id)
        }
    })

    if(!post) {
        throw new Error("ไม่เจอข้อมูล")
    }

    return {
        "resultData" : post
    }
})
.put("/:id", async ({ body, params }) => {
    const post = await prisma.posts.findFirst({
        where : {
            id : Number(params.id)
        }
    })

    if(!post) {
        throw new Error("ไม่เจอข้อมูล")
    }

    const updatePost = await prisma.posts.update({
        where : {
            id : Number(params.id)
        },
        data : {
            title : body.title,
            category_id : Number(body.category_id),
            cover_image_url : body.cover_image_url,
            video_link : body.video_link,
            content : body.content,
            isActive : body.isActive,
            updated_at : new Date()
        }
    })

    if(!updatePost) {
        throw new Error("ไม่สามารถแก้ไขข้อมูลได้")
    }

    return {
        "message" : "แก้ไขข้อมูลสำเร็จ"
    }
})
