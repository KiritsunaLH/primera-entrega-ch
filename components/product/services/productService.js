import fs from 'fs'; 
const products = [];

//Save products in Array
async function saveProd(product) {
    products.push(product)
    await fs.promises.writeFile(pathProd, JSON.stringify(products, null, 2)); 
    return product.id
}

//Get products by ID
async function filterProdId (id) {
    const product = this.product.filter( prod => prod.id === id && (!prod.erase))
        return product
}

//Get all products
async function filterProds () {
    return products.filter(prod => prod.erase === false);
}

//Update a product
async function updateProdById (id, prod) {
    prodIndx = products.findIndex(prod = prod.id === id && (!prod.erase))
    let product

    if (prodIndx !== -1) {
        products[prodIndx].name = prod.name !== undefined ? prod.name : products[prodIndx].name ;
        products[prodIndx].thumb = prod.thumb !== undefined ? prod.thumb : products[prodIndx].thumb ;
        products[prodIndx].desc = prod.desc !== undefined ? prod.desc : products[prodIndx].desc ;
        products[prodIndx].code = prod.code !== undefined ? prod.code : products[prodIndx].code ;
        products[prodIndx].price = prod.price !== undefined ? prod.price : products[prodIndx].price ;
        products[prodIndx].stock = prod.stock !== undefined ? prod.stock : products[prodIndx].stock ;
        product = products[prodIndx];
        await fs.promises.writeFile(pathProd, JSON.stringify(products, null, 2));
    }
    return product;
}

//Delete products by ID
async function delProdById(id) {
    const prodIndx = products.findIndex(prod => prod.id === id && (!prod.erase));
    if (prodIndx !== -1) { 
        products[prodIndx].erase = true;
        await fs.promises.writeFile(pathProd, JSON.stringify(products, null, 2));
    }
    return products[prodIndx];
}

export {
    saveProd,
    filterProdId,
    filterProds,
    updateProdById,
    delProdById
}