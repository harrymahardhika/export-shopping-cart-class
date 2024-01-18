class Product {
  constructor(product = {}) {
    this.id = product.id
    this.name = product.name
    this.category = product.category
    this.price = product.price
    this.inStock = product.inStock
    this.description = product.description
  }

  toString() {
    return `${this.name} ${this.price}`
  }
}

export default Product
