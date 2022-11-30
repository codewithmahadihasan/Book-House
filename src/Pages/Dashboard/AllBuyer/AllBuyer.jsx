import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading/Loading";
import TableForBuyer from "./TableForBuyer";

const AllBuyer = () => {
  const {
    data: buyers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["buyer"],
    queryFn: async () => {
      const res = await fetch(
        "https://serversite-liart.vercel.app/buyer?role=Buyer",
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
  console.log(buyers);
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {buyers.length ? (
        <div className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
          <div className="flex flex-col justify-center pt-10">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2"></th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Picture</div>
                        </th>
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
                          <div className="font-semibold text-left">Method</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {buyers.map((user, i) => (
                        <TableForBuyer
                          i={i}
                          key={user._id}
                          user={user}
                          handaleDelete={handaleDelete}
                        ></TableForBuyer>
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
            You Have no buyer right now
          </h1>
        </div>
      )}
    </div>
  );
};

export default AllBuyer;
