import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Section4 = () => {
  const [collections, setCollections] = useState([]);
  const [load, setLoad] = useState();

  useEffect(() => {
    setLoad(true);
    fetch("https://serversite-liart.vercel.app/catagorys")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
        setLoad(false);
      });
  }, [setLoad]);
  console.log(load);
  if (load) {
    <div className="bg-indigo-500 ... mx-auto">
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      Processing...
    </div>;
  }

  return (
    <div className="lg:px-28 py-20">
      <h1 className="text-5xl text-center pt-20 pb-10 font-bold  ">
        Categorys{" "}
      </h1>
      <section className="p-6 mb-10  text-gray-100">
        <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
          {collections.map((data) => (
            <Link key={data?._id} to={`/catagory/${data?.name}`}>
              <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-900 text-gray-100">
                <div className="flex justify-center p-2 align-middle ">
                  <img
                    className="h-12 w-12 rounded text-gray-800"
                    src={data?.image}
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-center align-middle">
                  <p className="text-3xl font-semibold leading-none">
                    {data?.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Section4;
