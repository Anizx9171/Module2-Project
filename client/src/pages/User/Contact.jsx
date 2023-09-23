import React from "react";
import Footerr from "../../components/User/Footerr";
import Headerr from "../../components/User/Headerr";

export default function Contact() {
  return (
    <>
      <Headerr />
      <hr />
      <main id="page-content">
        <div className="section contact-info-section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="contact-info">
                  <div className="title d-flex justify-content-between">
                    <h3 className="text-uppercase">Phone</h3>
                    <i className="cps cp-phone" />
                  </div>
                  <p className="text-uppercase">
                    Sales: 309-437-4122
                    <br /> Order Status: 309-437-4122
                    <br /> Customer Service: 309-437-4122
                    <br /> Local: 309-437-4020 <br />
                    Fax: 309-437-4021
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="contact-info">
                  <div className="title d-flex justify-content-between">
                    <h3 className="text-uppercase">Our Address</h3>
                    <i className="cps cp-map-marker" />
                  </div>
                  <p className="text-uppercase">
                    Tacko.com
                    <br /> 343 Coburn Hollow Road <br />
                    Peoria, Illinois - 61602
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="contact-info">
                  <div className="title d-flex justify-content-between">
                    <h3 className="text-uppercase">Email</h3>
                    <i className="cps cp-envelope-open" />
                  </div>
                  <p className="text-uppercase">
                    Sales: info@example.com <br />
                    Order Status: info@example.com <br />
                    Support: info@example.com <br />
                    General: info@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="contact-form-section section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="contact-inner">
                  <div className="formFeilds contact-form form-vertical">
                    <div className="section-title text-center mb-4">
                      <h2 className="title text-uppercase mb-2">
                        Get In Touch
                      </h2>
                      <small>
                        Morbi mollis vestibulum sollicitudin. Nunc in eros a
                        justo facilisis rutrum. Aenean id ullamcorper libero{" "}
                        <br />
                        Vestibulum imperdiet nibh vel magna lacinia commodo
                        ultricies.
                      </small>
                    </div>
                    <form
                      action="php/ajax_sendmail.php"
                      name="contactus"
                      method="post"
                      id="contact-form"
                      className="contact-form"
                    >
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                          <div className="form-group">
                            <label
                              htmlFor="ContactFormName"
                              className="form-label"
                            >
                              Your Name <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              id="ContactFormName"
                              name="name"
                              className="form-control"
                              placeholder=""
                              defaultValue=""
                            />
                            <span className="error_msg" id="name_error" />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                          <div className="form-group">
                            <label
                              htmlFor="ContactFormEmail"
                              className="form-label"
                            >
                              Your Email <span className="required">*</span>
                            </label>
                            <input
                              type="email"
                              id="ContactFormEmail"
                              name="email"
                              className="form-control"
                              placeholder=""
                              defaultValue=""
                            />
                            <span className="error_msg" id="email_error" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                          <div className="form-group">
                            <label
                              htmlFor="ContactFormPhone"
                              className="form-label"
                            >
                              Phone Number
                            </label>
                            <input
                              className="form-control"
                              type="tel"
                              id="ContactFormPhone"
                              name="phone"
                              pattern="[0-9\-]*"
                              placeholder=""
                              defaultValue=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-3">
                          <div className="form-group">
                            <label
                              htmlFor="ContactSubject"
                              className="form-label"
                            >
                              Subject <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              id="ContactSubject"
                              name="subject"
                              className="form-control"
                              placeholder=""
                              defaultValue=""
                            />
                            <span className="error_msg" id="subject_error" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                          <div className="form-group">
                            <label
                              htmlFor="ContactFormMessage"
                              className="form-label"
                            >
                              Message <span className="required">*</span>
                            </label>
                            <textarea
                              id="ContactFormMessage"
                              name="message"
                              className="form-control"
                              rows={4}
                              placeholder=""
                              defaultValue={""}
                            />
                            <span className="error_msg" id="message_error" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <div className="form-group mailsendbtn mb-0 w-100 text-center">
                            <input
                              className="btn btn-primary rounded"
                              type="submit"
                              name="contactus"
                              defaultValue="Send Message"
                            />
                            <div className="loading">
                              <img
                                className="img-fluid"
                                src="./src/assets/images/ajax-loader.gif"
                                alt="loading"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="response-msg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="feature-text-image-section section pt-0">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <div className="section-title text-start">
                  <h2 className="title text-uppercase mb-2">
                    Want to Save time?
                  </h2>
                </div>
                <p>Please use our online self service center</p>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-5 col-lg-5 mb-4">
                    <h5 className="text-uppercase">Sales Hours</h5>
                    <p>
                      Mon - Fri: 9:30 am - 6:30 pm
                      <br /> Sat - Sun: 10:30 am - 5:00 pm
                    </p>
                  </div>
                  <div className="col-12 col-sm-6 col-md-5 col-lg-5">
                    <h5 className="text-uppercase">Support Hours</h5>
                    <p>
                      Mon - Fri: 9:30 am - 6:30 pm
                      <br /> Sat: 10:30 am - 5:00 pm <br />
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                <div className="img">
                  <img
                    src="./src/assets/images/contact-img1.jpg"
                    data-src="./src/assets/images/contact-img1.jpg"
                    alt="Contact"
                    title="Contact"
                    className=" lazyload rounded-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="feature-text-image-section feature-text-image-section2 section pt-0">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-9">
                <div className="img">
                  <div className="position-absolute top-0">
                    <a href="https://www.google.com/maps/search/343+Coburn+Hollow+Road+Peoria,+Illinois+-+61602/@40.6758102,-89.621306,14z/data=!3m1!4b1">
                      <img
                        src="./src/assets/images/map-img.jpg"
                        data-src="./src/assets/images/map-img.jpg"
                        alt="Google map"
                        title="Google Map"
                        className=" lazyload rounded-3"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-3">
                <div className="location-text">
                  <div className="section-title text-end">
                    <h2 className="title text-uppercase mb-2">Location</h2>
                  </div>
                  <p className="text-end">
                    Tacko.com
                    <br /> 343 Coburn Hollow Road <br />
                    Peoria, Illinois - 61602
                  </p>
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
