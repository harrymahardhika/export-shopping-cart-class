import Product from './Product.js'
import productData from './product-data.js'

const productRepository = {
  getProducts: () => {
    const products = []

    productData.forEach((product) => {
      products.push(new Product(product))
    })

    return products
  }
}

export default productRepository
