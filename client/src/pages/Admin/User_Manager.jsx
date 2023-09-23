import React, { useEffect, useState } from "react";
import SlidebarA from "../../components/Admin/SlidebarA";
import HeaderA from "../../components/Admin/HeaderA";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveUser, getUser } from "../../redux/slice/usersSlice";
import PreLoader from "../../components/PreLoader";

export default function User_Manager() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.isLoadingChange);

  useEffect(() => {
    dispatch(getUser());
  }, [loading]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / pageSize);

  // Tạo mảng users cho trang hiện tại
  const currentUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-center">Action</th>
                <th className="p-2 text-center">Banned</th>
                <th className="p-2 text-center">Role</th>
                <th className="p-2 text-center">Email</th>
                <th className="p-2 text-center">Full Name</th>
                <th className="p-2 text-center">Id</th>
                <th className="p-2 text-center">Stt</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((us, i) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={us.id}
                >
                  <td className="text-center">
                    {us.role ? (
                      <button
                        onClick={() => dispatch(changeActiveUser(us))}
                        className="bg-yellow-600 hover:bg-yellow-400 text-white font-bold py-1 px-2 rounded"
                      >
                        {!us.banned ? "Lock" : "Unlock"}
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                  <td
                    className={`p-2 text-center ${
                      us.banned ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {us.banned ? "Banned" : "Active"}
                  </td>
                  <td className="p-2">{us.role == 0 ? "Admin" : "User"}</td>
                  <td className="p-2">{us.email}</td>
                  <td className="p-2">{us.full_name}</td>
                  <td className="p-2">#{us.id}</td>
                  <td className="p-2">{i + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalUsers}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}
