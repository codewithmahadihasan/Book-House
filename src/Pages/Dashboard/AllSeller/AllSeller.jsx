import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import TaboleSeller from "./TaboleSeller";

const AllSeller = () => {
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["seller"],
    queryFn: async () => {
      const res = await fetch(
        "https://serversite-liart.vercel.app/seller?role=Seller",
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

  const handaleDelete = (user) => {
    const id = user._id;
    fetch(`https://serversite-liart.vercel.app/buyer/${id}`, {
      method: "DELETE",
      headers: {
        auth: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          Swal.fire("Deleted Successfully", "Thank you very much", "success");
          refetch();
        }
      });
  };

  const handaleVerify = (id) => {
    fetch(`https://serversite-liart.vercel.app/user/${id}`, {
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
      {sellers.length ? (
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
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Email</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Spent</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Country
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {sellers.map((user, i) => (
                        <TaboleSeller
                          key={user._id}
                          i={i}
                          user={user}
                          handaleVerify={handaleVerify}
                          handaleDelete={handaleDelete}
                        ></TaboleSeller>
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
            You Have no seller right now
          </h1>
        </div>
      )}
    </div>
  );
};

export default AllSeller;
