import fs from 'fs';

export default class Container {
    
    constructor(url) {
        this.url = url
        this.products = []
    }

    async save(product) {
        try {
            const id = this.product.length + 1
            this.products.push({...product, id})
            await fs.promises.writeFile( this.path, JSON.stringify(this.products, null, 2))
            return id
        } catch (error) {
            console.log("Error from save", error)
        }
    }

    async update(product) {
        let curId = 0
        try {
            let res = []
            let data = await this.getAll()
            for (const key in data) {
                if (data[key].id == product.id) {
                    curId = 1;
                    res = await this.deleteById(product.id)
                }
            }
            if(curId == 1) {
                res.push(product);
                let content = JSON.stringify(res, null, 2)
                await fs.promises.writeFile(this.url, content) 

                return product.id
            }else {
                return "This product doesn't exist"
            }
        } catch (error) {
            console.log ("Error from Update", error)
        }
    }

    async readFileContainer() {
        try {
            const file = await fs.promises.readFile(this.url, 'utf-8')
            if (file != "")
                return JSON.parse(file)
            else 
                return []
        } catch (error) {
            console.log("Error from readFileContainer", error)
        }
    }

    getById(idProd) {
        let data = fs.readFileSync('../../../products.json')
        let prods = JSON.parse(data)
        console.log(idProd.id);
        try {
            let counter = 0
            prods.forEach(elem => {
                if (Number(elem.id) === Number(idProd.id) ) {
                    counter++
                }
            });
            if (counter != 0) {
                let prodI = prods.filter(prod => Number(prod.id) === Number(idProd.id))
                return prodI
            } else {
                return 'error with id input'
            }
            
        } catch (error) {
            console.log('Error in getById');
        }
    }

    getAll() {
        return this.products
    }

    newProduct(newProd){
        let data = fs.readFileSync('../../../products.json')
        let prodArr = JSON.parse(data)
        
        try {
            let exists=0
            for (let i = 0; i < prodArr.length; i++) {
                const elem = prodArr[i];
                if (exists <= elem.id){
                    exists =  (elem.id+1)
                }
            }
            newProd.price = Number(newProd.price)
            let newProdId = {id: Number(exists)}

            let prodAdd = Object.assign(newProdId, newProd)
            console.log(prodAdd);
            prodArr.push(prodAdd)
            let jsonData = JSON.stringify(prodArr,null,2)
            let write = fs.writeFileSync('./prods.json', jsonData)
            return prodAdd;
        } catch (error) {
            return 'Error en NewProd'
        }
    }

    async deleteById(id) {
        try {
            const curProducts = this.products.filter( prod => prod.id !== id)
            this.products = curProducts
            await fs.promises.writeFile(this.url, JSON.stringify(this.products, null, 2))
        } catch (error) {
            console.log("error from deleteById", error)
        }
    }
    
    async deleteAll() {
        try {
            await fs.promises.writeFile(`${this.url}`, '[]');
            this.products = []
        } catch (error) {
            console.log("error from deleteAll", error)
        }
    }
}