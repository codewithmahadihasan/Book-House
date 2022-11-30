import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const AllProducts = () => {
  const { user, loading } = useContext(AuthContext);
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["order-seller"],
    queryFn: async () => {
      const res = await fetch(
        `https://serversite-liart.vercel.app/order-seller?email=${user?.email}`,
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

  if (isLoading || loading) {
    return <Loading></Loading>;
  }
  const handleDelete = (id) => {
    const alart = window.confirm("Are you sure you want to delete this item? ");
    if (alart) {
      fetch(`https://serversite-liart.vercel.app/product/${id}`, {
        method: "delete",
        headers: {
          auth: `bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted Successfully", "Thank you very much", "success");
          }
        });
    }
  };

  const advertise = (id) => {
    console.log(id);
    fetch(`https://serversite-liart.vercel.app/products/${id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        auth: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire(
            "Advertisement Successfully",
            "Thank you very much",
            "success"
          );
        }
      });
  };

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
                          <div className="font-semibold text-left">
                            Product Image
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Product name
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Price</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Status</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            Advertisement
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Activity
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {products?.map((user, i) => (
                        <tr key={user._id}>
                          <td className="p-2 whitespace-nowrap font-bold">
                            {i + 1}
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                <img
                                  className="rounded-10 w-10 h-10"
                                  src={user?.image}
                                  alt="Alex Shatov"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{user?.data?.name}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{user?.data?.price}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">
                              {user?.paid ? "Sold Out" : "Available"}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            {!user.add ? (
                              <div className="text-left font-medium text-green-500">
                                {!user?.paid ? (
                                  <button
                                    onClick={() => advertise(user._id)}
                                    className="btn btn-xs"
                                  >
                                    Advertise
                                  </button>
                                ) : (
                                  <p>All ready paid</p>
                                )}
                              </div>
                            ) : (
                              <div className="text-left font-medium text-green-500">
                                Advertised
                              </div>
                            )}
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-lg text-center">
                              <button
                                className="btn btn-xs"
                                onClick={() => handleDelete(user._id)}
                              >
                                Delete
                              </button>
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
          <h1 className="text-5xl text-center font-semibold">
            You have no product right now
          </h1>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
