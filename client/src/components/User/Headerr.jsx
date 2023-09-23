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
                <div className="serach-site px-3">
                  <NavLink
                    to="/javascript:void(0)"
                    className="btn btn-secondary btn-lg rounded-circle search-icon"
                  >
                    <i className="cps cp-search align-middle" />
                  </NavLink>
                </div>
                <input className="btn btn-outline-primary btn rounded-pill" />
              </div>
            </div>
          </div>
          <div id="search-popup" className="search-drawer">
            <div className="container">
              <span className="closeSearch cps cp-times" />
              <form
                className="form minisearch"
                id="header-search"
                action="#"
                method="get"
              >
                <label className="label">
                  <span>Search</span>
                </label>
                <div className="control">
                  <div className="searchField">
                    <div className="input-box">
                      <button
                        type="submit"
                        title="Search"
                        className="action search"
                        disabled=""
                      >
                        <i className="icon cps cp-search" />
                      </button>
                      <input
                        type="text"
                        name="q"
                        defaultValue=""
                        placeholder="Search by keyword or #"
                        className="input-text"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
