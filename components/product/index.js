import { Router } from "express";
import  Container  from "./controller/productController.js"

const router = new Router()
let container = new Container("../../products.json");

export const productsApi = app => {
    app.use("/products", router)
    router.get("/:id", (req, res, next) => {
        res.send(container.getById())
        console.log(req.body);
        res.send("Okay from Products")
    })
    router.post('/',(req,res,next) =>{
        container.save(req.body.product).then(data => { 
        res.json(data);
        }).catch(error => {
            res.send(error);
            });
    })
    router.put('/:id',(req,res,next) => {
        let product = req.body;
        container.update(product).then(data => {
            res.json(data);
        }).catch(error => {
            res.send(error);
            });
    });
    router.delete("/:id", (req,res,next) => {
        let id = req.params.id;
        container.deleteById(id).then(data => {
            res.send(data);
        }).catch(error => {
            res.send(error);
            });
    });
}