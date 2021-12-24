import {request, response} from 'express'
import {newCart,addProdToCart,findProdById,delCartProdById,delCartById} from '../components/cart/services/cartService.js'

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const myCartJson = require("../resources/cart.json");

function getMyCartJson(req, res) {
    res.send(myCartJson);
}

//Create cart and return id
async function cartPost(req = request, res = response, next) {
    const cart = await newCart()
    res.send({ 
        id: cart.id 
    })
}

// Delete a cart
async function cartDelete(req = request, res = response, next) {
    const {id} = req.params;
    const index = await delCartById(id);
    if (index === -1) {
        return res.status(404).json({
            error: -1,
            msg: `El carrito con ${id} no existe.`
        });
    }
    res.send({id});
}

// Get all products in the cart
async function cartGet(req = request, res = response, next) {
    const {id} = req.params;
    const products = findProdById(id);
    if (products === undefined) {
        res.status(404).json({
            error: -1,
            msg: `The cart with the ID: ${id} doesn't exist.`
        });
    }
    res.send(products);
}

// Add items to cart by their ID
async function cartProdPost(req = request, res = response, next) {
    const {id} = req.params;
    const {idProd} = req.body;
    const cart = await addProdToCart(id, idProd);
    if (cart === undefined) {
        return res.status(404).json({
            error: -1,
            msg: `The cart with the ID: ${id} doesn't exist.`
        })
    }
    res.send(cart);
}

//Delete a product from a cart by its product & cart ID
async function cartProdDelete(req = request, res = response, next) {
    const {id, idProd} = req.params;
    const product = await delCartProdById(id, idProd);
    console.log(product);
    if (product.erase === false) {
        return res.status(404).json({
            error: -1,
            msg: `The cart with the ID: ${id} or the product with the ID: ${idProd} don't exist`
        });
    }
    res.send({
        id,
        idProd,
    });
}

export {
    getMyCartJson,
    cartPost,
    cartDelete,
    cartGet,
    cartProdPost,
    cartProdDelete
}