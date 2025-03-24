import { createProduct, findProducts, findProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js'
import express from 'express'

const router = express.Router()

router.post('/', createProduct)
router.get('/', findProducts)
router.get('/:id', findProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router;