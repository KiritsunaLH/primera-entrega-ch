import { Router } from "express";
import {prodGet, prodPost, prodPut, prodDelete, getMyJson} from '../components/product/controller/productController.js'
import {isAdmin} from '../components/auth/auth.js'

const router = new Router()

router.get('/json', getMyJson)
router.get('/:id?', prodGet)
router.post('/?', [isAdmin], prodPost)
router.put('/:id', [isAdmin], prodPut)
router.delete('/:id', [isAdmin], prodDelete)

export {router}