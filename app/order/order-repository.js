import Order from './Order.js'

const orders = []

const orderRepository = {
  create: (shoppingCart) => {
    const orderId = orders.length + 1
    const order = new Order(orderId, shoppingCart.getItems(), shoppingCart.getTotal())
    orders.push(order)
    return order
  },

  getOrderById: (orderId) => {
    return orders.find((order) => order.id === orderId)
  },

  getOrders: () => {
    return orders
  }
}

export default orderRepository
