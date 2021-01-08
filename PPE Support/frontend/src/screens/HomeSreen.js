import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const HomeSreen = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, [])
  // Warning: Each child in a list should have a unique "key" prop.
  return (
    <>
      <h1>Lastest Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={2}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeSreen
