import { Request, Response } from "express";
import { User } from "./users.schema";
import bcrypt from 'bcrypt'
import { createToken, verifyToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response)=>{
    try {
        const user = await User.create(req.body)
        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        }
        const token = createToken(payload)
        res.json({
            ...payload,
            token
        })
    }
    catch(err)
    {
        if(err instanceof Error)
            res.status(500).json({message: err.message})
    }
}

export const login = async (req: Request, res: Response)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user)
            throw new Error("User not found try to signup first")

        // Node bcrypt does not reliably compare PHP's $2y$ bcrypt prefix.
        const compatibleHash = user.password.replace(/^\$2y\$/, '$2b$')
        const isLogin = bcrypt.compareSync(password, compatibleHash)

        if(!isLogin)
            throw new Error("Incorrect password")

        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        }
        const token = createToken(payload)
        res.json({
            ...payload,
            token
        })
    }
    catch(err)
    {
        if(err instanceof Error)
            res.status(500).json({message: err.message})
    }
}

export const verify = async (req: Request, res: Response)=>{
    try {
        const {token} = req.body
        const payload = verifyToken(token)
        
        if(!payload)
            throw new Error("Invalid token")
        
        res.json(payload)
    }
    catch(err)
    {
        if(err instanceof Error)
            res.status(500).json({message: err.message})
    }
}