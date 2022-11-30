import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { GoVerified } from "react-icons/go";
import { FaShoppingBag, FaUserFriends, FaUserShield } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { MdOutlineProductionQuantityLimits, MdReportOff } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import useAdmin from "../../Hooks/UseAdmin";
import useSeller from "../../Hooks/UseSeller";

const DashboardHeader = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email, true);
  const [isSeller] = useSeller(user?.email, true);
  const [data, setData] = useState();

  const { email } = user;

  useEffect(() => {
    fetch(`https://serversite-liart.vercel.app/user/${email}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [email]);
  console.log(data);

  return (
    <div>
      <div className="h-screen p-3 space-y-2 md:w-full w-[700px]  text-gray-900">
        <div className="flex items-center p-2 space-x-4">
          <img
            src={user?.photoURL}
            alt=""
            className="w-12 h-12 p-0.5 rounded-full bg-gray-500"
          />
          <div>
            <h4 className="mt-2 font-medium text-gray-900  ">
              {user?.displayName}

              {data?.verify && (
                <GoVerified className="text-xs inline ml-2"></GoVerified>
              )}

              {data?.role === "Admin" && (
                <GoVerified className="text-xs inline ml-2  text-blue-500"></GoVerified>
              )}
            </h4>
            <span className="flex items-center space-x-1">
              <Link
                rel="noopener noreferrer"
                to="/user"
                className="text-xs hover:underline text-gray-700"
              >
                View profile
              </Link>
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-700">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {!isAdmin && !isSeller && (
              <>
                <li className="bg-gray-800 text-gray-50">
                  <NavLink
                    rel="noopener noreferrer"
                    to="/dashboard/my-orders"
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 text-white space-x-3  bg-gray-700"
                        : "flex items-center p-2 space-x-3 hover:bg-gray-400";
                    }}
                  >
                    <div className="flex items-center p-2 space-x-3 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current text-gray-400"
                      >
                        <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                      </svg>
                      <span>My Order</span>
                    </div>
                  </NavLink>
                </li>
              </>
            )}
            {isSeller && (
              <>
                <li>
                  <NavLink
                    rel="noopener noreferrer"
                    to="/dashboard/my-products"
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 text-white  bg-gray-700"
                        : "flex items-center p-2 space-x-3 hover:bg-gray-400";
                    }}
                  >
                    <div className="flex items-center p-2 space-x-3 ">
                      <FaShoppingBag className="text-xl text-gray-400"></FaShoppingBag>
                      <span>My Products</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    rel="noopener noreferrer"
                    to="/dashboard/my-buyers"
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 text-white  bg-gray-700"
                        : "flex items-center p-2 space-x-3 hover:bg-gray-400";
                    }}
                  >
                    <div className="flex items-center p-2 space-x-3 ">
                      <FaUserFriends className="text-xl text-gray-400"></FaUserFriends>
                      <span>My Buyer</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    rel="noopener noreferrer"
                    to="/dashboard/add-product"
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 text-white  bg-gray-700"
                        : "flex items-center p-2 space-x-3 hover:bg-gray-400";
                    }}
                  >
                    <div className="flex items-center p-2 space-x-3 ">
                      <MdOutlineProductionQuantityLimits className="text-xl text-gray-400"></MdOutlineProductionQuantityLimits>
                      <span>Add Product</span>
                    </div>
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <NavLink
                    rel="noopener noreferrer"
                    to="/dashboard/all-buyer"
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 text-white  bg-gray-700"
                        : "flex items-center p-2 space-x-3 hover:bg-gray-400";
                    }}
                  >
                    <div className="flex items-center p-2 space-x-3 ">
                      <HiUsers className="text-xl text-gray-400"></HiUsers>
                      <span>All Buyer</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    rel="noopener noreferrer"
                    to="/dashboard/all-seller"
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 text-white  bg-gray-700"
                        : "flex items-center p-2 space-x-3 hover:bg-gray-400";
                    }}
                  >
                    <div className="flex items-center p-2 space-x-3 ">
                      <FaUserShield className="text-xl text-gray-400"></FaUserShield>
                      <span>All Seller</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    rel="noopener noreferrer"
                    to="/dashboard/reported-items"
                    className={({ isActive }) => {
                      return isActive
                        ? "flex items-center p-2 space-x-3 text-white  bg-gray-700"
                        : "flex items-center p-2 space-x-3 hover:bg-gray-400";
                    }}
                  >
                    <div className="flex items-center p-2 space-x-3 ">
                      <MdReportOff className="text-xl text-gray-400"></MdReportOff>
                      <span>Reported Items</span>
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li className=" hover:bg-gray-400">
              <button
                onClick={() => logOut()}
                className="flex items-center p-2 space-x-3 hover:bg-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current text-gray-700"
                >
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
