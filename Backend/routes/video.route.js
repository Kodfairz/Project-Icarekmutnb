import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const videoRoutes = new Elysia({ prefix : "/video" })
.get("/", async () => {
    const video = await prisma.video_links.findMany({
    
    })

    if(!video) {
        throw new Error("ไม่สามารถเรียกวิดีโอได้");
    }

    return {
        "resultData" : video
    }
})
.get("/video-recommend", async () => {
    const video = await prisma.video_links.findMany({
        orderBy: {
            views: 'desc', 
        },
        take: 6 ,
        where : {
            isActive : true 
        }
    });

    if(!video) {
        throw new Error("ไม่สามารถเรียกวิดีโอได้");
    }

    return {
        "resultData" : video
    }
})
.get("/user", async () => {
    const video = await prisma.video_links.findMany({
        where : {
            isActive : true
        }
    })

    if(!video) {
        throw new Error("ไม่สามารถเรียกวิดีโอได้");
    }

    return {
        "resultData" : video
    }
})
.post("/", async ({ body }) => {
    const video = await prisma.video_links.findFirst({
        where : {
            title : body.title
        }
    })

    if(video) {
        throw new Error("ชื่อวิดีโอซ้ำ")
    }

    const newVideo = await prisma.video_links.create({
        data : {
            title : body.title,
            url : body.url,
            description : body.description,
            isActive : true,
            thumbnail_url : body.thumbnail_url,
            user_id : Number(body.user_id),
            update_id  : Number(body.update_id),
            views : 0
        }
    })

    if(!newVideo) {
        throw new Error("ไม่สามารถเพิ่มวิดีโอได้");
    }

    return {
        "message" : "เพิ่มวิดีโอสำเร็จ"
    }
})
.put("/:id", async ({ body, params }) => {
    const video = await prisma.video_links.findFirst({
        where : {
            id : Number(params.id)
        }
    })

    if(!video) {
        throw new Error("ไม่เจอวิดีโอ")
    }

    const updateVideo = await prisma.video_links.update({
        where : {
            id : Number(params.id)
        },
        data : {
            title : body.title,
            url : body.url,
            description : body.description,
            isActive : body.isActive,
            thumbnail_url : body.thumbnail_url,
            update_id  : Number(body.update_id),
           
        }
    })

    if(!updateVideo) {
        throw new Error("แก้ไขวิดีโอไม่สำเร็จ")
    }

    return {
        "message" : "แก้ไขวิดีโอสำเร็จ"
    }
})
.get("/:id", async ({ params }) => {
    const video = await prisma.video_links.findFirst({
        where : {
            id : Number(params.id)
        },
        include : {
            users_video_links_update_idTousers : true,
            users_video_links_user_idTousers : true
        }
    })

    if(!video) {
        throw new Error("ไม่มีวิดีโอ")
    }

    const updateVideo = await prisma.video_links.update({
        where : {
            id : Number(params.id)
        },
        data : {
            views : video.views + 1
        }
    })

    return {
        "resultData" : video
    }
})
.delete("/:id", async ({ params }) => {
    const video = await prisma.video_links.findFirst({
        where : {
            id : Number(params.id)
        }
    })

    if(!video) {
        throw new Error("ไม่มีวิดีโอ");
    }

    const deleteVideo = await prisma.video_links.delete({
        where : {
            id : Number(params.id)
        }
    })

    if(!deleteVideo) {
        throw new Error("ลบวิดีโอไม่สำเร็จ")
    }

    return {
        "message" : "ลบวิดีโอสำเร็จ"
    }
})
.patch("/change-status/:id", async ({ body, params }) => {
    const video = await prisma.video_links.findFirst({
        where : {
            id : Number(params.id)
        }
    })

    if(!video) {
        throw new Error("ไม่เจอวิดีโอ")
    }

    const updateVideo = await prisma.video_links.update({
        data : {
            isActive : body.isActive,
            updated_at : new Date()
        },
        where : {
            id : Number(params.id)
        }
    })

    if(!updateVideo) {
        throw new Error("ไม่สามารถเปลี่ยนแปลงสถานะการเผยแพร่ได้")
    }

    return {
        "message" : "เปลี่ยนสถานะสำเร็จ"
    }

})