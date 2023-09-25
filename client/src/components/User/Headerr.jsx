import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
export default function Headerr() {
  return (
    <>
      <header id="header" className="header-fixed">
        <div className="header d-flex align-items-center">
          <div className="container-xl">
            <div className="row">
              <div className="col-8 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <NavLink className="logo" to="/">
                  <img
                    src="/src/assets/images/logo.png"
                    alt="Tacko Auto Parts Bootstrap5 Html Template"
                    title="Tacko Auto Parts Bootstrap5 Html Template"
                  />
                </NavLink>
              </div>
              <Navbar />
              <div className="col-2 col-sm-3 col-md-4 col-lg-2 col-xl-3 d-flex justify-content-end align-items-center">
                <h1>
                  <NavLink className="text-3xl logo" to="/admin">
                    TACKO USER
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
