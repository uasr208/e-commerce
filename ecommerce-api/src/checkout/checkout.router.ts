import { Router } from "express";
import { confirmCheckout, createCheckout, webhook } from "./checkout.controller";
import { UserAccessMiddleware } from "../middleware/auth.middleware";
export const checkoutRouter = Router()

checkoutRouter.post("/", UserAccessMiddleware, createCheckout)
checkoutRouter.get("/confirm/:id", UserAccessMiddleware, confirmCheckout)
checkoutRouter.post("/webhook", webhook)