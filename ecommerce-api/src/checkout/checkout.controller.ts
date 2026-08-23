import { Request, Response } from "express"
import Stripe from "stripe"
import mongoose from "mongoose"
import { Product } from "../products/products.schema"
import { AuthRequest } from "../middleware/auth.middleware"
import { v4 as uuid } from "uuid"
import { Order } from "../orders/order.schema"
import { Cart } from "../carts/cart.schema"
import fs from "fs"
const stripe = new Stripe(process.env.S_KEY!)

function calculateAmount(items: any[]) {
  return items.reduce((total, item) => {
    const discountAmount = (item.price * item.discount) / 100
    const finalPrice = item.price - discountAmount
    return total + finalPrice * item.qnt
  }, 0)
}

export const createCheckout = async (req: AuthRequest, res: Response) => {
  try {
    const payloadProducts = req.body.products

    if (!payloadProducts || !payloadProducts.length)
      return res.status(400).json({ message: "Products required" })

    const productIds = payloadProducts.map((p: any) =>
      mongoose.Types.ObjectId.createFromHexString(p.id)
    )

    const dbProducts = await Product.find({
      _id: { $in: productIds }
    })

    if (dbProducts.length !== payloadProducts.length)
      return res.status(400).json({ message: "Invalid product detected" })

    const productsWithQuantity = dbProducts.map(product => {
      const match = payloadProducts.find(
        (p: any) => p.id === product._id.toString()
      )

      return {
        ...product.toObject(),
        qnt: match.qnt
      }
    })

    const amount = Math.round(calculateAmount(productsWithQuantity))

    const name =
      productsWithQuantity.length === 1
        ? productsWithQuantity[0].title
        : `${productsWithQuantity.length} items purchase`

    const sessionId = uuid()
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name },
            unit_amount: amount * 100
          },
          quantity: 1
        }
      ],
      payment_intent_data: {
          metadata : {
            userId: req.user?.id || "",
            sessionId,
            products: JSON.stringify(payloadProducts)
          }
      },
      success_url: process.env.PAYMENT_SUCCESS_URL!,
      cancel_url: process.env.PAYMENT_FAILED_URL!
    })

    await Order.create({
        sessionId,
        user: req.user?.id,
        products: payloadProducts,
        amount
    })

    res.json({paymentLink: session.url})
  } 
  catch (err) {
    if (err instanceof Error)
      res.status(500).json({ message: err.message })
  }
}

export const webhook = async (req: Request, res: Response) => {
  try {
    fs.writeFileSync("test.json", JSON.stringify(req.body, null, 2))
    const status = req.body.data.object.status
    const metadata = req.body.data.object.metadata
    const products = JSON.parse(metadata.products)
    const ids = products.map((item: any)=> mongoose.Types.ObjectId.createFromHexString(item.id))

    if(status !== "succeeded")
      throw new Error("Payment not succeeded yet")
    
    const session = await Order.findOneAndUpdate({sessionId: metadata.sessionId}, {paymentStatus: "paid"})

    if(!session)
      throw new Error("Session not found")

    await Cart.deleteMany({
      user: metadata.userId,
      product: { $in: ids }
    })

    res.json({message: "Order placed"})
  } 
  catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message })
  }
}