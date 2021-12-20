import {Router} from 'express'
import {cartPost,cartDelete,cartGet,cartProdPost,cartProdDelete,getMyCartJson} from '../components/cart/controller/cartController.js'

const router = Router()

router.get('/json', getMyCartJson)

router.post('/', cartPost);

router.post('/:id/products', cartProdPost);

router.get('/:id/products', cartGet);

router.delete('/:id', cartDelete);

router.delete('/:id/products/:idProds', cartProdDelete);

export {router}