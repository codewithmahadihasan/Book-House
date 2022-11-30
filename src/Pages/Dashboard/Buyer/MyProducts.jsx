import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAdmin from "../../../Hooks/UseAdmin";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const MyProducts = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [isAdmin] = useAdmin(user?.email, true);
  if (isAdmin) {
    navigate("/wrong");
  }
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["order-buyer"],
    queryFn: async () => {
      const res = await fetch(
        `https://serversite-liart.vercel.app/order-buyer?userEmail=${user?.email}`,
        {
          headers: {
            auth: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  console.log(products);

  return (
    <div>
      {products.length ? (
        <div className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
          <div className="flex flex-col justify-center pt-10">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap"></th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Product</div>
                        </th>

                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Product Name
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Price</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Method
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {products?.map((user, i) => (
                        <tr key={user._id}>
                          <td className="font-bold">{i + 1}</td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-xl w-10 h-10"
                                src={user?.image}
                                alt="Alex Shatov"
                              />
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left"> {user.product}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">
                              <span className="text-xl"> ৳</span> {user.price}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-lg text-center">
                              {!user.paid ? (
                                <Link
                                  to={`/dashboard/payment/${user._id}`}
                                  className="btn btn-xs"
                                >
                                  Pay
                                </Link>
                              ) : (
                                <p className=" font-medium text-green-500">
                                  Paid
                                </p>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-60">
          <h1 className="text-5xl font-bold text-center">
            You have not added any products yet
          </h1>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
