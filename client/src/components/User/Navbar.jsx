import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

export default function Navbar() {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  return (
    <>
      <div className="col-4 col-sm-4 col-md-6 col-lg-7 col-xl-7 prs-0 d-none d-lg-block">
        <nav className="grid__item px-5 pr-0" id="AccessibleNav">
          <ul id="siteNav" className="site-nav medium left hidearrow flex">
            <li className="lvl1 parent mdropdown">
              <a className="cursor-pointer flex items-center">
                {userLocal ? (
                  <div className="flex gap-2">
                    <img
                      src={userLocal.avatar}
                      alt="avt"
                      className="rounded-full inline-block w-7 h-7"
                    />
                    {userLocal.full_name}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <UserOutlined className="text-xl" />
                    User
                  </div>
                )}
              </a>
              <div className="megamenu style1">
                <div className="row">
                  <div className="col-md-6 col-lg-6">
                    <h4 className="title text-uppercase">My Profile</h4>
                    <ul className="m-items lvl-1">
                      {userLocal ? (
                        <>
                          <li className="cursor-pointer">
                            <Link to="/history" className="site-nav">
                              History
                            </Link>
                          </li>
                          <li className="cursor-pointer">
                            <Link to="/cart" className="site-nav">
                              My cart
                            </Link>
                          </li>
                          <li className="cursor-pointer">
                            <a
                              className="site-nav"
                              onClick={() => {
                                localStorage.clear();
                                navigate("/sign-in");
                              }}
                            >
                              Log out
                            </a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="cursor-pointer">
                            <NavLink to="/sign-in" className="site-nav">
                              Sign in
                            </NavLink>
                          </li>
                          <li className="cursor-pointer">
                            <NavLink to="/sign-up" className="site-nav">
                              Sign up
                            </NavLink>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li className="lvl1">
              <NavLink to="/contact-us">Contact</NavLink>
            </li>
            <li className="lvl1">
              <NavLink to="/about-us">About</NavLink>
            </li>
            <li className="lvl1">
              <NavLink to="/shop">shop</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
