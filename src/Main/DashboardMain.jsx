import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../Pages/AuthProvider/AuthProvider";
import DashboardHeader from "../Pages/Dashboard/DashboardHeader";
import { Nav } from "../Pages/Shared/Header/Nav";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Footer from "../Pages/Shared/Footer/Footer";

const DashboardMain = () => {
  const { side, setSide } = useContext(AuthContext);

  return (
    <div>
      <Nav></Nav>
      <div className="md:hidden block">
        {!side ? (
          <button className="text-2xl p-4 " onClick={() => setSide(true)}>
            <FaBars></FaBars>
          </button>
        ) : (
          <button className=" text-2xl p-4 " onClick={() => setSide(false)}>
            <ImCross></ImCross>
          </button>
        )}
      </div>

      <div className="flex">
        <div className={side ? "lg:w-[340px] md:w-48 w-full" : "hidden"}>
          <DashboardHeader></DashboardHeader>
        </div>
        <div className=" w-full">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardMain;
