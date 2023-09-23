import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Unknown_page from "./User/Unknown_page";

export default function ProviderU() {
  const userLocal = JSON.parse(localStorage.getItem("userLocal")) || [];
  return <>{userLocal.role == 0 ? <Navigate to="/admin" /> : <Outlet />}</>;
}
