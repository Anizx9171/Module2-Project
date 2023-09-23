import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function HeaderA() {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  return (
    <>
      <header id="header" className="header-fixed">
        <div className="header d-flex align-items-center">
          <div className="container-xl">
            <div className="row">
              <div className="col-8 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <NavLink className="logo" to="/admin">
                  <img
                    src="/src/assets/images/logo.png"
                    alt="Tacko Auto Parts Bootstrap5 Html Template"
                    title="Tacko Auto Parts Bootstrap5 Html Template"
                  />
                </NavLink>
              </div>
              <div className="col-4 col-sm-4 col-md-6 col-lg-7 col-xl-7 prs-0 d-none d-lg-block">
                <nav className="grid__item px-5 pr-0" id="AccessibleNav">
                  <ul
                    id="siteNav"
                    className="site-nav medium left hidearrow flex"
                  >
                    <li className="lvl1">
                      <NavLink to="/admin/user">User</NavLink>
                    </li>
                    <li className="lvl1">
                      <NavLink to="/admin/product">Product</NavLink>
                    </li>
                    <li className="lvl1">
                      <NavLink to="/admin/categories">Category</NavLink>
                    </li>
                    <li className="lvl1">
                      <NavLink to="/admin/oder">Oder</NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-2 col-sm-3 col-md-4 col-lg-2 col-xl-3 d-flex justify-content-end align-items-center">
                <h1>
                  <NavLink className="text-3xl logo" to="/">
                    TACKO ADMIN
                  </NavLink>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
