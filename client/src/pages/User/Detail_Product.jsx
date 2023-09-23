import React, { useEffect, useState } from "react";
import Headerr from "../../components/User/Headerr";
import Footerr from "../../components/User/Footerr";
import { useParams } from "react-router-dom";
import { getDataCategories, getDataProducts } from "../../api/getAPI";
import PreLoader from "../../components/PreLoader";
import { FomatMoney } from "../../utils/FomatData";
import { notification } from "antd";
import axios from "axios";

export default function Detail_Product() {
  const { id } = useParams();
  const cartId = JSON.parse(localStorage.getItem("cartId")) || -1;
  const [cartUser, setCartUser] = useState([]);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);
  const userLocal = JSON.parse(localStorage.getItem("userLocal")) || [];

  const handleAddCart = async () => {
    if (userLocal.length < 1) {
      notification.warning({ message: "Sign fist" });
      return;
    }
    const cart = cartUser.cart;

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
      if (Number(cart[index].quantity) <= Number(product.quantity)) {
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

  useEffect(() => {
    setLoad(true);
    axios
      .get(`http://localhost:9171/carts/${cartId}`)
      .then((response) => setCartUser(response.data));
    getDataProducts()
      .then((response) => {
        setProduct(response.data.find((e) => e.id == id));
      })
      .catch((error) => {
        console.log(error);
      });
    getDataCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  return (
    <>
      {load && <PreLoader />}
      <Headerr />
      <hr />
      <main id="page-content">
        <div className="container">
          <div className="product-single">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="product-details-img product-horizontal-style mb-3">
                  <div className="zoompro-wrap product-zoom-right pl-20">
                    <div className="zoompro-span">
                      <img
                        className="zoompro prlightbox"
                        src={product.image}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="product-single-detail">
                  <h1 className="product-title">{product.product_name}</h1>
                  <div className="brands mb-1">
                    <b className="text-red-700">form:</b>
                    <span> {product.form}</span>
                  </div>
                  <div className="brands mb-1">
                    <b className="text-red-700">category:</b>{" "}
                    {categories.map((e) => {
                      let categ = "";
                      if (e.id == product.category) {
                        categ = e.category_name;
                        return <span key={e.id}>{categ}</span>;
                      }
                    })}
                  </div>
                  <div className="price-box">
                    <span className="visually-hidden">Regular price</span>
                    <span className="sale-price">
                      {FomatMoney(product.price)}
                    </span>
                  </div>
                  <div className="brands mb-1">
                    <b className="text-red-700">stock remaining:</b>
                    <span> {product.quantity}</span>
                  </div>
                  <div className="sort-description">
                    <h4 className="text-red-600 text-lg">Description</h4>
                    <p>{product.description}</p>
                  </div>
                  <hr />
                  <div
                    className="product-form hidedropdown"
                    acceptCharset="UTF-8"
                    encType="multipart/form-data"
                  >
                    <hr />
                    <div className="product-action w-100 clearfix d-flex">
                      <div className="product-form-quantity mb-3">
                        <div className="qtyField">
                          <a className="qtyBtn minus">
                            <i className="cps cp-minus" />
                          </a>
                          <input
                            type="text"
                            name="quantity"
                            defaultValue={1}
                            className="product-form__input qty"
                          />
                          <a className="qtyBtn plus">
                            <i className="cps cp-plus" />
                          </a>
                        </div>
                      </div>
                      <div className="product-form-submit flex-1">
                        <button
                          type="submit"
                          className="btn rounded w-100 add-to-cart-btn bg-red-700 hover:bg-red-600"
                          onClick={() => handleAddCart(product)}
                        >
                          <span>Add to cart</span>
                        </button>
                        <button
                          type="submit"
                          className="btn rounded d-none"
                          disabled="disabled"
                        >
                          Sold out
                        </button>
                      </div>
                    </div>
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
