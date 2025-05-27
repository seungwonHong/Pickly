import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

class ProductService {
  getProductsId(productId: number) {
    return axios.get(`${BASE_URL}/products/${productId}`)
  }
}

const productService = new ProductService()
export default productService
