import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// must have file extension after auto convert to ES 2015
// import products from './data/products.js'

import productRoutes from './routes/productRoutes.js'
dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is listening on port 5000!')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

// app.use((req, res, next) => {
//   const error = new Error(`not found - ${req.originalUrl}`)
//   res.status(404)
//   next(error)
// })

//app.use((err, req, res, next) => {
//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode
//   res.status(statusCode)
//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? null : err.stack
//   })
// })

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in  ${process.env.NODE_ENV} on port ${PORT}`.white.bold
  )
)
