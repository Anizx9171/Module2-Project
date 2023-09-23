import React from "react";
import Headerr from "../../components/User/Headerr";
import Footerr from "../../components/User/Footerr";

export default function About() {
  return (
    <>
      <Headerr />
      <hr />
      <main id="page-content">
        <section className="about-text-image-section section pt-0 mt-14">
          <div className="container">
            <div className="row align-items-center mb-4">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <img
                  src="./src/assets/images/logo.png"
                  alt="Tacko Auto Parts Bootstrap5 Html Template"
                  title="Tacko Auto Parts Bootstrap5 Html Template"
                  className="mb-4"
                />
                <p className="large-font">
                  <b>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quas placeat illum ducimus accusantium error. Commodi
                    distinctio soluta porro deserunt earum sunt recusandae
                    omnis, cum dicta!
                  </b>
                </p>
                <h3>
                  Greetings and warm welcome to
                  <br /> The Tacko car service center!
                </h3>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className="img">
                  <img
                    src="./src/assets/images/about-us-img.jpg"
                    alt="About us"
                    title="Tacko Auto Parts Bootstrap5 Html Template"
                    className="lazyload"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p>
                  We have 9 years experienced in this field, Tacko is your ONE
                  STOP solution bringing best car services in sanfransisco for
                  all majors car care requirements. Be it regulars car service,
                  washing &amp; detailing, majors car repairs.Mistakens idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete.
                </p>
                <p>
                  24x7 emergency car care, we at Tacko aim to bring the auto
                  service industry at your fingertips. We provide car care
                  services to owners and services providerss through our
                  tech-enabled mobile and web platforms. who do not know how ut
                  to rationally encounter consequences that are pursues
                  extremely anyone.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="benefit-section">
          <div className="benefit-section-in section">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h2 className="title text-uppercase">Benefits</h2>
                  </div>
                  <p className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                    commodo viverra maecenas accumsan lacus vel facilisis.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="benefit-section-items">
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
                  <div className="box-content">
                    <div className="icon">
                      <i className="cps cp-coins" />
                    </div>
                    <h4>
                      Affordable
                      <br /> Prices
                    </h4>
                    <p>
                      We aim to provide the highest quality products at the
                      lowest prices possible.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
                  <div className="box-content">
                    <div className="icon">
                      <i className="cps cp-video" />
                    </div>
                    <h4>How-to Videos &amp; Articles</h4>
                    <p>
                      Get insider knowledge through our free articles, shopping
                      guides &amp; videos.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
                  <div className="box-content">
                    <div className="icon">
                      <i className="cps cp-puzzle-piece" />
                    </div>
                    <h4>
                      Extensive <br />
                      Selection
                    </h4>
                    <p>
                      We offer over 14 M parts and accessories from thousands of
                      trusted brands.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 text-center">
                  <div className="box-content">
                    <div className="icon">
                      <i className="cps cp-star" />
                    </div>
                    <h4>120,000+ Customer Reviews</h4>
                    <p>
                      Get product-specific feedback &amp; opinions from our
                      other verified customers.
                    </p>
                  </div>
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
