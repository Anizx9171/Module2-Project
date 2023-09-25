
import axios from 'axios';
export const dataAll = axios.create({
    baseURL: "http://localhost:9171",
})
export const getDataUsers = async () => await axios.get("http://localhost:9171/users/");
export const getDataProducts = async () => await axios.get("http://localhost:9171/products");
export const getDataCategories = async () => await axios.get("http://localhost:9171/categories");

export const searchDataProducts = async (text) => await axios.get(`http://localhost:9171/products?product_name_like=${text}`)


