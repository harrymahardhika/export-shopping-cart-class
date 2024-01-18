import express from 'express'
import productRepository from './product/product-repository.js'
import ShoppingCart from './shopping-cart/ShoppingCart.js'
import orderRepository from './order/order-repository.js'

const router = express.Router()
const cart = new ShoppingCart()

router.get('/products', (req, res) => {
  res.json(productRepository.getProducts())
})

router.get('/shopping-cart', (req, res) => {
  res.json({
    total: cart.getTotal(),
    items: cart.getItems()
  })
})

router.post('/shopping-cart', (req, res) => {
  const { productId, quantity } = req.body

  if (!productId || !quantity) {
    res.status(400).json({
      message: 'Missing required fields: productId, quantity'
    })
    return
  }

  const product = productRepository.getProducts().find((prod) => {
    return prod.id === productId
  })

  if (!product) {
    res.status(404).json({
      message: 'Product not found'
    })
    return
  }

  // check product in cart and update quantity
  const cartItem = cart.getItems().find((item) => {
    return item.product.id === productId
  })

  if (cartItem) {
    cartItem.quantity += quantity
    res.json(cart.getItems())
    return
  }

  cart.addItem(product, quantity, product.price)
  res.json(cart.getItems())
})

router.delete('/shopping-cart', (req, res) => {
  cart.clear()
  res.json(cart.getItems())
})

router.delete('/shopping-cart/:index', (req, res) => {
  const index = req.params.index
  cart.removeItem(index)
  res.json(cart.getItems())
})

router.post('/checkout', (req, res) => {
  const order = orderRepository.create(cart)
  res.json({ message: 'Order created', order })
})

router.get('/orders', (req, res) => {
  res.json(orderRepository.getOrders())
})

export default router
