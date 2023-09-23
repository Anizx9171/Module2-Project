import React, { useEffect, useState } from "react";
import Headerr from "../../components/User/Headerr";
import Footerr from "../../components/User/Footerr";
import { dataAll, getDataUsers } from "../../api/getAPI";
import { notification } from "antd";
import PreLoader from "../../components/PreLoader";
import { useNavigate } from "react-router-dom";

export default function Sign_Up() {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  if (userLocal) {
    navigate("/");
  }
  const [accept, setAccept] = useState(false);
  const [load, setLoad] = useState(false);
  const [users, setUsers] = useState([]);
  const [wanning, setWanning] = useState(" ");
  const [err, setErr] = useState(false);
  const [valueI, setValueI] = useState({
    fullName: "",
    password: "",
    email: "",
    confirmpassword: "",
  });
  console.log(`${valueI.fistName} ${valueI.lastName}`);
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueI({ ...valueI, [name]: value });
    setWanning("");
    setErr(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const nameRegex = /^[a-zA-ZÀ-ỹ\s']+$/;

    if (valueI.fullName == "") {
      setWanning("Tên không được để trống");
      setErr(true);
      return;
    } else {
      setWanning("");
      setErr(false);
    }

    if (!nameRegex.test(valueI.fullName)) {
      setWanning("Tên không hợp lệ");
      setErr(true);
      return;
    }
    if (valueI.email == "") {
      setWanning("Email không được để trống");
      setErr(true);
      return;
    }
    if (!emailRegex.test(valueI.email)) {
      setWanning("Email không hợp lệ");
      setErr(true);
      return;
    }
    if (valueI.password == "") {
      setWanning("Mật khẩu không được để trống");
      setErr(true);
      return;
    }
    if (valueI.password.length < 6) {
      setWanning("Mật khẩu cần ít nhất 6 kí tự");
      setErr(true);
      return;
    }
    if (valueI.password != valueI.confirmpassword) {
      setWanning("Mật khẩu không trùng khớp");
      setErr(true);
      return;
    }
    const index = users.findIndex(
      (e) => e.email.toLowerCase() == valueI.email.toLowerCase()
    );
    if (index != -1) {
      setWanning("Gmail đã được đăng kí");
      setErr(true);
    }
    const newUser = {
      full_name: valueI.fullName,
      password: valueI.password,
      email: valueI.email.toLocaleLowerCase(),
      role: 1,
      banned_state: false,
      avatar:
        "https://icon-library.com/images/default-user-icon/default-user-icon-29.jpg",
    };

    console.log("newUser", newUser);

    dataAll
      .post("/users", newUser)
      .then((response) => {
        if (response.status == 201) {
          notification.success({
            message: "Đăng kí thành công",
            description: "vui lòng đăng nhập để tiếp tục",
            placement: "bottomLeft",
          });
          navigate("/sign-in");
        }
      })
      .catch((error) =>
        notification.error({
          message: "Đã có lỗi sẩy ra",
          placement: "bottomLeft",
        })
      );
  };

  useEffect(() => {
    setLoad(true);
    getDataUsers()
      .then((response) => setUsers(response.data))
      .catch((error) =>
        notification.error({
          message: "Xuất hiện sự cố!",
          placement: "bottomLeft",
        })
      )
      .finally(() => setLoad(false));
  }, []);
  return (
    <>
      {load && <PreLoader />}
      <Headerr />
      <hr />
      <main id="page-content">
        <div className="container py-5">
          <div className="create-account-page">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 box">
                <div className="mb-4">
                  <h3 className="text-uppercase mb-3 text-4xl">Sign Up</h3>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                        <div className="form-group">
                          <label
                            htmlFor="CustomerLastName"
                            className="form-label"
                          >
                            Full name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            className={`form-control ${
                              err && "border-red-500"
                            }`}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                        <div className="form-group">
                          <label htmlFor="CustomerEmail" className="form-label">
                            Email Address <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            name="email"
                            placeholder="Enter your email address"
                            className={`form-control ${
                              err && "border-red-500"
                            }`}
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                        <div className="form-group">
                          <label
                            htmlFor="CustomerPassword"
                            className="form-label"
                          >
                            Password <span className="required">*</span>
                          </label>
                          <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className={`form-control ${
                              err && "border-red-500"
                            }`}
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                        <div className="form-group">
                          <label
                            htmlFor="CustomerConfirmPassword"
                            className="form-label"
                          >
                            Confirm Password <span className="required">*</span>
                          </label>
                          <input
                            type="Password"
                            name="confirmpassword"
                            placeholder="Confirm your password"
                            className={`form-control ${
                              err && "border-red-500"
                            }`}
                            required=""
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-2 mt-2">
                        <div className="customCheckbox form-check clearfix">
                          <input
                            className="form-check-input"
                            name="checkbox1"
                            type="checkbox"
                            checked={accept}
                            onChange={() => setAccept(!accept)}
                          />
                          <label htmlFor="checkbox1">
                            By registering your details you agree to our{" "}
                            <a href="term-condition.html">
                              <u>Terms and Conditions</u>
                            </a>{" "}
                            and{" "}
                            <a href="#">
                              <u>Cookie Policy</u>
                            </a>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <p className="text-center text-red-600"> {wanning} </p>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-2 mt-2">
                        <button
                          disabled={!accept}
                          style={{
                            filter: !accept ? "brightness(40%)" : "none",
                          }}
                          className="pb-2 pt-2 bg-red-700 text-white min-w-full hover:bg-red-500"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footerr />
    </>
  );
}
