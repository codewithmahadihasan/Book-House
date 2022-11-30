import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading/Loading";

const Report = () => {
  const {
    data: reports = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyer"],
    queryFn: async () => {
      const res = await fetch(
        "https://serversite-liart.vercel.app/report?report=report"
      );
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(reports);

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

  return (
    <div>
      {reports.length ? (
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
                      {reports?.map((report, i) => (
                        <tr key={report._id}>
                          <td className="font-bold">{i + 1}</td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                              <img
                                className="rounded-xl w-10 h-10"
                                src={report?.image}
                                alt="Alex Shatov"
                              />
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">
                              {" "}
                              {report?.data?.name}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">
                              <span className="text-xl"> ৳</span>{" "}
                              {report?.data?.price}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-lg text-center">
                              <button
                                onClick={() => handleDelete(report?._id)}
                                className="btn btn-xs"
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
          <h1 className="text-5xl font-bold text-center">
            No one has reported yet
          </h1>
        </div>
      )}
    </div>
  );
};

export default Report;
