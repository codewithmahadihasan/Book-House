import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const MyBuyers = () => {
  const { user } = useContext(AuthContext);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["order-buyer"],
    queryFn: async () => {
      const res = await fetch(
        `https://serversite-liart.vercel.app/my-buyer?sellerEmail=${user?.email}`,
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
  const handleDelete = (id) => {
    const alart = window.confirm(
      "Are you sure you want to delete this buyer? "
    );

    if (alart) {
      fetch(`https://serversite-liart.vercel.app/my-buyer/${id}`, {
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

  return (
    <div>
      {users.length ? (
        <div>
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
                              Buyer Photo
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Product name
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Number
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Location
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Price</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Activity
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {users?.map((user, i) => (
                          <tr key={user._id}>
                            <td className="p-2 whitespace-nowrap font-bold">
                              {i + 1}
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                  <img
                                    className="rounded-10 w-10 h-10"
                                    src={user?.userPhoto}
                                    alt="Alex Shatov"
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">{user?.userName}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">
                                {user?.userNumber}
                              </div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">{user?.location}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-left">{user?.price}</div>
                            </td>
                            <td className="p-2 whitespace-nowrap">
                              <div className="text-lg text-center">
                                <button
                                  onClick={() => handleDelete(user._id)}
                                  className="btn btn-xs"
                                >
                                  {" "}
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
        </div>
      ) : (
        <div className="py-60">
          <h1 className="text-5xl text-center font-semibold ">
            You have no buyer right now{" "}
          </h1>
        </div>
      )}
    </div>
  );
};

export default MyBuyers;
