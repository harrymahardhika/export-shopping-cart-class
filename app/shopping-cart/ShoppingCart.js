class ShoppingCart {
  constructor() {
    this.items = []
    this.totalPrice = 0
    this.totalItems = 0
  }

  addItem(productId, quantity) {
    this.items.push({ productId, quantity })
  }

  removeItem(index) {
    this.items.splice(index, 1)
  }

  getItems() {
    return this.items
  }

  clear() {
    this.items = []
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      return total + item.quantity * item.price
    }, 0)
  }
}

export default ShoppingCart
