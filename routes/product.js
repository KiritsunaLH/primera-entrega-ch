import { Router } from "express";
import {prodGet, prodPost, prodPut, prodDelete, getMyJson} from '../components/product/controller/productController.js'

const router = new Router()

router.get('/json', getMyJson)
router.get('/:id?', prodGet)
router.post('/?', prodPost)
router.put('/:id', prodPut)
router.delete('/:id', prodDelete)

export {router}