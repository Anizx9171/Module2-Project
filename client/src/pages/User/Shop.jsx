import React, { useState } from "react";
import Headerr from "../../components/User/Headerr";
import Footerr from "../../components/User/Footerr";
import { useEffect } from "react";
import {
  getDataCategories,
  getDataProducts,
  searchDataProducts,
} from "../../api/getAPI";
import { FomatMoney } from "./../../utils/FomatData";
import PreLoader from "../../components/PreLoader";
import { Link } from "react-router-dom";
import { Button, Input, Pagination, notification } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";

export default function Shop() {
  const userLocal = JSON.parse(localStorage.getItem("userLocal")) || [];
  const cartId = JSON.parse(localStorage.getItem("cartId")) || -1;
  const [categores, setCategores] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState(-1);
  const [load, setLoad] = useState(false);
  const [cartUser, setCartUser] = useState([]);
  const [textSearch, setTextSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  // Tạo mảng sản phẩm cho trang hiện tại
  const currentProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddCart = async (id) => {
    if (userLocal.length < 1) {
      notification.warning({ message: "Sign fist" });
      return;
    }
    const productCheck = products.find((pro) => pro.id == id);
    const cart = cartUser.cart;
    if (productCheck.quantity <= 0) {
      notification.warning({
        message: "Products sold out",
      });
      return;
    }

    const index = cart.findIndex((sp) => sp.idSP == id);
    if (index == -1) {
      cart.push({
        idSP: id,
        quantity: 1,
      });
      const res = await axios.patch(`http://localhost:9171/carts/${cartId}`, {
        cart: cart,
      });
      if (res.status == 200) {
        notification.success({
          message: "add to cart successfully",
        });
      }
    } else {
      cart[index].quantity = Number(cart[index].quantity) + 1;
      if (Number(cart[index].quantity) <= Number(productCheck.quantity)) {
        const res = await axios.patch(`http://localhost:9171/carts/${cartId}`, {
          cart: cart,
        });
        if (res.status == 200) {
          notification.success({
            message: "Add to cart +1",
          });
        }
      } else {
        notification.success({
          message: "Exceed the number",
        });
      }
    }
    await axios
      .get(`http://localhost:9171/carts/${cartId}`)
      .then((response) => setCartUser(response.data));
  };

  const handleSearchPro = () => {
    searchDataProducts(textSearch)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  const getDataProduct = () => {
    setLoad(true);
    getDataProducts()
      .then((response) => {
        if (categoryId < 0) {
          setProducts(response.data);
        } else {
          setProducts(
            response.data.filter((pro) => pro.category == categoryId)
          );
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoad(false));
  };

  useEffect(() => {
    getDataProduct();
  }, [categoryId]);

  useEffect(() => {
    setLoad(true);

    axios
      .get(`http://localhost:9171/carts/${cartId}`)
      .then((response) => setCartUser(response.data));

    getDataCategories()
      .then((response) => {
        setCategores(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
  }, []);

  return (
    <>
      {load && <PreLoader />}
      <Headerr />
      <hr />
      <main id="page-content">
        <div className="content-with-sidebar">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-3 sidebar filterbar">
                <h1 className="text-3xl text-black">Danh mục</h1>
                <ul>
                  <li
                    style={
                      categoryId < 0
                        ? {
                            background: "rgb(220 38 38)",
                            color: "#fff",
                          }
                        : {}
                    }
                    className="p-3 bg-gray-100 cursor-pointer"
                    onClick={() => setCategoryId(-1)}
                  >
                    Tất cả
                  </li>
                  {categores.map((cat) => (
                    <li
                      style={
                        categoryId == cat.id
                          ? {
                              background: "rgb(220 38 38)",
                              color: "#fff",
                            }
                          : {}
                      }
                      key={cat.id}
                      onClick={() => setCategoryId(cat.id)}
                      className="p-3 bg-gray-100 cursor-pointer"
                    >
                      {cat.category_name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-9 main-col flex flex-col justify-between">
                <div className="products-grid">
                  <div className="flex justify-end ml-6 mt-6">
                    <div className="flex justify-center items-center bg-white p-1 gap-2 border rounded-md">
                      <Button
                        onClick={handleSearchPro}
                        className=" w-10 h-10 flex justify-center items-center border-none"
                      >
                        <SearchOutlined />
                      </Button>
                      <Input
                        type="text"
                        className="max-w-md border-none"
                        placeholder="...Search"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row flex items-end">
                    {currentProducts.map((pro) => (
                      <div
                        className="col-6 col-sm-6 col-md-4 col-lg-4"
                        key={pro.id}
                      >
                        <div className="item">
                          <div className="product-image">
                            <Link to={`/product/${pro.id}`}>
                              <img
                                className="primary lazyload rounded-3"
                                src={pro.image}
                                alt="product"
                                title="product"
                              />
                              <img
                                className="hover lazyload rounded-3"
                                src={pro.image}
                                alt="product"
                                title="product"
                              />
                            </Link>
                          </div>
                          <div className="product-details d-flex">
                            <div className="product-details-in">
                              <div className="h3">
                                <Link to={`/product/${pro.id}`}>
                                  {pro.product_name}
                                </Link>
                              </div>
                              <div className="price-box">
                                <span className="price">
                                  {FomatMoney(pro.price)}
                                </span>
                              </div>
                              <div className="add-to-cart">
                                <a
                                  className="btn-primary btn pro-addtocart-popup rounded"
                                  onClick={() => handleAddCart(pro.id)}
                                >
                                  <i className="cps cp-shopping-cart" />{" "}
                                  <span className="label">Add to Cart</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div>
                    <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={totalProducts}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footerr />
    </>
  );
}
