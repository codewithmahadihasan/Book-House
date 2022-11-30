import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Modal = ({ data }) => {
  console.log(data);
  const { user } = useContext(AuthContext);

  const fromHandaler = (event) => {
    event.preventDefault();
    const product = data?.data?.name;
    const price = data?.data?.price;
    const userName = user.displayName;
    const image = data?.image;
    const userEmail = user?.email;
    const sellerEmail = data?.email;
    const userNumber = event.target.phone.value;
    const location = event.target.location.value;
    const order = {
      product,
      price,
      userName,
      image,
      userEmail,
      sellerEmail,
      userNumber,
      location,
      userPhoto: user.photoURL,
    };

    fetch("https://serversite-liart.vercel.app/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged > 0) {
          Swal.fire(
            "Add Products Sucessfully",
            "Thank you very much",
            "success"
          );
          event.target.reset();
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id={data} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={data}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Product Name : {data?.data?.name}
          </h3>
          <form className="text-center" onSubmit={fromHandaler}>
            <h1
              name="date"
              className=" bg-gray-300 py-3 rounded-xl text-start  pl-4 w-full mt-4"
            >
              {data?.data?.price}
            </h1>
            <h1
              name="date"
              className=" bg-gray-300 py-3 rounded-xl text-start  pl-4 w-full mt-4"
            >
              {user?.displayName}
            </h1>
            <h1
              name="date"
              className=" bg-gray-300 py-3 rounded-xl text-start  pl-4 w-full mt-4"
            >
              {user?.email}
            </h1>

            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full  mt-4"
            />
            <input
              type="text"
              name="location"
              placeholder="Input Meeting Location"
              className="input input-bordered w-full  mt-4"
            />

            <button className="w-full ">
              <label
                className="w-full bg-gradient-to-r bg-[#3A4256] uppercase text-white py-3 rounded-lg cursor-pointer mt-4"
                htmlFor={data}
                type="submit"
              >
                Submit
              </label>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
