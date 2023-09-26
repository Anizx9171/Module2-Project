import React, { useEffect, useState } from "react";
import SlidebarA from "../../components/Admin/SlidebarA";
import {
  dataAll,
  getDataCategories,
  getDataProducts,
  getDataUsers,
} from "../../api/getAPI";
import HeaderA from "../../components/Admin/HeaderA";
import PreLoader from "../../components/PreLoader";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [oders, setOders] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    getDataUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
    getDataProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
    getDataCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
    dataAll
      .get("http://localhost:9171/oders")
      .then((response) => setOders(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
  }, []);
  return (
    <>
      {load && <PreLoader />}
      <HeaderA />
      <hr />
      <div className="flex bg-gray-50">
        <SlidebarA />
        <div className="w-4/5 mt-3">
          <div className="row items-center justify-center gap-24">
            <div
              onClick={() => navigate("/admin/oder")}
              className="hover:bg-yellow-200 w-64 h-64 cursor-pointer rounded-2xl shadow-2xl col-12 col-sm-6 col-md-3 col-lg-3 d-flex align-items-center justify-content-center text-center"
            >
              <div className="counter-item rounded-3 w-100">
                <div className="icon">
                  <i className="cps cp-store" />
                </div>
                <div className="counter">
                  <span className="counter-store">{oders.length}</span>
                </div>
                <p className="text-uppercase">Orders</p>
              </div>
            </div>
            <div
              onClick={() => navigate("/admin/user")}
              className="hover:bg-yellow-200 w-64 h-64 cursor-pointer rounded-2xl shadow-2xl col-12 col-sm-6 col-md-3 col-lg-3 d-flex align-items-center justify-content-center text-center"
            >
              <div className="counter-item rounded-3 w-100">
                <div className="icon">
                  <i className="cps cp-smile" />
                </div>
                <div className="counter">
                  <span className="counter-clients">{users.length}</span>
                </div>
                <p className="text-uppercase">Users</p>
              </div>
            </div>
          </div>
          <div className="row items-center justify-center mt-20 gap-24">
            <div
              onClick={() => navigate("/admin/product")}
              className="hover:bg-yellow-200 w-64 h-64 cursor-pointer rounded-2xl shadow-2xl col-12 col-sm-6 col-md-3 col-lg-3 d-flex align-items-center justify-content-center text-center"
            >
              <div className="counter-item rounded-3 w-100">
                <div className="icon">
                  <i className="cps cp-taxi" />
                </div>
                <div className="counter">
                  <span className="counter-rented">{products.length}</span>
                </div>
                <p className="text-uppercase">Cars</p>
              </div>
            </div>
            <div
              onClick={() => navigate("/admin/categories")}
              className="hover:bg-yellow-200 w-64 h-64 cursor-pointer rounded-2xl shadow-2xl col-12 col-sm-6 col-md-3 col-lg-3 d-flex align-items-center justify-content-center text-center"
            >
              <div className="counter-item rounded-3 w-100">
                <div className="icon">
                  <i className="cps cp-star" />
                </div>
                <div className="counter">
                  <span className="counter-world">{categories.length}</span>
                </div>
                <p className="text-uppercase">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
