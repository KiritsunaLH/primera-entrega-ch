import  express from "express";
import cors from "cors";
import {getMyJson} from './components/product/controller/productController.js'
import {getMyCartJson} from './components/cart/controller/cartController.js';
import {router as productsRouter} from './routes/product.js'
import {router as cartsRouter} from './routes/cart.js'

const app = express();
const PORT = process.env.PORT || 8080;

//connect to JSON files
async function connectToDB() {
    getMyJson()
    getMyCartJson()
}
connectToDB()

//MW
app.use(cors("*"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
app.use('/api/products', productsRouter)
app.use('/api/cart', cartsRouter)

const sv = app.listen(PORT, ()=>{
    console.log(`Conected to http://localhost:${PORT}`);
})

export {sv}