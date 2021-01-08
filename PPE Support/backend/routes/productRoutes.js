import express from 'express'
const router = express.Router()
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
// Testing with:
// http://localhost:5000/api/products/5fd8071ac450561c8a5be9a4
// {"_id":"5fd8071ac450561c8a5be9a4","name":"COAST KN95 Face Mask"....}
// http://localhost:5000/api/products/5fd8071ac450561c8a5be9a0
// {"message":"product not found"}
// http://localhost:5000/api/products/
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router
