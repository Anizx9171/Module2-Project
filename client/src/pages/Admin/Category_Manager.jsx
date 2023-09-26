import React, { useEffect, useRef, useState } from "react";
import SlidebarA from "../../components/Admin/SlidebarA";
import HeaderA from "../../components/Admin/HeaderA";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  getCategory,
} from "../../redux/slice/categoriesSlice";
import { Button, Form, Input, Modal, Pagination, Popconfirm } from "antd";
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import PreLoader from "../../components/PreLoader";
import { updateCatagory } from "./../../redux/slice/categoriesSlice";
import { searchDataCategory } from "../../api/getAPI";

export default function Category_Manager() {
  const dispatch = useDispatch();
  let categories = useSelector((state) => state.category.data);
  const loading = useSelector((state) => state.category.isLoadingChange);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalCategories = categories.length;
  const totalPages = Math.ceil(totalCategories / pageSize);

  // Tạo mảng Categories cho trang hiện tại
  const currentCategories = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const confirm = (id) => {
    dispatch(deleteCategory(id));
  };
  const cancel = (e) => {
    return;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [formRef] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categoryUpdate, setCatagoryUpdate] = useState({});

  const handleShowModal = (cate) => {
    setCatagoryUpdate(cate);
    formRef.setFieldsValue(cate);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setCatagoryUpdate();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setCatagoryUpdate();
    setIsModalOpen(false);
    formRef.resetFields();
  };
  const onFinish = (values) => {
    if (categoryUpdate && categoryUpdate.id) {
      dispatch(
        updateCatagory({
          ...values,
          id: categoryUpdate.id,
        })
      );
      formRef.resetFields();
      handleCancel();
      return;
    }

    dispatch(addCategory(values));
    formRef.resetFields();
    handleCancel();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [loading]);

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
          <div className="w-full ">
            {/* search */}
            <div className="w-2/5 flex items-center border bg-white p-1 rounded mr-3 mt-1">
              <input type="text" className="border-none" />
              <div className="border-r">
                <button className="h-10 w-20 border-none flex items-center justify-center">
                  <FileSearchOutlined />
                </button>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col items-end">
              <Button
                className="border-none p-0 mb-2 ml-2"
                onClick={setIsModalOpen}
              >
                <AppstoreAddOutlined className="text-2xl text-green-500" />
              </Button>
              <Modal
                title="Add category"
                maskClosable={false}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={<></>}
              >
                <Form
                  name="basic"
                  form={formRef}
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Category Name"
                    name="category_name"
                    rules={[
                      {
                        required: true,
                        message: "!Please input your username",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button htmlType="submit" className="w-full">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-center" colSpan={2}>
                      action
                    </th>
                    <th className="p-2 text-center">Name category</th>
                    <th className="p-2 text-center">Id</th>
                    <th className="p-2 text-center">Stt</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.map((cat, i) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      key={cat.id}
                    >
                      <td className="p-2">
                        <Popconfirm
                          title="Delete the task"
                          description="?Are you sure to delete this task"
                          onConfirm={() => confirm(cat.id)}
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
                      <td className="p-2">
                        <EditOutlined
                          onClick={() => handleShowModal(cat)}
                          title="Sửa"
                          className="text-yellow-500 text-lg hover:text-yellow-700"
                        />
                      </td>
                      <td className="p-2">{cat.category_name}</td>
                      <td className="p-2">#{cat.id}</td>
                      <td className="p-2">{i + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalCategories}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
