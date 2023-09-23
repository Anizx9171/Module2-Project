import React, { useEffect, useState } from "react";
import SlidebarA from "../../components/Admin/SlidebarA";
import {
  getDataCategories,
  getDataProducts,
  getDataUsers,
} from "../../api/getAPI";
import HeaderA from "../../components/Admin/HeaderA";
import PreLoader from "../../components/PreLoader";
import {
  FundProjectionScreenOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
  }, []);
  return (
    <>
      {load && <PreLoader />}
      <HeaderA />
      <hr />
      <div className="flex bg-gray-50">
        <SlidebarA />
        <div className="w-4/5 mt-3">
          <div className="flex gap-5 justify-center">
            <div className="bg-white w-48 h-48 rounded-full shadow-lg flex justify-center items-center">
              <div className="flex flex-col items-center">
                <MenuUnfoldOutlined className="text-2xl text-red-700" />

                <h1 className="text-center text-2xl">Categories</h1>
                <p className="text-center">{categories.length}</p>
              </div>
            </div>
            <div className="bg-white w-48 h-48 rounded-full shadow-lg flex justify-center items-center">
              <div className="flex flex-col items-center">
                <UserOutlined className="text-2xl text-red-700" />

                <h1 className="text-center text-2xl">Users</h1>
                <p className="text-center">{users.length} </p>
              </div>
            </div>
            <div className="bg-white w-48 h-48 rounded-full shadow-lg flex justify-center items-center">
              <div className="flex flex-col items-center">
                <FundProjectionScreenOutlined className="text-2xl text-red-700" />
                <h1 className="text-center text-2xl">Product</h1>
                <p className="text-center">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className="bg-white w-3/5 h-80 shadow-lg p-4 rounded-md">
              <h1 className="text-end text-4xl">Oder history</h1>
              <div className="flex items-center justify-center">
                <div className="bg-red-700 w-4/5 h-52 mt-2 flex justify-center items-center rounded-md">
                  <h1 className="text-5xl text-white">99999999999</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
