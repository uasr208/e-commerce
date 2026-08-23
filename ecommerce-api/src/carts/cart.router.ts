import { Router } from "express";
import { createCart, deleteCart, fetchCarts, updateCart } from "./cart.controller";
import { UserAccessMiddleware } from "../middleware/auth.middleware";
export const cartRouter = Router()

cartRouter.post("/", UserAccessMiddleware, createCart)
cartRouter.get("/", UserAccessMiddleware, fetchCarts)
cartRouter.put("/:id", UserAccessMiddleware, updateCart)
cartRouter.delete("/:id", UserAccessMiddleware, deleteCart)