import { productsApi } from "../components/product/index.js";
import { cartApi } from "../components/cart/index.js";

export const serverRouter = app =>{
    productsApi(app);
    cartApi(app);
    app.get("/", (req, res, next) => {
        console.log(req.body);
        res.send("Okay from root")
    })
}