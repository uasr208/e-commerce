import { Router } from "express";
import { login, signup, verify } from "./users.controller";
export const userRouter = Router()

userRouter.post("/login", login)
userRouter.post("/signup", signup)
userRouter.post("/verify", verify)