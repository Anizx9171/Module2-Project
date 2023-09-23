import {
  CaretDownOutlined,
  FormOutlined,
  FundProjectionScreenOutlined,
  HistoryOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function SlidebarA() {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  return (
    <>
      <div className="h-screen w-1/5 pb-10">
        <div className="h-screen flex bg-re flex-grow flex-col overflow-y-auto rounded-br-lg rounded-tr-lg bg-white pt-5 shadow-md">
          <div className="flex mt-0 items-center justify-between px-4">
            <img
              className="block rounded-full h-12 w-auto max-w-full align-middle"
              src={userLocal.avatar}
              alt=""
            />
            <div className="flex ml-3 flex-col">
              <h3 className="font-medium">{userLocal.full_name}</h3>
            </div>
          </div>
          <div className="flex mt-3 flex-1 flex-col">
            <div className="">
              <nav className="flex-1">
                <Link
                  to="/admin"
                  title=""
                  className="flex mb-1 justify-between cursor-pointer items-center py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4"
                >
                  <HomeOutlined />
                  Home
                </Link>
                <div className="relative transition">
                  <input
                    className="peer hidden"
                    type="checkbox"
                    id="menu-1"
                    defaultChecked=""
                  />
                  <button className="cursor-pointer flex peer justify-between relative w-full items-center py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                    <span className="flex mr-5 w-5">
                      <PieChartOutlined />
                    </span>
                    Manager
                    <label
                      htmlFor="menu-1"
                      className="absolute inset-0 h-full w-full cursor-pointer"
                    />
                    <CaretDownOutlined />
                  </button>
                  <ul className="duration-400 flex m-2 max-h-0 flex-col overflow-hidden rounded-xl bg-gray-100 font-medium transition-all duration-300 peer-checked:max-h-96">
                    <NavLink to="/admin/user">
                      <li className="flex m-2 justify-between cursor-pointer border-l-rose-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                        <span className="mr-5">
                          <UserOutlined />
                        </span>
                        User
                      </li>
                    </NavLink>
                    <NavLink to="/admin/product">
                      <li className="flex m-2 justify-between cursor-pointer border-l-rose-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                        <span className="mr-5">
                          <FundProjectionScreenOutlined />
                        </span>
                        Product
                      </li>
                    </NavLink>
                    <NavLink to="/admin/categories">
                      <li className="flex m-2 justify-between cursor-pointer border-l-rose-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                        <span className="mr-5">
                          <MenuUnfoldOutlined />
                        </span>
                        Categories
                      </li>
                    </NavLink>
                    <NavLink to="/admin/oder">
                      <li className="flex m-2 justify-between cursor-pointer border-l-rose-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                        <span className="mr-5">
                          <FormOutlined />
                        </span>
                        Orders
                      </li>
                    </NavLink>
                  </ul>
                </div>
                <a
                  onClick={() => {
                    localStorage.clear();
                    navigate("/sign-in");
                  }}
                  title=""
                  className="flex mb-1 justify-between cursor-pointer items-center py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4"
                >
                  <LogoutOutlined />
                  Log out
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
