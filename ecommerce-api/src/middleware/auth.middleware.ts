import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export interface AuthRequest extends Request {
    user?: {
        id: string
        fullname: string
        email: string
        role: string
    }
}

export const AdminAccessMiddleware = async (req: AuthRequest, res: Response, next: NextFunction)=>{
    try {
        const authorization = req.headers.authorization

        if(!authorization)
            throw new Error("Unauthorize")

        const [type, token] = authorization.split(" ")

        if(type !== "Bearer")
            throw new Error("Unauthorize")

        const payload: any = await jwt.verify(token, process.env.JWT_SECRET as string)

        if(payload.role !== "admin")
            throw new Error("Unauthorize")

        req.user = payload as any
        next()
    }
    catch
    {
        res.status(401).json({message: "Unauthorized permission denied"})
    }
}

export const UserAccessMiddleware = async (req: AuthRequest, res: Response, next: NextFunction)=>{
    try {
        const authorization = req.headers.authorization

        if(!authorization)
            throw new Error("Unauthorize")

        const [type, token] = authorization.split(" ")

        if(type !== "Bearer")
            throw new Error("Unauthorize")

        const payload: any = await jwt.verify(token, process.env.JWT_SECRET as string)

        if(payload.role !== "user")
            throw new Error("Unauthorize")
        
        req.user = payload as any
        next()
    }
    catch
    {
        res.status(401).json({message: "Unauthorized permission denied"})
    }
}

export const AuthAccessMiddleware = async (req: AuthRequest, res: Response, next: NextFunction)=>{
    try {
        const authorization = req.headers.authorization

        if(!authorization)
            throw new Error("Unauthorize")

        const [type, token] = authorization.split(" ")

        if(type !== "Bearer")
            throw new Error("Unauthorize")

        const payload: any = await jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = payload as any
        next()
    }
    catch
    {
        res.status(401).json({message: "Unauthorized permission denied"})
    }
}