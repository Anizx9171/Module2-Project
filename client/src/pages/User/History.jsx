import React, { useEffect, useState } from "react";
import Headerr from "./../../components/User/Headerr";
import { Button, Input, Pagination, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PreLoader from "./../../components/PreLoader";
import { FomatMoney } from "./../../utils/FomatData";
import { SearchOutlined } from "@ant-design/icons";

export default function History() {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  if (!userLocal) {
    navigate("/sign-in");
  }
  const [oders, setOders] = useState([]);
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);
  const [textSearch, setTextSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalOders = oders.length;
  const totalPages = Math.ceil(totalOders / pageSize);

  // Tạo mảng oders cho trang hiện tại
  const currentOders = oders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteOder = async (oderDel) => {
    const { id, ...data } = oderDel;
    for (let i = 0; i < data.cart.length; i++) {
      const resPro = await axios.get(
        `http://localhost:9171/products/${data.cart[i].idSP}`
      );
      const proInfo = resPro.data;
      await axios.patch(`http://localhost:9171/products/${data.cart[i].idSP}`, {
        quantity: proInfo.quantity + data.cart[i].quantity,
      });
    }
    setLoad(true);
    await axios
      .delete(`http://localhost:9171/oders/${id}`)
      .then((response) => {
        notification.success({
          message: "Hủy đơn thành công",
        });
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
    getDataOder();
  };

  const getDataOder = () => {
    axios
      .get("http://localhost:9171/oders")
      .then((response) => {
        const odersUser = [];
        response.data.map((e) => {
          if (e.userId == userLocal.id) {
            odersUser.push(e);
          }
        });
        setOders(odersUser);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setLoad(true);
    getDataOder();
    axios
      .get("http://localhost:9171/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
  }, []);
  return (
    <>
      {load && <PreLoader />}
      <Headerr />
      <div>
        <div
          style={{ height: "85vh" }}
          className="flex flex-col items-center justify-between"
        >
          <table className="w-11/12">
            <thead>
              <tr className="bg-gray-300">
                <th className="text-center"></th>
                <th className="text-center">Order status</th>
                <th className="text-center">total price</th>
                <th className="text-center">Products purchased</th>
                <th className="text-center">Id oder</th>
                <th className="text-center">Numerical</th>
              </tr>
            </thead>
            <tbody>
              {currentOders.map((od, i) => {
                return (
                  <tr key={od.id} className="border-t">
                    <td className="text-center">
                      {od.accept == 0 && (
                        <Button onClick={() => handleDeleteOder(od)}>
                          Cancel order
                        </Button>
                      )}
                    </td>
                    <td className="text-center">
                      {od.accept == 0
                        ? "Unchanged application"
                        : od.accept == 1
                        ? "Accepting application"
                        : "Application is not accepted"}
                    </td>
                    <td className="text-center">{FomatMoney(od.total)}</td>
                    <td className="text-left">
                      <ul>
                        {od.cart.map((c) => {
                          return products.map((pr) => {
                            if (c.idSP == pr.id) {
                              return (
                                <li className="flex items-center gap-1 justify-end">
                                  <b className="text-red-600">{c.quantity}</b>
                                  :quantity ,
                                  <b className="text-red-600">
                                    {pr.product_name}
                                  </b>
                                  <img
                                    src={pr.image}
                                    alt=""
                                    className="block w-10 h-10"
                                  />
                                  +
                                </li>
                              );
                            }
                          });
                        })}
                      </ul>
                    </td>
                    <td className="text-center">#{od.id}</td>
                    <td className="text-center">{i + 1}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalOders}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
