import React from "react";
import { Link } from "react-router-dom";

export default function Footerr() {
  return (
    <>
      <footer className="footer" id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-4 col-lg-3">
                <div className="footer-col footer-links clearfix">
                  <h4 className="title">Quick Links</h4>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about-us">About</Link>
                    </li>
                    <li>
                      <Link to="/shop">Shop</Link>
                    </li>
                    <li>
                      <Link to="/contact-us">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                <div className="footer-col footer-links clearfix">
                  <h4 className="title">Other Links</h4>
                  <ul>
                    <li>
                      <a>Help Center</a>
                    </li>
                    <li>
                      <a>My Account</a>
                    </li>
                    <li>
                      <a>FAQ</a>
                    </li>
                    <li>
                      <a>Support</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a>Return Policy</a>
                    </li>
                    <li>
                      <a>Term &amp; Conditions</a>
                    </li>
                    <li>
                      <a>Gift Cards</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-3">
                <div className="footer-col contact-col">
                  <h4 className="title">Contact</h4>
                  <ul>
                    <li>
                      <a>
                        <i className="cps cp-envelope-open" />
                        info@example.com
                      </a>
                    </li>
                    <li>
                      <a>
                        <i className="cps cp-phone" /> 309-437-4122
                      </a>
                    </li>
                    <li>
                      <i className="cps cp-map-marker" /> 343 Coburn Hollow Road
                      <br />
                      Peoria, Illinois - 61602
                    </li>
                    <li>
                      <i className="cps cp-clock" /> 9:30 am - 6:30 pm
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4 col-lg-2">
                <div className="footer-col social-col">
                  <h4 className="title">Follow Us</h4>
                  <a target="_blank">
                    <i className="cpb cp-facebook-f" />
                  </a>
                  <a target="_blank">
                    <i className="cpb cp-twitter" />
                  </a>
                  <a target="_blank">
                    <i className="cpb cp-instagram" />
                  </a>
                  <a target="_blank">
                    <i className="cpb cp-google-plus" />
                  </a>
                  <a target="_blank">
                    <i className="cpb cp-linkedin-in" />
                  </a>
                  <a target="_blank">
                    <i className="cpb cp-youtube" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <p>Tham khảo từ: 2022 TACKO. ALL RIGHTS RESERVED</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
