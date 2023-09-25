import React, { useEffect, useState } from "react";
import Headerr from "../../components/User/Headerr";
import Footerr from "../../components/User/Footerr";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import PreLoader from "./../../components/PreLoader";
import { getDataProducts } from "./../../api/getAPI";
import axios from "axios";
import { FomatMoney } from "../../utils/FomatData";
import { Modal, Pagination, notification } from "antd";

export default function Cart() {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  if (!userLocal) {
    navigate("/sign-in");
  }
  const cartId = JSON.parse(localStorage.getItem("cartId")) || -1;
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);
  const [cartUser, setCartUser] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idGl, setidGl] = useState(null);
  const productInCart = [];
  let sum = 0;

  const showModal = (id) => {
    setidGl(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await handleDelete(idGl);
    setidGl(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setidGl(null);
    setIsModalOpen(false);
  };

  if (products.length > 0 && cartUser) {
    cartUser.cart.map((ca) => {
      products.map((pr) => {
        if (ca.idSP == pr.id) {
          productInCart.push({ ...pr, quantity: ca.quantity });
        }
      });
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const totalOders = productInCart.length;
  const totalPages = Math.ceil(totalOders / pageSize);

  // Tạo mảng oders cho trang hiện tại
  const currentOders = productInCart.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChangeQuantity = (qty, proid) => {
    const index = cartUser.cart.findIndex((pr) => pr.idSP == proid);
    const proPre = products.find((p) => p.id == proid);
    // Nếu qty truyền vào là 1 tiền hành tăng số lượng
    if (qty == 1) {
      if (cartUser.cart[index].quantity >= proPre.quantity) {
        notification.warning({
          message: "Can not increase the number",
          description: "The number in the cart has reached the maximum",
        });
        return;
      }
      cartUser.cart[index].quantity += 1;
    }
    // nếu không thì giảm lượng
    else {
      if (cartUser.cart[index].quantity <= 1) {
        setIsModalOpen(true);
        setidGl(proid);
        return;
      }
      cartUser.cart[index].quantity -= 1;
    }
    setLoad(true);
    axios
      .put(`http://localhost:9171/carts/${cartId}`, cartUser)
      .then((response) =>
        notification.success({
          message: "Success changes",
          description: "The quantity has been changed",
        })
      )
      .finally(() => setLoad(false));
  };

  const handleDelete = async (id) => {
    const newCart = cartUser.cart.filter((c) => c.idSP != id);
    setLoad(true);
    await axios
      .put(`http://localhost:9171/carts/${cartId}`, {
        ...cartUser,
        cart: newCart,
      })
      .then((response) => {
        setCartUser(response.data);
        notification.success({
          message: "Success Delete",
          description: "The product has been delete",
        });
      });
    setLoad(false);
  };

  const handleCheckOut = async () => {
    const { id, cart, userId } = cartUser;

    console.log(id, cart, userId);

    try {
      for (let i = 0; i < cart.length; i++) {
        const resPro = await axios.get(
          `http://localhost:9171/products/${cart[i].idSP}`
        );
        const proInfo = resPro.data;
        await axios.patch(`http://localhost:9171/products/${cart[i].idSP}`, {
          quantity: proInfo.quantity - cart[i].quantity,
        });
      }

      await axios.post(`http://localhost:9171/oders`, {
        userId: userId,
        cart: cart,
        total: sum,
        accept: 0,
      });

      await axios.patch(`http://localhost:9171/carts/${id}`, {
        cart: [],
      });

      notification.success({
        message: "oke",
        description: "oke",
      });

      setCartUser((pre) => ({
        ...pre,
        cart: [],
      }));
    } catch (error) {
      console.log(error);
      notification.success({
        message: "that bai",
        description: "that bai",
      });
    }
  };

  useEffect(() => {
    setLoad(true);
    axios
      .get(`http://localhost:9171/carts/${cartId}`)
      .then((response) => setCartUser(response.data));
    getDataProducts()
      .then((response) => setProducts(response.data))
      .finally(() => setLoad(false));
  }, []);
  return (
    <>
      {load && <PreLoader />}
      <Headerr />
      <hr />
      <Modal
        title="?Delete product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okType={"default"}
      >
        <p>?Are you sure delete product</p>
      </Modal>

      <main id="page-content">
        <h1 className="text-5xl flex justify-end ml-20 mt-7">
          <ShoppingCartOutlined /> My Cart
        </h1>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <form action="#" method="post" className="cart">
                <table className="table cart-products mb-4 mt-4">
                  <thead>
                    <tr>
                      <th scope="col" className="alt-font" />
                      <th scope="col" className="alt-font" />
                      <th scope="col" className="alt-font">
                        Product
                      </th>
                      <th scope="col" className="alt-font">
                        Price
                      </th>
                      <th scope="col" className="alt-font">
                        Quantity
                      </th>
                      <th scope="col" className="alt-font">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOders.map((pro) => {
                      sum += pro.price * pro.quantity;
                      return (
                        <tr key={pro.id}>
                          <td className="product-remove">
                            <a
                              className="btn-default text-large cursor-pointer"
                              onClick={() => showModal(pro.id)}
                            >
                              ×
                            </a>
                          </td>
                          <td className="product-thumbnail">
                            <a>
                              <img
                                className="rounded-3 lazyload"
                                src={pro.image}
                                alt="product"
                                title="product"
                              />
                            </a>
                          </td>
                          <td className="product-name">
                            <a>{pro.product_name}</a>
                          </td>
                          <td className="product-price" data-title="Price">
                            {FomatMoney(pro.price)}
                          </td>
                          <td className="product-quantity">
                            <div className="flex gap-2 items-center">
                              <button
                                type="button"
                                className="text-xl w-6 h-6 text-center"
                                onClick={() => handleChangeQuantity(-1, pro.id)}
                              >
                                -
                              </button>
                              <p className="text-xl">{pro.quantity}</p>
                              <button
                                type="button"
                                className="text-xl w-6 h-6 text-center"
                                onClick={() => handleChangeQuantity(1, pro.id)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="product-subtotal" data-title="Total">
                            {FomatMoney(pro.price * pro.quantity)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={7} className="text-center p-2">
                        <Pagination
                          current={currentPage}
                          pageSize={pageSize}
                          total={totalOders}
                          onChange={handlePageChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="cursor-pointer">
                        <Link to="/shop">back to shop</Link>
                      </td>
                      <td colSpan={3}>
                        <p className="text-red-700 text-left">
                          Total: {FomatMoney(sum)}
                        </p>
                        {cartUser && (
                          <button
                            disabled={cartUser.cart <= 0}
                            type="button"
                            className="btn bg-red-700 min-w-full hover:bg-red-500"
                            onClick={handleCheckOut}
                          >
                            Check Out
                          </button>
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footerr />
    </>
  );
}
