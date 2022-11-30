import React from "react";
import { GoVerified } from "react-icons/go";
import { MdArrowForwardIos, MdReport } from "react-icons/md";
import Swal from "sweetalert2";

const Card = ({ data, setTost }) => {
  console.log(data);

  const report = (id) => {
    fetch(`https://serversite-liart.vercel.app/report/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire("Report Successfully", "Thank you very much", "success");
      });
  };

  return (
    <div className={data.paid && "hidden"}>
      <div key={data?._id} className="shadow-2xl hover:shadow-purple-300 ">
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded">
          <p aria-label="Article">
            <img
              src={data?.image}
              className="object-cover w-full h-64 rounded"
              alt=""
            />
          </p>
          <div className="p-8 bg-white border rounded shadow-sm">
            <div className="mb-3 text-xs font-semibold tracking-wide uppercase flex">
              <p
                className="transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                aria-label="Category"
              >
                {data?.location}
              </p>
              <span className="text-gray-600">
                Post Date : {data?.date} <br />
                Duration Time : {data?.data?.duration} <br />
                <p>Price : {data?.data?.price}</p>
                <p>old Price : {data?.data?.oldPrice}</p>
              </span>
            </div>
            <p
              aria-label="Article"
              title="Jingle Bells"
              className="inline-block mb-3 text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              {data?.data?.name}
            </p>
            <div className="flex justify-between text-xs text-gray-700">
              <p>{data?.data?.location}</p>
              <p>Post Time: {data?.time}</p>
            </div>
            <div className="flex justify-between text-xs text-gray-700">
              <p>Condition : {data?.data?.condition}</p>
              <p>Category : {data?.data?.catagorys}</p>
            </div>

            <div className="flex items-center pt-4">
              <p aria-label="Author" title="Author" className="mr-3">
                <img
                  src={data?.photo}
                  alt="avatar"
                  className="object-cover w-10 h-10 rounded-full shadow-sm"
                />
              </p>
              <div>
                <p
                  aria-label="Author"
                  title="Author"
                  className="font-semibold flex items-center gap-2 text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  {data?.name}
                  {data.verify && <GoVerified className="text-xs"></GoVerified>}
                </p>
                <p className="text-xs font-medium leading-4 text-gray-600">
                  {data?.data?.number}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label
                htmlFor={data?.data}
                onClick={() => {
                  setTost(data);
                }}
                className="flex items-center gap-2 mt-4 font-semibold hover:text-teal-400 cursor-pointer"
              >
                Buy Now <MdArrowForwardIos></MdArrowForwardIos>
              </label>
              <button onClick={() => report(data._id)}>
                <MdReport className="flex items-center text-xl gap-2 mt-4 font-semibold hover:text-red-400 cursor-pointer"></MdReport>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
