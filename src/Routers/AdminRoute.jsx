import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/UseAdmin";
import { AuthContext } from "../Pages/AuthProvider/AuthProvider";
import Loading from "../Pages/Shared/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading, logOut } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);

  if (loading || isAdminLoading) {
    return <Loading></Loading>;
  }
  if (!isAdmin) {
    logOut();
  }
  if (isAdmin === true) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
