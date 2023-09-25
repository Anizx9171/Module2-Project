import axios from "axios";

const response = axios.get(`http://localhost:9171/products?product_name_like=${text}`)