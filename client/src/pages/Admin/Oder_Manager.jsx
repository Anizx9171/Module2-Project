import React, { useEffect, useState } from "react";
import SlidebarA from "../../components/Admin/SlidebarA";
import HeaderA from "../../components/Admin/HeaderA";
import { FomatMoney } from "./../../utils/FomatData";
import { Button } from "antd";
import axios from "axios";
import PreLoader from "../../components/PreLoader";

export default function Oder_Manager() {
  const [oders, setOders] = useState([]);
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);

  const handleDeny = async (odr) => {
    const { id, ...data } = odr;
    const index = oders.findIndex((e) => e.id == id);

    await data.cart.map((od) => {
      products.map(async (pro) => {
        if (pro.id == od.idSP) {
          pro.quantity += od.quantity;
          await axios
            .put(`http://localhost:9171/products/${pro.id}`, pro)
            .then(console.log((response) => "ok"))
            .catch(console.log((error) => "ko"));
        }
      });
    });

    setLoad(true);
    await axios
      .put(`http://localhost:9171/oders/${id}`, { ...data, accept: -1 })
      .then((response) => (oders[index] = response.data))
      .catch((error) => console.log("error", error))
      .finally(() => setLoad(false));
  };

  const handleAccept = async (odr) => {
    const { id, ...data } = odr;
    const index = oders.findIndex((e) => e.id == id);
    setLoad(true);
    await axios
      .put(`http://localhost:9171/oders/${id}`, { ...data, accept: 1 })
      .then((response) => (oders[index] = response.data))
      .catch((error) => console.log("error", error))
      .finally(() => setLoad(false));
  };

  useEffect(() => {
    axios
      .get("http://localhost:9171/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));

    setLoad(true);
    axios
      .get(`http://localhost:9171/oders`)
      .then((response) => setOders(response.data.sort((a, b) => b.id - a.id)))
      .catch((error) => console.log(error))
      .finally(() => setLoad(false));
  }, []);

  return (
    <>
      {load && <PreLoader />}
      <HeaderA />
      <hr />
      <div className="flex bg-gray-50">
        <SlidebarA />
        <div
          style={{ height: "85vh" }}
          className="w-4/5 mt-1 flex flex-col justify-between items-center"
        >
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-center">Action</th>
                <th className="p-2 text-center">Check</th>
                <th className="p-2 text-center">Total</th>
                <th className="p-2 text-center">Product ID purchased</th>
                <th className="p-2 text-center">Customer ID</th>
                <th className="p-2 text-center">ID oder</th>
                <th className="p-2 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {oders.map((od, i) => {
                let proIdPaint = "";
                od.cart.map((pr) => {
                  proIdPaint += ` ,#${pr.idSP}`;
                });
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    key={od.id}
                  >
                    <td className="flex gap-3 justify-center">
                      {od.accept == 0 && (
                        <>
                          <Button
                            type="primary"
                            danger
                            ghost
                            className="p-1"
                            onClick={() => handleDeny(od)}
                          >
                            Deny
                          </Button>
                          <Button
                            type="primary"
                            ghost
                            className="p-1"
                            onClick={() => handleAccept(od)}
                          >
                            Accept
                          </Button>
                        </>
                      )}
                    </td>
                    <td className="text-center">
                      {od.accept == 0
                        ? "Chưa duyệt"
                        : od.accept == 1
                        ? "Accept"
                        : "Deny"}
                    </td>
                    <td className="text-center">{FomatMoney(od.total)}</td>
                    <td>
                      <ul>{proIdPaint}</ul>
                    </td>
                    <td className="text-center">#{od.userId}</td>
                    <td className="text-center">#{od.id}</td>
                    <td className="text-center">{i + 1}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
