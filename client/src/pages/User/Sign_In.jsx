import React, { useEffect, useState } from "react";
import Headerr from "../../components/User/Headerr";
import Footerr from "../../components/User/Footerr";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase/configFireBase";
import { dataAll, getDataUsers } from "../../api/getAPI";
import PreLoader from "../../components/PreLoader";
import { notification } from "antd";
import axios from "axios";
import Alert_Banned from "../../components/Alert_Banned";

export default function Sign_In() {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  if (userLocal) {
    navigate("/");
  }
  const [load, setLoad] = useState(false);
  const [alertBan, setAlertBan] = useState(false);
  const [users, setUsers] = useState([]);
  const [valueI, setValueI] = useState({
    email: "",
    password: "",
  });

  const getCarts = async () => {
    const response = await axios.get(`http://localhost:9171/carts`);
    return response.data;
  };

  const signWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (response) => {
        const userLogin = users.find((us) => us.email === response.user.email);
        // co tai khoan gmail
        if (userLogin && userLogin.email) {
          // kiem tra bi ban hay chua
          if (userLogin.banned) {
            setAlertBan(true);
            return;
          }
          // ko bi ban
          localStorage.setItem("userLocal", JSON.stringify(userLogin));
          notification.success({
            message: "Đăng nhập thành công",
            placement: "bottomLeft",
          });

          const carts = await getCarts();
          const cartUser = carts.find((cart) => cart.userId == userLogin.id);
          if (cartUser) {
            localStorage.setItem("cartId", JSON.stringify(cartUser.id));
            if (userLogin.role == 0) {
              navigate("/admin");
            } else {
              navigate("/");
            }
          } else {
            notification.error({
              message: "tài khoản cũ nên ko có",
              placement: "bottomLeft",
            });
          }
          return;
        }
        // chua co tai khoan thi tao tk moi
        else {
          const newUser = {
            email: response.user.email,
            avatar: response.user.photoURL,
            full_name: response.user.displayName,
            role: 1,
            banned_state: false,
          };

          await axios
            .post("http://localhost:9171/users", {
              ...newUser,
              password: "userdefault",
            })
            .then((response) => {
              localStorage.setItem(
                "userLocal",
                JSON.stringify(response.data.user)
              );

              return axios.post(`http://localhost:9171/carts`, {
                userId: response.data.user.id,
                cart: [],
              });
            })
            .then((res) => {
              if (res) {
                localStorage.setItem("cartId", JSON.stringify(res.data.id));
                notification.success({
                  message: "Đăng nhập thành công",
                  placement: "bottomLeft",
                });
                navigate("/");
              }
            })
            .catch((err) => {});
        }
      })
      .catch((error) => {
        notification.error({
          message: "Có lỗi sảy ra vui lòng liên hệ admin",
          placement: "bottomLeft",
        });
      });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValueI({ ...valueI, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dataAll
      .post("/login", { ...valueI, email: valueI.email.toLowerCase() })
      .then((response) => {
        if (response.data.user.banned == true) {
          setAlertBan(true);
          return;
        }
        notification.success({
          message: "Đăng nhập thành công",
          placement: "bottomLeft",
        });
        localStorage.setItem("userLocal", JSON.stringify(response.data.user));
        return response.data.user;
      })
      .then(async (user) => {
        const carts = await getCarts();
        const cartUser = carts.find((cart) => cart.userId == user.id);
        if (!cartUser) {
          const res = await axios.post(`http://localhost:9171/carts`, {
            userId: user.id,
            cart: [],
          });

          return {
            ...res,
            ...user,
          };
        } else {
          return {
            data: { ...cartUser },
            ...user,
          };
        }
      })
      .then((res) => {
        localStorage.setItem("cartId", JSON.stringify(res.data.id));
        if (res.role == 0) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((error) =>
        notification.error({
          message: "Đăng nhập thất bại",
          description: "Vui lòng kiểm tra lại thông tin đăng nhập",
          placement: "bottomLeft",
        })
      );
  };

  useEffect(() => {
    setLoad(true);
    getDataUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
  }, []);

  return (
    <>
      {load && <PreLoader />}
      {alertBan && <Alert_Banned setAlertBan={setAlertBan} />}
      <Headerr />
      <hr />
      <main id="page-content">
        <div className="container py-5">
          <div className="create-account-page">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-12 col-md-8 col-lg-8 box">
                <div className="mb-4">
                  <h3 className="text-uppercase mb-3 text-4xl">Sign In</h3>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                        <div className="form-group">
                          <label htmlFor="CustomerEmail" className="form-label">
                            Email Address <span className="required">*</span>
                          </label>
                          <input
                            id="CustomerEmail"
                            type="text"
                            name="email"
                            placeholder=""
                            className="form-control"
                            required=""
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                        <div className="form-group">
                          <label htmlFor="CustomerEmail" className="form-label">
                            Password <span className="required">*</span>
                          </label>
                          <input
                            id="CustomerEmail"
                            type="password"
                            name="password"
                            placeholder=""
                            className="form-control"
                            required=""
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-2 mt-2">
                        <button
                          type="submit"
                          className="pb-2 pt-2 bg-red-700 text-white min-w-full hover:bg-red-500"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <hr />
                    <p className="text-center">Or</p>
                    <hr />
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-2 mt-2">
                        <button
                          onClick={signWithGoogle}
                          type="button"
                          className="p-1 bg-white text-red-700 min-w-full flex items-center justify-center gap-2 hover:text-red-400"
                        >
                          Login with google account
                          <img
                            src="./src/assets/images/google__icon.png"
                            alt=""
                            width={40}
                            height={40}
                          />
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
