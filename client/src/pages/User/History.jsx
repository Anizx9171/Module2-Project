import React, { useEffect, useState } from "react";
import Headerr from "./../../components/User/Headerr";
import { Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PreLoader from "./../../components/PreLoader";
import { FomatMoney } from "./../../utils/FomatData";

export default function History() {
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  if (!userLocal) {
    navigate("/sign-in");
  }
  const [oders, setOders] = useState([]);
  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(false);

  const handleDeleteOder = async (oderDel) => {
    const { id, ...data } = oderDel;
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
        <div className="flex flex-col items-center">
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
              {oders.map((od, i) => {
                let namePr = "";
                od.cart.map((c) => {
                  products.map((pr) => {
                    if (c.idSP == pr.id) {
                      namePr += `; ${pr.product_name}, quantity: ${c.quantity}`;
                    }
                  });
                });
                return (
                  <tr key={od.id}>
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
                    <td className="text-left">{namePr}</td>
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
