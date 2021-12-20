import fs from 'fs' 
import Cart from '../model/cart.js'
import {filterProdId} from '../../product/services/productService.js'

const pathCart = process.env.PATH_CART
const carts = []

//connect cart JSON in main file
async function connectJSONCart() {
    try {
        const file = await fs.promises.readFile(pathCart, 'utf-8')
        const cartsFile = JSON.parse(file)
        cartsFile.forEach(cart => carts.push(cart))
    } catch (error) {
        console.log('[error service.connectJSONCart method]', error)
    }
}

//Create new cart
async function newCart() {
    const cart = new Cart()
    carts.push(cart)
    await fs.promises.writeFile(pathCart, JSON.stringify(cart, null, 2));
    return cart
}

//Add new product to cart
async function addProdToCart(id, idProd) {
    const cartIndx = carts.findIndex( cart => cart.id === id)
    let cart
    if(cartIndx > -1) {
        const product = filterProdId(idProd)
        carts[cartIndx].products.push(product)
        cart = carts[cartIndx]
        await fs.promises.writeFile(pathCart, JSON.stringify(carts, null, 2))
    }
    return cart
}

// get products ID from cart
async function findProdById(id) {
    const cart = carts.find( cart => cart.id === id )
    if (cart === undefined) {
        return undefined
    }
        return cart.products
}

//Delete a product from the cart
async function delCartProdById(id, idProd) {
    let cartIndx = -1
    const product = {
        idProd, erase: false
    }
    if(carts.length > 0) {
        cartIndx = carts.findIndex(cart => cart.id === id)
    }
    if(cartIndx > -1) {
        const curProds = carts[cartIndx].products.filter(prod => prod.id !== idProd)
        carts[cartIndx].products = curProds
        product.erase = true
        await fs.promises.writeFile(pathCart, JSON.stringify(carts, null, 2));
    }
    return product
}

async function delCartById(id) {
    let cartIndx = -1;
    if (carts.length > 0) {
        cartIndx = carts.findIndex(cart => cart.id === id);
    }
    if (cartIndx > -1) {
        carts[cartIndx].id = '-1';
        await fs.promises.writeFile(pathCart, JSON.stringify(carts, null, 2));  
    }
    return cartIndx;
}

export {
    connectJSONCart,
    newCart,
    addProdToCart,
    findProdById,
    delCartProdById,
    delCartById
}