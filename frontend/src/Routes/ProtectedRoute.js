import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isLoggedInSel } from "../Slices/userSlice";

export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(isLoggedInSel);

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};
