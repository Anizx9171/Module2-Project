import React, { useEffect, useState } from "react";
import SlidebarA from "../../components/Admin/SlidebarA";
import HeaderA from "../../components/Admin/HeaderA";
import { FomatMoney } from "./../../utils/FomatData";
import PreLoader from "../../components/PreLoader";
import { Button, Modal, Pagination, Popconfirm, Upload, message } from "antd";
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "./../../redux/slice/productsSlice";
import { getCategory } from "./../../redux/slice/categoriesSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/configFireBase";

export default function Product_Manager() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.data);
  const categories = useSelector((state) => state.category.data);
  const loading = useSelector((state) => state.product.isLoadingChange);
  const [idEdit, setIdEdit] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / pageSize);

  // Tạo mảng sản phẩm cho trang hiện tại
  const currentProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const cancel = () => {};
  const confirm = (id) => {
    dispatch(deleteProduct(id));
  };

  const [valueInput, setValueInput] = useState({
    product_name: "",
    category: "",
    quantity: 0,
    price: 0,
    form: "",
    description: "",
  });

  const HandleGetValue = (e) => {
    const { name, value } = e.target;
    setValueInput({ ...valueInput, [name]: value });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (pro) => {
    setIdEdit(pro.id);
    setValueInput({
      product_name: pro.product_name,
      category: pro.category,
      quantity: pro.quantity,
      price: pro.price,
      form: pro.form,
      description: pro.description,
    });
    setIsModalOpen(true);
  };

  const handleOk = async (id) => {
    const newProduct = {
      product_name: valueInput.product_name || "",
      category: valueInput.category || "",
      image: imageURL || "",
      quantity: valueInput.quantity || 0,
      form: valueInput.form || "",
      price: valueInput.price || 0,
      description: valueInput.description || "",
    };
    if (idEdit) {
      await dispatch(updateProduct({ ...newProduct, idEdit: idEdit }));
      setIdEdit(null);
    } else {
      await dispatch(addNewProduct(newProduct));
    }
    await setValueInput({
      product_name: "",
      category: "",
      quantity: 0,
      price: 0,
      form: "",
      description: "",
    });
    setImageURL("");
    setIsModalOpen(false);
  };

  const handleCancel = async () => {
    await setValueInput({
      product_name: "",
      category: "",
      quantity: 0,
      price: 0,
      form: "",
      description: "",
    });
    setIdEdit(null);
    setImageURL("");
    setIsModalOpen(false);
  };

  // =================================================================
  const [imageURL, setImageURL] = useState("");
  // Props của Upload
  const props = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // Lấy đường dẫn của ảnh sau khi hoàn tất quá trình tải
        const downloadURL = info.file.response.url;

        // Lưu đường dẫn vào trong một state
        setImageURL(downloadURL);
        // Hiển
        message.success("Tải lên hình ảnh thành công.");
      } else if (info.file.status === "error") {
        message.error("Tải lên hình ảnh thất bại.");
      }
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const imageRef = ref(storage, `images/${file.name}`);
        uploadBytes(imageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            console.log("==> url: ", url);
            setImageURL(url);
            onSuccess({ url: url });
          });
        });
      } catch (error) {
        onError(error);
      }
    },
  };

  //============================================================================

  useEffect(() => {
    dispatch(getProduct());
  }, [loading]);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <>
      {loading && <PreLoader />}
      <HeaderA />
      <hr />
      <div className="flex bg-gray-50">
        <SlidebarA />
        <div
          style={{ height: "85vh" }}
          className="w-4/5 mt-1 flex flex-col justify-between items-center"
        >
          <div className="w-full flex flex-col items-end">
            <Button className="border-none p-0 mb-2 ml-2" onClick={showModal}>
              <AppstoreAddOutlined className="text-2xl text-green-500" />
            </Button>
            <Modal
              title="Add New Product"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              maskClosable={false}
              style={{ marginTop: -100 }}
              okType="default"
            >
              <form className="p-2">
                <div>
                  <label className="mt-3 mb-1 mr-4">Product Name</label>
                  <input
                    value={valueInput.product_name}
                    name="product_name"
                    className="p-2"
                    type="text"
                    onChange={HandleGetValue}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">Hính ảnh</label>
                  <div className="flex items-center justify-between">
                    <img src={imageURL} alt="img" className="block w-20 h-20" />
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </div>
                </div>
                <div>
                  <label className="mt-3 mb-1 mr-4">Category</label>
                  <select
                    name="category"
                    className="p-2"
                    onChange={HandleGetValue}
                  >
                    {categories.map((cate) => (
                      <option className="p-2" value={cate.id} key={cate.id}>
                        {cate.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mt-3 mb-1 mr-4">Quantity</label>
                  <input
                    value={valueInput.quantity}
                    type="number"
                    className="p-2"
                    onChange={HandleGetValue}
                    name="quantity"
                  />
                </div>
                <div>
                  <label className="mt-3 mb-1 mr-4">Price</label>
                  <input
                    type="number"
                    className="p-2"
                    onChange={HandleGetValue}
                    name="price"
                    value={valueInput.price}
                  />
                </div>
                <div>
                  <label className="mt-3 mb-1 mr-4">From</label>
                  <input
                    type="text"
                    className="p-2"
                    onChange={HandleGetValue}
                    name="form"
                    value={valueInput.form}
                  />
                </div>
                <div>
                  <label className="mt-3 mb-1 mr-4">Description</label>
                  <textarea
                    className="p-2"
                    name="description"
                    cols="5"
                    rows="3"
                    onChange={HandleGetValue}
                    value={valueInput.description}
                  ></textarea>
                </div>
              </form>
            </Modal>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-center" colSpan={2}>
                    Action
                  </th>
                  <th className="p-2 text-center">Description</th>
                  <th className="p-2 text-center">Form</th>
                  <th className="p-2 text-center">Category id</th>
                  <th className="p-2 text-center">Quantity</th>
                  <th className="p-2 text-center">Price</th>
                  <th className="p-2 text-center">Image</th>
                  <th className="p-2 text-center">Name Product</th>
                  <th className="p-2 text-center">Id</th>
                  <th className="p-2 text-center">Stt</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((pro, i) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    key={pro.id}
                  >
                    <td>
                      <Popconfirm
                        title="Delete the task"
                        description="?Are you sure to delete this task"
                        onConfirm={() => confirm(pro.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                        okType="danger"
                      >
                        <Button
                          danger
                          className="p-0 m-0 rounded-full border-none"
                        >
                          <DeleteOutlined
                            title="Xóa"
                            className="text-red-500 text-lg hover:text-red-700"
                          />
                        </Button>
                      </Popconfirm>
                    </td>
                    <td>
                      <Button
                        className="m-0 p-0 border-none"
                        onClick={() => showModal(pro)}
                      >
                        <EditOutlined className="text-xl text-yellow-500" />
                      </Button>
                    </td>
                    <td className="p-2 text-center">
                      ...{pro.description.substring(0, 20)}
                    </td>
                    <td className="p-2 text-center">{pro.form}</td>
                    <td className="p-2 text-center">{pro.category}</td>
                    <td className="p-2 text-center">{pro.quantity}</td>
                    <td className="p-2 text-center">{FomatMoney(pro.price)}</td>
                    <td className="p-2">
                      <img
                        src={pro.image}
                        alt="#"
                        className="block w-36 h-28"
                      />
                    </td>
                    <td className="p-2">{pro.product_name.substring(0, 24)}</td>
                    <td className="p-2">#{pro.id}</td>
                    <td className="p-2 text-center">{i + 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalProducts}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
