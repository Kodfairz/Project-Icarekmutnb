import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const prisma = new PrismaClient();


export const userRoutes = new Elysia({ prefix: "/users" })
    .get('/', async () => {
        return await prisma.users.findMany()
    })
    .post('/', async ({ body }) => {
        const user = await prisma.users.findFirst({
            where: {
                username: body.username
            }
        })

        if (user) {
            throw new Error("มีผู้ใช้งานนี้แล้ว")
        }

        const password = bcrypt.hashSync(body.password, 10);
        return await prisma.users.create({
            data: {
                username: body.username,
                password: password,
                role: body.role
            }
        })
    })
    .post("/login", async ({ body }) => {
        const user = await prisma.users.findFirst({
            where: {
                username: body.username
            }
        })

        if (!user) {
            throw new Error("ไม่พบผู้ใช้งาน")
        }

        const isPasswordMatch = bcrypt.compareSync(body.password, user.password);

        if (!isPasswordMatch) {
            throw new Error("รหัสผ่านไม่ถูกต้อง")
        }

        const token = jwt.sign({
            data: {
                "username": user.username,
                "role": user.role,
                "id": user.id,
                "isActive": user.isActive
            }
        }, 'secret', { expiresIn: '24h' });

        return {
            "token": token,
            "resultData": {
                "username": user.username,
                "role": user.role,
                "id": user.id,
                "isActive": user.isActive
            }
        };
    })
    .put("/:id", async ({ body, params }) => {
        const user = await prisma.users.findFirst({
            where: {
                id: Number(params.id)
            }
        })

        if (!user) {
            throw new Error("ไม่พบผู้ใช้งาน")
        }

        const updateUser = await prisma.users.update({
            where: {
                id: Number(params.id)
            },
            data: {
                username: body.username
            }
        })

        if (!updateUser) {
            throw new Error("ไม่สามารถแก้ไขข้อมูลได้")
        }

        return {
            "message": "แก้ไขข้อมูลสำเร็จ"
        }
    })

    .put("/change-password/:id", async ({ body, params }) => {
        const user = await prisma.users.findFirst({
            where: {
                id: Number(params.id)
            }
        })

        const isPasswordMatch = bcrypt.compareSync(body.oldPassword, user.password);

        if (!isPasswordMatch) {
            throw new Error("รหัสผ่านเดิมไม่ถูกต้อง")
        }

        const newPassword = bcrypt.hashSync(body.newPassword, 10);

        const updateUser = await prisma.users.update({
            where: {
                id: Number(params.id)
            },
            data: {
                password: newPassword
            }
        })

        if (!updateUser) {
            throw new Error("ไม่สามารถเปลี่ยนรหัสผ่านได้")
        }

        return {
            "message": "เปลี่ยนรหัสผ่านสำเร็จ"
        }
    })
    .patch("/status/:id", async ({ params }) => {
        const user = await prisma.users.findFirst({
            where: {
                id: Number(params.id)
            }
        })

        if (!user) {
            throw new Error("ไม่พบผู้ใช้งาน")
        }

        const updateUser = await prisma.users.update({
            where: {
                id: Number(params.id)
            },
            data: {
                isActive: !user.isActive
            }
        })

        if (!updateUser) {
            throw new Error("ไม่สามารถเปลี่ยนสถานะได้")
        }

        return {
            "message": "เปลี่ยนสถานะสำเร็จ"
        }
    })
    .delete("/:id", async ({ params }) => {
        const user = await prisma.users.findFirst({
            where: {
                id: Number(params.id)
            }
        })

        if (!user) {
            throw new Error("ไม่พบผู้ใช้งาน")
        }

        const deleteUser = await prisma.users.delete({
            where: {
                id: Number(params.id)
            }
        })

        if (!deleteUser) {
            throw new Error("ไม่สามารถลบข้อมูลได้")
        }

        return {
            "message": "ลบข้อมูลสำเร็จ"
        }
    })
    .get("/:id", async ({ params }) => {
        const user = await prisma.users.findFirst({
            where: {
                id: Number(params.id)
            }
        })

        if (!user) {
            throw new Error("ไม่พบผู้ใช้งาน")
        }

        return {
            "resultData": user
        };
    })



