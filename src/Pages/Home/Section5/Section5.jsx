import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GoVerified } from "react-icons/go";
import Loading from "../../Shared/Loading/Loading";

const Section5 = () => {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["buyer"],
    queryFn: async () => {
      const res = await fetch("https://serversite-liart.vercel.app/books");
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(books);

  return (
    <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
      <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2 ">
        {books.map((book) => (
          <div
            className={(book?.add && !book?.paid) || "hidden"}
            key={book._id}
          >
            <div className="px-6">
              <div className="md:w-[30rem] w-full border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50">
                <p className="bg-sky-500 w-fit px-4 py-1 text-sm font-bold text-white rounded-tl-lg rounded-br-xl">
                  {" "}
                  SUPPER OFFER{" "}
                </p>
                <div className="grid grid-cols-6 p-5 gap-y-2">
                  <div>
                    <img
                      alt=""
                      src={book.image}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </div>
                  {/* Description */}
                  <div className="col-span-5 md:col-span-4 ml-4">
                    <p className="text-sky-500 font-bold text-xs">
                      {" "}
                      20+ SPOTS LEFT{" "}
                    </p>
                    <p className="text-gray-600 font-bold">
                      {" "}
                      {book?.data?.name}
                    </p>
                    <p className="text-gray-400">
                      {book?.date} . {book?.time}
                    </p>
                    <p title={book.name} className="text-gray-400">
                      {" "}
                      {book.name}
                      {book.verify && (
                        <GoVerified
                          title="verified"
                          className="text-xs inline ml-2"
                        ></GoVerified>
                      )}{" "}
                    </p>
                  </div>
                  {/* Price */}
                  <div className="flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end">
                    <p className="rounded-lg text-sky-500 font-bold bg-sky-100  py-1 px-3 text-sm w-fit h-fit">
                      ${book?.data?.price}
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="max-w-lg overflow-hidden bg-white rounded-lg shadow-md bg-gray-800">
                <img
                  className="object-cover w-full h-64"
                  src={book.image}
                  alt="Article"
                />

                <div className="p-6">
                  <div>
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider uppercase bg-teal-400 text-teal-900 rounded-full">
                      Offer
                    </p>
                    <h1 className="block mt-2 text-2xl font-semibold text-gray-800  text-white">
                      {book.data.name}
                    </h1>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-10">
                      <div className="flex items-center">
                        <img
                          className="object-cover h-10 rounded-full"
                          src={book.photo}
                          alt="Avatar"
                        />
                        <h2 className="mx-2 font-semibold  text-gray-700 text-gray-200">
                          {book.name}{" "}
                          {book.verify && (
                            <GoVerified className="text-xs inline ml-2"></GoVerified>
                          )}
                        </h2>
                      </div>
                      <span className=" text-xs text-gray-600 text-gray-300">
                        {book.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section5;
