import { Router } from "express";
const router = new Router()

export const cartApi = app => {
    app.use("/cart", router)
    router.get("/", (req, res, next) => {
        console.log(req.body);
        res.send("Okay from Cart")
    })
}