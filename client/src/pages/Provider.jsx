import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Unknown_page from "./User/Unknown_page";

export default function Provider() {
  const userLocal = JSON.parse(localStorage.getItem("userLocal"));
  return (
    <>
      {userLocal && userLocal.role == 0 ? (
        <Outlet />
      ) : (
        <Navigate to="/sign-in" />
      )}
    </>
  );
}
