import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useSeller from "../Hooks/UseSeller";
import { AuthContext } from "../Pages/AuthProvider/AuthProvider";
import Loading from "../Pages/Shared/Loading/Loading";

const SellerRoute = ({ children }) => {
  const { user, loading, logOut } = useContext(AuthContext);
  const location = useLocation();
  const [isSeller, issellerLoading] = useSeller(user?.email, true);

  if (loading || issellerLoading) {
    return <Loading></Loading>;
  }
  if (!isSeller) {
    logOut();
  }

  if (isSeller === true) {
    return children;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
