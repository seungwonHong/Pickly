import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

class ProductService {
  getProductsId(productId: number) {
    return axios.get(`${BASE_URL}/products/${productId}`);
  }
}

class UserService {
  getUser() {
    return axios.get(`${BASE_URL}/users/me`);
  }
}

export const productService = new ProductService();
export const userService = new UserService();
