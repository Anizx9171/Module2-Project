import React from "react";
import { Link } from "react-router-dom";

export default function Unknown_page() {
  return (
    <>
      <main id="page-content" className="mb-0">
        <section className="section error-404-section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-8 col-lg-6">
                <div className="error-content">
                  <h1 className="title">404</h1>
                  <h2 className="mb-3 text-white">Page not found</h2>
                  <p className="mb-4 text-white">
                    Oops! The page you are looking for does not exist.
                    <br /> It might have been moved or deleted.
                  </p>
                  <Link
                    to="/"
                    className="btn btn-outline-primary btn-lg rounded-pill text-white border-white"
                  >
                    <i className="cp-lg cps cp-home mx-2 " /> Back To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
