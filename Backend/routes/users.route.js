import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


export const userRoutes = new Elysia({ prefix : "/users" })
.get('/', async () => {
    return await prisma.users.findMany()
})
.post('/', async ({ body }) => {
    const user = await prisma.users.findFirst({
        where : {
            username : body.username
        }
    })

    if(user) {
         throw new Error("มีผู้ใช้งานนี้แล้ว")
    }

    const password = bcrypt.hashSync(body.password, 10);
    return await prisma.users.create({
        data : {
            username : body.username,
            password : password,
            role : body.role
        }
    })
})
.post("/login", async ({ body }) => {
    const user = await prisma.users.findFirst({
        where : {
            username : body.username
        }
    })

    if(!user) {
        throw new Error("ไม่พบผู้ใช้งาน")
    }

    const isPasswordMatch = bcrypt.compareSync(body.password, user.password);

    if(!isPasswordMatch) {
        throw new Error("รหัสผ่านไม่ถูกต้อง")
    }

    const token = jwt.sign({
        data: {
            "username" : user.username,
            "role" : user.role,
            "id" : user.id,
            "isActive" : user.isActive
        }
      }, 'secret', { expiresIn: '24h' });

    return {
        "token" : token,
        "resultData" : {
            "username" : user.username,
            "role" : user.role,
            "id" : user.id,
            "isActive" : user.isActive
        }
    };
})


