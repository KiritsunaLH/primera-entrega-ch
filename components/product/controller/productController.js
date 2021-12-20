import Product from '../model/product.js'
import {saveProd, filterProdId, filterProds, updateProdById, delProdById} from '../services/productService.js'
import {request, response} from 'express'
import { v4 as uuidv4 } from 'uuid';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const myJson = require("../../../utils/products/products.json");

const getMyJson = (req, res) => {
    res.send(myJson);
}

async function prodGet(req = request, res = response, next) {
    const {id} = req.params
    let resp
    if (id !== undefined) {
        const product = filterProdId(id)
        if (product === undefined) {
            return res.status(404).json({
                error: -1,
                msg: `Product with the id: ${id} doesn't exist`})
        }
        resp = product 
    } else {
        resp = filterProds()
    }
    res.json(resp)
}

async function prodPost(req = request, res = response, next) {
    const {title, desc, code, thumb, price, stock} = req.body
    const product = new Product(uuidv4(), title, desc, code, thumb, price, stock)
    const id = await saveProd(product)
    res.json({id})
}

async function prodPut(req = request, res = response, next) {
    const {id} = req.params;
    const {title, desc, code, thumb, price, stock} = req.body
    const product = await updateProdById(id, {title, desc, code, thumb, price, stock})
    if (product === undefined) {
        return res.status(404).json({
            error: -1,
            msg: `Product with the id: ${id} doesn't exist`})
    }
    res.json(product)
}

async function prodDelete(req = request, res = response, next) {
    const {id} = req.params;
    const product = await delProdById(id)
    if (product === undefined) {
        return res.status(404).json({
            error: -1,
            msg: `Product with the id: ${id} doesn't exist`})
    }
}

export {
    getMyJson,
    prodGet,
    prodPost,
    prodPut,
    prodDelete
}