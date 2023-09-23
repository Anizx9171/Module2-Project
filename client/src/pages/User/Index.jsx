import React from "react";
import Headerr from "../../components/User/Headerr";
import Footerr from "../../components/User/Footerr";
import { Link, useNavigate } from "react-router-dom";
export default function Index() {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  if (userLocal.role == 0) {
    navigate("/admin");
  }
  return (
    <>
      <Headerr />
      <main id="page-content">
        <section className="slideshow home-slideshow p-0">
          <div className=" lazyload">
            <img
              className="lazyload desktop-hide brightness-50"
              src="./src/assets/images/slideshow/slideshow-banner1.webp"
              alt="Say hell to true car buying bliss"
              title="Say hell to true car buying bliss"
              width={1920}
              height={830}
            />
          </div>
        </section>
        <section className="section feature-section p-0 position-relative bottom-80 -mb-32">
          <div className="container">
            <div className="feature-section-in rounded-3">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-8 col-lg-8 d-flex flex-column justify-content-center">
                  <div className="feature-content">
                    <h2 className="title mb-3">
                      Get pre qualified <span>+</span>
                      <br />
                      Get your full free credit report
                    </h2>
                    <h3 className="mb-3">
                      <i className="cps cp-check-square" /> No Credit hit
                    </h3>
                    <ul className="items clearfix mb-4 mt-4">
                      <li>
                        <div className="icon rounded-circle">
                          <i className="cps cp-sliders-h" />
                        </div>
                        <h5>Personalized Solutions</h5>
                      </li>
                      <li>
                        <div className="icon rounded-circle">
                          <i className="cps cp-calculator" />
                        </div>
                        <h5>Education</h5>
                      </li>
                      <li>
                        <div className="icon rounded-circle">
                          <i className="cps cp-coins" />
                        </div>
                        <h5>Budgeting Tool</h5>
                      </li>
                      <li>
                        <div className="icon rounded-circle">
                          <i className="cps cp-thumbs-up" />
                        </div>
                        <h5>Buying Power</h5>
                      </li>
                    </ul>
                    <Link
                      to="/shop"
                      className="btn btn-lg rounded-pill btn-primary"
                    >
                      Go shopping now
                    </Link>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4 col-lg-4 d-none align-items-center d-lg-flex d-md-flex">
                  <div className="position-absolute">
                    <img
                      className="lazyload"
                      src="./src/assets/images/phone-img.png"
                      alt="Congratulations!"
                      title="Congratulations!"
                      width={418}
                      height={738}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section why-choose-section pt-0 position-relative pb-0">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="section-title">
                  <h2 className="title text-uppercase">Why Choose Us</h2>
                </div>
                <div className="intro-text text-center">
                  <h1>Here is some reason for keeping with us</h1>
                  <p className="mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                    commodo viverra maecenas accumsan lacus vel facilisis.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-3 mt-3">
                <ul className="items col1">
                  <li className="item">
                    <div className="title d-flex align-items-center mb-1">
                      <i className="cps cp-chess-king" />
                      <h4 className="mb-0 text-uppercase">Top Company</h4>
                    </div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting.
                    </p>
                  </li>
                  <li className="item">
                    <div className="title d-flex align-items-center mb-1">
                      <i className="cps cp-user-cog" />
                      <h4 className="mb-0 text-uppercase">Expert Maker</h4>
                    </div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting.
                    </p>
                  </li>
                  <li className="item">
                    <div className="title d-flex align-items-center mb-1">
                      <i className="cps cp-tools" />
                      <h4 className="mb-0 text-uppercase">Quality Services</h4>
                    </div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 mt-3">
                <div className="why-img text-center">
                  <img
                    className="lazyload"
                    src="./src/assets/images/why-choose-img.webp"
                    alt="Why Choose Us"
                    title="Why Choose Us"
                    width={562}
                    height={622}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-3 mt-3">
                <ul className="items col2">
                  <li className="item text-end">
                    <div className="title d-flex align-items-center justify-content-end mb-1">
                      <h4 className="mb-0 text-uppercase">Best Equipment</h4>
                      <i className="cps cp-wrench" />
                    </div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting.
                    </p>
                  </li>
                  <li className="item text-end">
                    <div className="title d-flex align-items-center justify-content-end mb-1">
                      <h4 className="mb-0 text-uppercase">100% Satisfaction</h4>
                      <i className="cps cp-thumbs-up" />
                    </div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting.
                    </p>
                  </li>
                  <li className="item text-end">
                    <div className="title d-flex align-items-center justify-content-end mb-1">
                      <h4 className="mb-0 text-uppercase">
                        2 Monthly Services
                      </h4>
                      <i className="cps cp-tools" />
                    </div>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="section about-section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 d-flex offset-lg-6">
                <div className="about-content">
                  <div className="section-title text-start">
                    <h2 className="title text-uppercase">About Us</h2>
                  </div>
                  <h2 className="text-uppercase white-text mb-3">
                    Feel The Best Experience with Our Rental Deals
                  </h2>
                  <p className="white-text">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section counter-section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3 col-lg-3 d-flex align-items-center justify-content-center text-center">
                <div className="counter-item rounded-3 w-100">
                  <div className="icon">
                    <i className="cps cp-store" />
                  </div>
                  <div className="counter">
                    <span className="counter-store">25</span>{" "}
                    <span className="plus-sign">+</span>
                  </div>
                  <p className="text-uppercase">Years in Business</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3 col-lg-3 d-flex align-items-center justify-content-center text-center">
                <div className="counter-item rounded-3 w-100">
                  <div className="icon">
                    <i className="cps cp-smile" />
                  </div>
                  <div className="counter">
                    <span className="counter-clients">4784</span>{" "}
                    <span className="plus-sign">+</span>
                  </div>
                  <p className="text-uppercase">Happy Clients</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3 col-lg-3 d-flex align-items-center justify-content-center text-center">
                <div className="counter-item rounded-3 w-100">
                  <div className="icon">
                    <i className="cps cp-taxi" />
                  </div>
                  <div className="counter">
                    <span className="counter-rented">5174</span>{" "}
                    <span className="plus-sign">+</span>
                  </div>
                  <p className="text-uppercase">Car Repaired</p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3 col-lg-3 d-flex align-items-center justify-content-center text-center">
                <div className="counter-item rounded-3 w-100">
                  <div className="icon">
                    <i className="cps cp-star" />
                  </div>
                  <div className="counter">
                    <span className="counter-world">4.9</span>
                  </div>
                  <p className="text-uppercase">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footerr />
    </>
  );
}
