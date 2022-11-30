import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardMain from "../Main/DashboardMain";
import Main from "../Main/Main";
import Login from "../Pages/Authour/Login/Login";
import Registration from "../Pages/Authour/Registration/Registration";
import Catagorys from "../Pages/Catagory/Catagorys";
import AllBuyer from "../Pages/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../Pages/Dashboard/AllSeller/AllSeller";

import AddProduct from "../Pages/Dashboard/Seller/AddProduct/AddProduct";
import AllProducts from "../Pages/Dashboard/Seller/AllProduct/AllProducts";
import Home from "../Pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import WrongRoute from "./WrongRoute";
import MyProducts from "../Pages/Dashboard/Buyer/MyProducts";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import Welcome from "../Pages/Welcome";
import MyBuyers from "../Pages/Dashboard/Seller/MyBuyer/MyBuyers";
import Report from "../Pages/Dashboard/Repot/Report";
import Payment from "../Pages/Dashboard/Buyer/Payment";
import User from "../Pages/User";
import { Blog } from "../Pages/Blogs/Blog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/login", element: <Login></Login> },
      { path: "/sign-up", element: <Registration></Registration> },
      {
        path: "/user",
        element: (
          <PrivateRoute>
            <User></User>
          </PrivateRoute>
        ),
      },
      { path: "/blog", element: <Blog></Blog> },
      {
        path: "/catagory/:id",
        element: (
          <PrivateRoute>
            <Catagorys></Catagorys>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://serversite-liart.vercel.app/catagory/${params.id}`, {
            headers: {
              auth: `bearer ${localStorage.getItem("token")}`,
            },
          }),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardMain></DashboardMain>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Welcome></Welcome>,
      },
      {
        path: "/dashboard/all-seller",
        element: (
          <AdminRoute>
            <AllSeller></AllSeller>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-buyer",
        element: (
          <AdminRoute>
            <AllBuyer></AllBuyer>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reported-items",
        element: (
          <AdminRoute>
            <Report></Report>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/my-orders",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/dashboard/my-products",
        element: (
          <SellerRoute>
            <AllProducts></AllProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://serversite-liart.vercel.app/order/${params.id}`),
      },
      {
        path: "/dashboard/my-buyers",
        element: (
          <SellerRoute>
            <MyBuyers></MyBuyers>
          </SellerRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <WrongRoute></WrongRoute>,
  },
]);

export default router;
